import { WALLET_ETH_CONNECTED, WALLET_ETH_ACCOUNT_CHANGED } from '../constants'
import { loadBalances } from '../actions/swap'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'ETH'))
      }

      return _next(_action)
    }
  }
}

export { middleware }
