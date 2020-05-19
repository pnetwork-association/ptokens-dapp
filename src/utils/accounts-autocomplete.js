import { getCorrespondingReadOnlyProvider } from './read-only-providers'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const getPossiblesAccounts = async (
  _pToken,
  _currentTypedAccount,
  _currentAccounts,
  _role
) => {
  const release = await mutex.acquire()

  try {
    if (_pToken.redeemFrom === 'EOS') {
      if (_currentTypedAccount.length === 0) {
        release()
        return []
      }

      if (_currentTypedAccount.length > 12) {
        release()
        return _currentAccounts
      }

      const rpc = getCorrespondingReadOnlyProvider(_pToken, _role)
      const res = await rpc.get_table_by_scope({
        code: 'eosio',
        table: 'userres',
        lower_bound: _currentTypedAccount,
        upper_bound: _currentTypedAccount.padEnd(12, 'z'),
        limit: 10
      })

      release()

      if (!res.rows) return _currentAccounts

      return res.rows.map(row => row.scope)
    }
  } catch (err) {
    release()
    return _currentAccounts
  }
}

export { getPossiblesAccounts }
