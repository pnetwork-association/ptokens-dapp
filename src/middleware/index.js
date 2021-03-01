import { WALLET_ETH_CONNECTED, WALLET_ETH_ACCOUNT_CHANGED, WALLET_EOS_CONNECTED } from '../constants'
import { loadBalances } from '../actions/swap'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'ETH'))
      }

      if (type === WALLET_EOS_CONNECTED) {
        dispatch(loadBalances(payload.account, 'EOS'))
      }

      return _next(_action)
    }
  }
}

export { middleware }
