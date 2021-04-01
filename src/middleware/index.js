import {
  WALLET_ETH_CONNECTED,
  WALLET_ETH_ACCOUNT_CHANGED,
  WALLET_EOS_CONNECTED,
  WALLET_BSC_CONNECTED,
  WALLET_BSC_ACCOUNT_CHANGED
} from '../constants'
import { loadBalances } from '../store/swap/swap.actions'
import { loadNftsData } from '../store/nfts/nfts.actions'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'ETH'))
        dispatch(loadNftsData(payload.account, 'ETH'))
      }

      if (type === WALLET_BSC_CONNECTED || type === WALLET_BSC_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'BSC'))
        dispatch(loadNftsData(payload.account, 'BSC'))
      }

      if (type === WALLET_EOS_CONNECTED) {
        dispatch(loadBalances(payload.account, 'EOS'))
        dispatch(loadNftsData(payload.account, 'EOS'))
      }

      return _next(_action)
    }
  }
}

export { middleware }
