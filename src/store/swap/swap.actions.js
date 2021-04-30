import assets from '../../settings/swap-assets'
import {
  SWAP_DATA_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON
} from '../../constants/index'
import pTokens from 'ptokens'
import { getConfigs } from '../../utils/ptokens-configs'
import {
  loadEvmCompatibleBalances,
  loadEosioCompatibleBalances,
  loadEvmCompatibleBalance,
  loadEosioCompatibleBalance
} from './utils/balances'
import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import peginWithDepositAddress from './utils/pegin-with-deposit-address'
import peginWithWallet from './utils/pegin-with-wallet'
import pegout from './utils/pegout'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'
import { getDefaultSelection } from './utils/default-selection'

const loadSwapData = ({ defaultSelection: { pToken, asset, from, to } }) => {
  return async _dispatch => {
    _dispatch({
      type: SWAP_DATA_LOADED,
      payload: {
        assets: [...assets, ...getDefaultSelection(assets, { pToken, asset, from, to })]
      }
    })
  }
}

const loadBalances = (_account, _blockchain) => {
  return async _dispatch => {
    try {
      switch (_blockchain) {
        case 'ETH': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('ETH'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('EOS'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('TELOS'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'TELOS'
          })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('BSC'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'BSC'
          })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('XDAI'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'XDAI'
          })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('POLYGON'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'POLYGON'
          })
          break
        }
        default:
          break
      }
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

      switch (asset.blockchain) {
        case 'ETH': {
          loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'BSC', dispatch: _dispatch })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'POLYGON', dispatch: _dispatch })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'XDAI', dispatch: _dispatch })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'TELOS', dispatch: _dispatch })
          break
        }
        default: {
          break
        }
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const swap = (_from, _to, _amount, _address) => {
  return async _dispatch => {
    try {
      _dispatch(resetProgress())
      const wallets = getWallets()

      // NOTE: pegin
      if (!_from.isPtoken && _to.isPtoken) {
        const ptokenId = _to.id
        const ptoken = getAssetById(ptokenId)

        const ptokens = new pTokens(
          getConfigs(ptokenId, {
            ethProvider: wallets.eth.provider || getReadOnlyProviderByBlockchain('ETH'),
            eosSignatureProvider: wallets.eos.provider || getReadOnlyProviderByBlockchain('EOS'),
            telosSignatureProvider: wallets.telos.provider || getReadOnlyProviderByBlockchain('TELOS'),
            polygonProvider: wallets.polygon.provider || getReadOnlyProviderByBlockchain('POLYGON'),
            xdaiProvider: wallets.xdai.provider || getReadOnlyProviderByBlockchain('XDAI'),
            bscProvider: wallets.bsc.provider || getReadOnlyProviderByBlockchain('BSC')
          })
        )

        switch (ptoken.name) {
          case 'pBTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pLTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pDOGE': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pRVN': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          default: {
            peginWithWallet({
              ptokens,
              ptoken,
              dispatch: _dispatch,
              params: [_amount, _address]
            })
            break
          }
        }
      }

      // NOTE: pegout
      else if (_from.isPtoken && !_to.isPtoken) {
        const ptokenId = _from.id
        const ptoken = getAssetById(ptokenId)

        const ptokens = new pTokens(
          getConfigs(ptokenId, {
            ethProvider: wallets.eth.provider || getReadOnlyProviderByBlockchain('ETH'),
            eosSignatureProvider: wallets.eos.provider || getReadOnlyProviderByBlockchain('EOS'),
            telosSignatureProvider: wallets.telos.provider || getReadOnlyProviderByBlockchain('TELOS'),
            polygonProvider: wallets.polygon.provider || getReadOnlyProviderByBlockchain('POLYGON'),
            xdaiProvider: wallets.xdai.provider || getReadOnlyProviderByBlockchain('XDAI'),
            bscProvider: wallets.bsc.provider || getReadOnlyProviderByBlockchain('BSC')
          })
        )

        pegout({ ptokens, address: _address, ptoken, dispatch: _dispatch, params: [_amount, _address] })
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const showDepositAddressModal = (_asset, _depositAddress) => {
  return {
    type: SHOW_DEPOSIT_ADDRESS_MODAL,
    payload: {
      depositAddressModal: {
        asset: _asset,
        show: true,
        value: _depositAddress
      }
    }
  }
}

const hideDepositAddressModal = () => {
  return _dispatch => {
    _dispatch(resetProgress())
    _dispatch({
      type: HIDE_DEPOSIT_ADDRESS_MODAL
    })
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

const updateSwapButton = (_text, _disabled = false) => {
  return {
    type: UPDATE_SWAP_BUTTON,
    payload: {
      swapButton: {
        text: _text,
        disabled: _disabled
      }
    }
  }
}

export {
  loadSwapData,
  loadBalances,
  loadBalanceByAssetId,
  showDepositAddressModal,
  hideDepositAddressModal,
  swap,
  updateProgress,
  resetProgress,
  updateSwapButton
}
