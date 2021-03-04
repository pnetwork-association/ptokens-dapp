import { useMemo } from 'react'
import _ from 'lodash'

const useWallets = _wallets => {
  return useMemo(() => {
    const connectedWallets = Object.keys(_wallets)
      .map(_blockchain => ({ blockchain: _blockchain, ..._wallets[_blockchain] }))
      .filter(({ account }) => account)

    return {
      isConnected: connectedWallets.length > 0,
      connectedWallets,
      wallets: _wallets
    }
  }, [_wallets])
}

export { useWallets }
