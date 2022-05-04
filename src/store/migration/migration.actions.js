import assets from '../../settings/migration-assets'
//import settings from '../../settings'
import {
  MIGRATION_ASSETS_LOADED,
  MIGRATE_BALANCE_LOADED,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_MIGRATE_BUTTON
} from '../../constants/index'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from '../swap/utils/balances'
//import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import { getAssetsByBlockchain, getAssetById } from './migration.selectors'
import { /*getWallets,*/ getWalletByBlockchain } from '../wallets/wallets.selectors'
import { getDefaultSelection } from './utils/default-selection'

const loadMigrationData = ({ strategy }) => {
  return async _dispatch => {
    try {
      _dispatch({
        type: MIGRATION_ASSETS_LOADED,
        payload: {
          assets: [...assets, ...getDefaultSelection(assets, { strategy })]
        }
      })
    } catch (_err) {
      console.error(_err)
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
        actionType: MIGRATE_BALANCE_LOADED
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

      loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const migrate = (_from, _to, _amount, _address, _opts = {}) => {
  return async _dispatch => {
    try {
      _dispatch(resetProgress())
      //const wallets = getWallets()

      console.log('stuck here')
    } catch (_err) {
      console.error(_err)
    }
  }
}

const updateProgress = _progress => {
  return {
    type: PROGRESS_UPDATED,
    payload: {
      progress: _progress
    }
  }
}

const resetProgress = () => {
  return {
    type: PROGRESS_RESET
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
