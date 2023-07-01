import { Blockchain } from 'ptokens'

import {
  WALLET_ARBITRUM_CONNECTED,
  WALLET_ARBITRUM_ACCOUNT_CHANGED,
  WALLET_XDAI_ACCOUNT_CHANGED,
  WALLET_XDAI_CONNECTED,
} from '../constants'
import { loadBalances } from '../store/swap/swap.actions'

const middleware = ({ dispatch }) => {
  return (_next) => {
    return async (_action) => {
      const { type, payload } = _action

      if (type === WALLET_XDAI_CONNECTED || type === WALLET_XDAI_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Gnosis))
      }

      if (type === WALLET_ARBITRUM_CONNECTED || type === WALLET_ARBITRUM_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Arbitrum))
      }

      return _next(_action)
    }
  }
}

export { middleware }
