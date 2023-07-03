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
import { assetId } from '../../constants'

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
      Object.keys(wallets).forEach((_network: Blockchain) => {
        if (wallets[_network] && wallets[_network].account) {
          _dispatch(loadBalances(wallets[_network].account, _network))
        }
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalances = (_account: string, _blockchain: Blockchain) => {
  return (_dispatch: AppDispatch) => {
    try {
      switch (_blockchain) {
        case Blockchain.Gnosis:
        case Blockchain.Arbitrum: {
          _dispatch(
            loadEvmCompatibleBalances({
              assets: getAssetsByBlockchain(_blockchain),
              account: _account,
              blockchain: _blockchain,
            })
          )
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

const loadBalanceByAssetId = (_id: assetId) => {
  return (_dispatch: AppDispatch) => {
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
          _dispatch(loadEvmCompatibleBalance({ asset, account, blockchain: asset.blockchain }))
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

const swap = (_from: Asset, _to: Asset, _amount: string, _address: string) => {
  return async (_dispatch: AppDispatch) => {
    try {
      _dispatch(actions.resetProgress())
      const wallets = getWallets()

      const sourceAsset = await createAsset(_from, wallets, true)
      const destinationAsset = await createAsset(_to, wallets)
      const swapBuilder = getSwapBuilder()
      swapBuilder.setAmount(_amount)
      swapBuilder.setSourceAsset(sourceAsset)
      swapBuilder.addDestinationAsset(destinationAsset, _address, '0x', _to.isNative)

      const swap = swapBuilder.build()
      _dispatch(
        peginWithWallet({
          swap,
          ptokenFrom: _from,
          ptokenTo: _to,
        })
      )
    } catch (_err) {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        _dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
            showMoreText: _err.message ? _err.message : '_err',
            showMoreLabel: 'Show Details',
            icon: 'cancel',
          })
        )
      }
      _dispatch(updateSwapButton('Swap'))
      _dispatch(actions.progressReset())
    }
  }
}

const updateSwapButton = (_text: string, _disabled: boolean, _link: string) =>
  actions.updateSwapButton({ text: _text, disabled: _disabled, link: _link })

const updateProgress = actions.progressUpdated

const resetProgress = actions.progressReset

export { loadSwapData, loadBalances, loadBalanceByAssetId, swap, updateProgress, resetProgress, updateSwapButton }
