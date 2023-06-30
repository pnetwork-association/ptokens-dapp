import {
  ASSETS_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON,
} from '../../constants/index'
import assets from '../../settings/swap-assets'
import { parseError } from '../../utils/errors'
import { createAsset, getSwapBuilder } from '../../utils/ptokens'
import { updateInfoModal } from '../pages/pages.actions'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import {
  loadEvmCompatibleBalances,
  loadEosioCompatibleBalances,
  loadEvmCompatibleBalance,
  loadEosioCompatibleBalance,
  loadAlgorandBalances,
} from './utils/balances'
import { getDefaultSelection } from './utils/default-selection'
import peginWithWallet from './utils/pegin-with-wallet'

const loadSwapData = (_opts = {}) => {
  const { defaultSelection: { pToken, asset, from, to, host_symbol } = {} } = _opts
  return async (_dispatch) => {
    try {
      _dispatch({
        type: ASSETS_LOADED,
        payload: {
          assets: [
            ...assets,
            ...getDefaultSelection(assets, {
              pToken,
              asset,
              from,
              to,
              host_symbol,
            }),
          ],
        },
      })
      const wallets = getWallets()
      Object.keys(wallets).forEach((_network) => {
        if (wallets[_network] && wallets[_network].account) {
          _dispatch(loadBalances(wallets[_network].account, _network))
        }
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalances = (_account, _blockchain) => {
  return async (_dispatch) => {
    try {
      switch (_blockchain.toUpperCase()) {
        case 'ETH':
        case 'SEPOLIA':
        case 'GOERLI': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(_blockchain.toUpperCase()),
            blockchain: _blockchain.toUpperCase(),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('EOS'),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('TELOS'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'TELOS',
          })
          break
        }
        case 'LIBRE': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('LIBRE'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'LIBRE',
          })
          break
        }
        case 'ULTRA': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('ULTRA'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ULTRA',
          })
          break
        }
        case 'ORE': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('ORE'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ORE',
          })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('BSC'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'BSC',
          })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('XDAI'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'XDAI',
          })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('POLYGON'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'POLYGON',
          })
          break
        }
        case 'ARBITRUM': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('ARBITRUM'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ARBITRUM',
          })
          break
        }
        case 'LUXOCHAIN': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('LUXOCHAIN'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'LUXOCHAIN',
          })
          break
        }
        case 'ALGORAND': {
          loadAlgorandBalances({
            assets: getAssetsByBlockchain('ALGORAND'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ALGORAND',
          })
          break
        }
        case 'FTM': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('FTM'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'FTM',
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

const loadBalanceByAssetId = (_id) => {
  return async (_dispatch) => {
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
        case 'ORE': {
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
        case 'LIBRE': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'LIBRE', dispatch: _dispatch })
          break
        }
        case 'ULTRA': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'ULTRA', dispatch: _dispatch })
          break
        }
        case 'ARBITRUM': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'ARBITRUM', dispatch: _dispatch })
          break
        }
        case 'LUXOCHAIN': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'LUXOCHAIN', dispatch: _dispatch })
          break
        }
        case 'ALGORAND': {
          loadAlgorandBalances({ assets: [asset], account, blockchain: 'ALGORAND', dispatch: _dispatch })
          break
        }
        case 'FTM': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'FTM', dispatch: _dispatch })
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

const swap = (_from, _to, _amount, _address, _opts = {}) => {
  return async (_dispatch) => {
    try {
      _dispatch(resetProgress())
      const wallets = getWallets()

      const _fromNative = _from
      if (_from.requiresCurve) {
        _from = getAssetById(_fromNative.pTokenId)
      }

      const sourceAsset = await createAsset(_from, wallets, true)
      const destinationAsset = await createAsset(_to, wallets)
      const swapBuilder = getSwapBuilder()
      swapBuilder.setAmount(_amount)
      swapBuilder.setSourceAsset(sourceAsset)
      swapBuilder.addDestinationAsset(destinationAsset, _address, '0x', _to.isNative)

      const swap = swapBuilder.build()
      await peginWithWallet({
        swap,
        ptokenFrom: _from,
        ptokenTo: _to,
        dispatch: _dispatch,
      })
    } catch (_err) {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        _dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
            showMoreText: _err.message ? _err.message : _err,
            showMoreLabel: 'Show Details',
            icon: 'cancel',
          })
        )
      }
      _dispatch(updateSwapButton('Swap'))
      _dispatch(resetProgress())
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
        value: _depositAddress,
      },
    },
  }
}

const hideDepositAddressModal = () => {
  return (_dispatch) => {
    _dispatch(resetProgress())
    _dispatch({
      type: HIDE_DEPOSIT_ADDRESS_MODAL,
    })
  }
}

const updateProgress = (_progress) => {
  return {
    type: PROGRESS_UPDATED,
    payload: {
      progress: _progress,
    },
  }
}

const resetProgress = () => {
  return {
    type: PROGRESS_RESET,
  }
}

const updateSwapButton = (_text, _disabled = false, _link = '') => {
  return {
    type: UPDATE_SWAP_BUTTON,
    payload: {
      swapButton: {
        text: _text,
        disabled: _disabled,
        link: _link,
      },
    },
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
  updateSwapButton,
}
