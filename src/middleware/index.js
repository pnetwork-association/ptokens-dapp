import {
  WALLET_ARBITRUM_CONNECTED,
  WALLET_ARBITRUM_ACCOUNT_CHANGED,
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
  WALLET_LIBRE_CONNECTED,
  WALLET_ULTRA_CONNECTED,
  WALLET_LUXOCHAIN_CONNECTED,
  WALLET_LUXOCHAIN_ACCOUNT_CHANGED,
  WALLET_ALGORAND_CONNECTED,
  WALLET_ALGORAND_ACCOUNT_CHANGED,
  NFTS_DATA_LOADED,
  NFT_DATA_LOADED,
  WALLET_FTM_CONNECTED,
  WALLET_FTM_ACCOUNT_CHANGED,
} from '../constants'
import settings from '../settings'
import * as migrationActions from '../store/migration/migration.actions'
import { loadNftsData } from '../store/nfts/nfts.actions'
import { setLoading } from '../store/pages/pages.actions'
import { getIsLoading } from '../store/pages/pages.selectors'
import { loadBalances } from '../store/swap/swap.actions'
import { loadOldPntBalance } from '../store/swap-old-pnt/swap-old-pnt.actions'

let countNftsLoading = 0
const middleware = ({ dispatch }) => {
  return (_next) => {
    return async (_action) => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        // NOTE: avoid loading balances without having loaded the address from pNetwork node
        dispatch(loadBalances(payload.account, 'ETH'))
        dispatch(loadNftsData(payload.account, 'ETH'))
        dispatch(migrationActions.loadBalances(payload.account, 'ETH'))
      }

      if (type === WALLET_BSC_CONNECTED || type === WALLET_BSC_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'BSC'))
        dispatch(loadNftsData(payload.account, 'BSC'))
        dispatch(loadOldPntBalance(payload.account))
      }

      if (type === WALLET_XDAI_CONNECTED || type === WALLET_XDAI_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'XDAI'))
      }

      if (type === WALLET_POLYGON_CONNECTED || type === WALLET_POLYGON_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'POLYGON'))
      }

      if (type === WALLET_EOS_CONNECTED) {
        dispatch(loadBalances(payload.account, 'EOS'))
      }

      if (type === WALLET_TELOS_CONNECTED) {
        dispatch(loadBalances(payload.account, 'TELOS'))
      }

      if (type === WALLET_LIBRE_CONNECTED) {
        dispatch(loadBalances(payload.account, 'LIBRE'))
      }

      if (type === WALLET_ULTRA_CONNECTED) {
        dispatch(loadBalances(payload.account, 'ULTRA'))
      }

      if (type === WALLET_ARBITRUM_CONNECTED || type === WALLET_ARBITRUM_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'ARBITRUM'))
      }

      if (type === WALLET_LUXOCHAIN_CONNECTED || type === WALLET_LUXOCHAIN_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'LUXOCHAIN'))
      }

      if (type === WALLET_ALGORAND_CONNECTED || type === WALLET_ALGORAND_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'ALGORAND'))
      }

      if (type === WALLET_FTM_CONNECTED || type === WALLET_FTM_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, 'FTM'))
        dispatch(loadNftsData(payload.account, 'FTM'))
        dispatch(loadOldPntBalance(payload.account))
      }

      if (type === NFTS_DATA_LOADED || type === NFT_DATA_LOADED) {
        countNftsLoading += 1
        if ((getIsLoading() && payload.nfts.length > 0) || countNftsLoading === settings.supportedNfts.length) {
          countNftsLoading = 0
          dispatch(
            setLoading({
              isLoading: false,
            })
          )
        }
      }

      return _next(_action)
    }
  }
}

export { middleware }
