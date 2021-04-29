import {
  WALLET_ETH_CONNECTED,
  WALLET_ETH_ACCOUNT_CHANGED,
  WALLET_EOS_CONNECTED,
  WALLET_BSC_CONNECTED,
  WALLET_BSC_ACCOUNT_CHANGED,
  WALLET_XDAI_ACCOUNT_CHANGED,
  WALLET_XDAI_CONNECTED,
  WALLET_POLYGON_ACCOUNT_CHANGED,
  WALLET_POLYGON_CONNECTED,
  WALLET_TELOS_CONNECTED,
  NFTS_DATA_LOADED,
  NFT_DATA_LOADED
} from '../constants'
import { waitUntil } from 'async-wait-until'
import { loadBalances } from '../store/swap/swap.actions'
import { loadNftsData } from '../store/nfts/nfts.actions'
import { getAssetsWithAddress } from '../store/swap/swap.selectors'
import { setLoading } from '../store/pages/pages.actions'
import { getIsLoading } from '../store/pages/pages.selectors'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        // NOTE: avoid loading balances without having loaded the address from pNetwork node
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'ETH'))
        dispatch(loadNftsData(payload.account, 'ETH'))
      }

      if (type === WALLET_BSC_CONNECTED || type === WALLET_BSC_ACCOUNT_CHANGED) {
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'BSC'))
        dispatch(loadNftsData(payload.account, 'BSC'))
      }

      if (type === WALLET_XDAI_CONNECTED || type === WALLET_XDAI_ACCOUNT_CHANGED) {
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'XDAI'))
        dispatch(loadNftsData(payload.account, 'XDAI'))
      }

      if (type === WALLET_POLYGON_CONNECTED || type === WALLET_POLYGON_ACCOUNT_CHANGED) {
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'POLYGON'))
        dispatch(loadNftsData(payload.account, 'POLYGON'))
      }

      if (type === WALLET_EOS_CONNECTED) {
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'EOS'))
        dispatch(loadNftsData(payload.account, 'EOS'))
      }

      if (type === WALLET_TELOS_CONNECTED) {
        await waitUntil(() => getAssetsWithAddress().length > 0)
        dispatch(loadBalances(payload.account, 'TELOS'))
        dispatch(loadNftsData(payload.account, 'TELOS'))
      }

      if (type === NFTS_DATA_LOADED || type === NFT_DATA_LOADED) {
        if (getIsLoading()) {
          dispatch(
            setLoading({
              isLoading: false
            })
          )
        }
      }

      return _next(_action)
    }
  }
}

export { middleware }
