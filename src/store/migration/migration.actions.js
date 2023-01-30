import assets from '../../settings/migration-assets'
import {
  MIGRATION_ASSETS_LOADED,
  MIGRATION_BALANCE_LOADED,
  MIGRATION_PROGRESS_UPDATED,
  MIGRATION_PROGRESS_RESET,
  UPDATE_MIGRATE_BUTTON,
  APYS_LOADED
} from '../../constants/index'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from '../swap/utils/balances'
import { getAssetsByBlockchain, getAssetById } from './migration.selectors'
import { getWalletByBlockchain } from '../wallets/wallets.selectors'
import { getDefaultSelection } from './utils/default-selection'
import migratePBTC from './migrations/pBTC-migration'
import migratePNT from './migrations/ethPNT-migration'
import axios from 'axios'

const loadMigrationData = (_opts = {}) => {
  const { strategy } = _opts
  return async _dispatch => {
    try {
      _dispatch({
        type: MIGRATION_ASSETS_LOADED,
        payload: {
          assets: strategy ? [...assets, ...getDefaultSelection(assets, { strategy })] : assets
        }
      })

      const wallet = getWalletByBlockchain('ETH')
      if (wallet && wallet.account) {
        _dispatch(loadBalances(wallet.account))
      }

      _dispatch(loadApys())
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadApys = () => {
  return async _dispatch => {
    try {
      const {
        data: { result }
      } = await axios.get('https://extra.ptokens.io/pbtc-v1-migration-apys')
      _dispatch({
        type: APYS_LOADED,
        payload: {
          apys: result
        }
      })
    } catch (_err) {
      _dispatch({
        type: APYS_LOADED,
        payload: {
          apys: {}
        }
      })
    }
  }
}

const loadBalances = _account => {
  return async _dispatch => {
    try {
      loadEvmCompatibleBalances({
        assets: getAssetsByBlockchain('ETH'),
        account: _account,
        dispatch: _dispatch,
        actionType: MIGRATION_BALANCE_LOADED
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalanceByAssetId = _id => {
  return async _dispatch => {
    try {
      const asset = getAssetById(_id)
      const wallet = getWalletByBlockchain(asset.blockchain)
      if (!wallet || !wallet.account) {
        return
      }
      const account = wallet.account

      loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch, actionType: MIGRATION_BALANCE_LOADED })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const migrate = (_strategy, _amount, _from, _to, _options = {}) => {
  return async _dispatch => {
    try {
      _dispatch(resetProgress())

      switch (_strategy) {
        // pbtc v1 -> pbtc v2
        case 'pBTC-v1-to-v2':
          migratePBTC(_amount, _from, _to, {
            dispatch: _dispatch
          })
          break
        case 'ethPNT-to-PNT':
          // ethPNT -> PNT
          migratePNT(_amount, _from, _to, {
            dispatch: _dispatch
          })
          break
        default:
          break
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const updateProgress = _progress => {
  return {
    type: MIGRATION_PROGRESS_UPDATED,
    payload: {
      progress: _progress
    }
  }
}

const resetProgress = () => {
  return {
    type: MIGRATION_PROGRESS_RESET
  }
}

const updateMigrateButton = (_text, _disabled = false) => {
  return {
    type: UPDATE_MIGRATE_BUTTON,
    payload: {
      migrateButton: {
        text: _text,
        disabled: _disabled
      }
    }
  }
}

export {
  loadMigrationData,
  loadBalances,
  loadBalanceByAssetId,
  migrate,
  updateProgress,
  resetProgress,
  updateMigrateButton
}
