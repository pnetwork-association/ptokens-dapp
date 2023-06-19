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
  Blockchain,
} from '../constants'
import { loadBalances } from '../store/swap/swap.actions'
import * as migrationActions from '../store/migration/migration.actions'
import { loadOldPntBalance } from '../store/swap-old-pnt/swap-old-pnt.actions'
import { loadNftsData } from '../store/nfts/nfts.actions'
import { setLoading } from '../store/pages/pages.actions'
import { getIsLoading } from '../store/pages/pages.selectors'
import { getSupportedNftsNumber } from '../store/settings/settings.selectors'

let countNftsLoading = 0
const middleware = ({ dispatch, getState }) => {
  return (_next) => {
    return async (_action) => {
      const { type, payload } = _action

      if (type === WALLET_ETH_CONNECTED || type === WALLET_ETH_ACCOUNT_CHANGED) {
        // NOTE: avoid loading balances without having loaded the address from pNetwork node
        dispatch(loadBalances(payload.account, Blockchain.Ethereum))
        dispatch(loadNftsData(payload.account, Blockchain.Ethereum))
        dispatch(migrationActions.loadBalances(payload.account, Blockchain.Ethereum))
      }

      if (type === WALLET_BSC_CONNECTED || type === WALLET_BSC_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.BSC))
        dispatch(loadNftsData(payload.account, Blockchain.BSC))
        dispatch(loadOldPntBalance(payload.account))
      }

      if (type === WALLET_XDAI_CONNECTED || type === WALLET_XDAI_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.XDAI))
      }

      if (type === WALLET_POLYGON_CONNECTED || type === WALLET_POLYGON_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Polygon))
      }

      if (type === WALLET_EOS_CONNECTED) {
        dispatch(loadBalances(payload.account, Blockchain.EOS))
      }

      if (type === WALLET_TELOS_CONNECTED) {
        dispatch(loadBalances(payload.account, Blockchain.Telos))
      }

      if (type === WALLET_LIBRE_CONNECTED) {
        dispatch(loadBalances(payload.account, Blockchain.Libre))
      }

      if (type === WALLET_ULTRA_CONNECTED) {
        dispatch(loadBalances(payload.account, Blockchain.Ultra))
      }

      if (type === WALLET_ARBITRUM_CONNECTED || type === WALLET_ARBITRUM_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Arbitrum))
      }

      if (type === WALLET_LUXOCHAIN_CONNECTED || type === WALLET_LUXOCHAIN_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Luxochain))
      }

      if (type === WALLET_ALGORAND_CONNECTED || type === WALLET_ALGORAND_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Algorand))
      }

      if (type === WALLET_FTM_CONNECTED || type === WALLET_FTM_ACCOUNT_CHANGED) {
        dispatch(loadBalances(payload.account, Blockchain.Fantom))
        dispatch(loadNftsData(payload.account, Blockchain.Fantom))
        dispatch(loadOldPntBalance(payload.account))
      }

      if (type === NFTS_DATA_LOADED || type === NFT_DATA_LOADED) {
        countNftsLoading += 1
        if ((getIsLoading() && payload.nfts.length > 0) || countNftsLoading === getSupportedNftsNumber(getState())) {
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
