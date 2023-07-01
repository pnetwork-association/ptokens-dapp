import { Blockchain } from 'ptokens-constants'

import { ASSETS_LOADED, PROGRESS_UPDATED, PROGRESS_RESET, UPDATE_SWAP_BUTTON } from '../../constants/index'
import assets from '../../settings/swap-assets'
import { parseError } from '../../utils/errors'
import { createAsset, getSwapBuilder } from '../../utils/ptokens'
import { updateInfoModal } from '../pages/pages.actions'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from './utils/balances'
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
      switch (_blockchain) {
        case Blockchain.Gnosis:
        case Blockchain.Arbitrum: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(_blockchain),
            account: _account,
            dispatch: _dispatch,
            blockchain: _blockchain,
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
        case Blockchain.Gnosis:
        case Blockchain.Arbitrum: {
          loadEvmCompatibleBalance({ asset, account, blockchain: asset.blockchain, dispatch: _dispatch })
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

export { loadSwapData, loadBalances, loadBalanceByAssetId, swap, updateProgress, resetProgress, updateSwapButton }
