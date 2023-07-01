import { Blockchain, NetworkId } from 'ptokens-constants'

import { ASSETS_LOADED, BPM_LOADED, PROGRESS_UPDATED, PROGRESS_RESET, UPDATE_SWAP_BUTTON } from '../../constants/index'
import { getFactoryAddressByBlockchain } from '../../settings'
import assets from '../../settings/swap-assets'
import { parseError } from '../../utils/errors'
import { createAsset, getProviderByNetworkId, getSwapBuilder } from '../../utils/ptokens'
import { updateInfoModal } from '../pages/pages.actions'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

import factoryAbi from './abi/PFactroryAbi.json'
import stateManagerAbi from './abi/PStateManagerAbi.json'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from './utils/balances'
import { getDefaultSelection } from './utils/default-selection'
import peginWithWallet from './utils/pegin-with-wallet'

const computeAssetAddress = async (_asset, _assets) => {
  const asset = _asset.underlyingAsset ? _assets.find((_el) => _el.id === _asset.underlyingAsset) : _asset
  const provider = getProviderByNetworkId(_asset.networkId)
  const factoryAddress = getFactoryAddressByBlockchain(_asset.blockchain)
  const pTokenAddress = await provider.makeContractCall(
    {
      contractAddress: factoryAddress,
      method: 'getPTokenAddress',
      abi: factoryAbi,
    },
    [asset.name, asset.symbol, asset.decimals, asset.address, asset.networkId]
  )
  return pTokenAddress
}

const loadSwapData = (_opts = {}) => {
  const { defaultSelection: { pToken, asset, from, to, host_symbol } = {} } = _opts
  return async (_dispatch) => {
    try {
      const assetsWithAddress = await Promise.all(
        assets.map(async (_asset) => {
          const pTokenAddress = await computeAssetAddress(_asset, assets)
          return {
            ..._asset,
            address: _asset.isNative ? _asset.address : pTokenAddress,
            pTokenAddress: _asset.isNative ? pTokenAddress : null,
          }
        })
      )
      _dispatch({
        type: ASSETS_LOADED,
        payload: {
          assets: [
            ...assetsWithAddress,
            ...getDefaultSelection(assetsWithAddress, {
              pToken,
              asset,
              from,
              to,
              host_symbol,
            }),
          ],
        },
      })

      const loadBpm = async () => {
        try {
          const _getChallengePeriod = async (_networkId, _blockchain) => {
            try {
              const provider = getProviderByNetworkId(_networkId)
              const factoryAddress = getFactoryAddressByBlockchain(_blockchain)
              const stateManagerAddress = await provider.makeContractCall({
                contractAddress: factoryAddress,
                method: 'stateManager',
                abi: factoryAbi,
              })
              const challengePeriodSeconds = await provider.makeContractCall({
                contractAddress: stateManagerAddress,
                method: 'getCurrentChallengePeriodDuration',
                abi: stateManagerAbi,
              })
              return challengePeriodSeconds
            } catch (_err) {
              return 0
            }
          }

          const a = await Promise.all(
            [
              { networkId: NetworkId.GnosisMainnet, blockchain: Blockchain.Gnosis },
              { networkId: NetworkId.ArbitrumMainnet, blockchain: Blockchain.Arbitrum },
            ].map(async ({ networkId, blockchain }) => ({
              [blockchain]: await _getChallengePeriod(networkId, blockchain),
            }))
          )
          const challengePeriod = Object.assign({}, ...a)

          _dispatch({
            type: BPM_LOADED,
            payload: {
              challengePeriod,
            },
          })
        } catch (err) {
          console.error('BPM API error:', err.message)
        }
      }

      loadBpm()
      setInterval(() => loadBpm(), 1000 * 5)

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

const swap = (_from, _to, _amount, _address) => {
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
