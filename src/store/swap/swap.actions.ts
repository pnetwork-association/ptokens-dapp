import { Blockchain, NetworkId } from 'ptokens-constants'
import { AbiItem } from 'web3-utils'

import { AppDispatch } from '..'
import { getFactoryAddressByBlockchain } from '../../settings'
import assets, { Asset, NativeAsset } from '../../settings/swap-assets'
import { parseError } from '../../utils/errors'
import { createAsset, getProviderByNetworkId, getSwapBuilder } from '../../utils/ptokens'
import { updateInfoModal } from '../pages/pages.actions'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

import factoryAbi from './abi/PFactroryAbi.json'
import stateManagerAbi from './abi/PStateManagerAbi.json'
import { AssetWithAddress } from './swap.reducer'
import * as actions from './swap.reducer'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from './utils/balances'
import { getDefaultSelection } from './utils/default-selection'
import peginWithWallet from './utils/pegin-with-wallet'

const computePTokenAddress = async (_asset: Asset, _assets: Asset[]) => {
  const asset =
    'underlyingAsset' in _asset && _asset.underlyingAsset
      ? _assets.find((_el) => _el.id === _asset.underlyingAsset)
      : _asset
  if (asset) {
    const provider = getProviderByNetworkId(_asset.networkId)
    const factoryAddress = getFactoryAddressByBlockchain(_asset.blockchain)
    const pTokenAddress = await provider.makeContractCall<string>(
      {
        contractAddress: factoryAddress,
        method: 'getPTokenAddress',
        abi: factoryAbi as unknown as AbiItem,
      },
      [asset.name, asset.symbol, asset.decimals, asset.address, asset.networkId]
    )
    return pTokenAddress
  }
  throw new Error('Unable to calculate pToken address')
}

const loadSwapData = (_opts: { defaultSelection?: { asset?: string; from?: string; to?: string } } = {}) => {
  const { defaultSelection: { asset, from, to } = {} } = _opts
  return async (_dispatch: AppDispatch) => {
    try {
      const assetsWithAddress: AssetWithAddress[] = await Promise.all(
        assets.map(async (_asset) => {
          const pTokenAddress = await computePTokenAddress(_asset, assets)
          return {
            ..._asset,
            address: 'isNative' in _asset && _asset.isNative ? _asset.address : pTokenAddress,
            pTokenAddress: 'isNative' in _asset && _asset.isNative ? pTokenAddress : null,
          }
        })
      )
      _dispatch(
        actions.assetsLoaded([
          ...assetsWithAddress,
          ...getDefaultSelection(assetsWithAddress, {
            asset,
            from,
            to,
          }),
        ])
      )

      const loadBpm = async () => {
        try {
          const _getChallengePeriod: Promise<number> = async (_networkId: NetworkId, _blockchain: Blockchain) => {
            try {
              const provider = getProviderByNetworkId(_networkId)
              const factoryAddress = getFactoryAddressByBlockchain(_blockchain)
              const stateManagerAddress: string = await provider.makeContractCall({
                contractAddress: factoryAddress,
                method: 'stateManager',
                abi: factoryAbi as unknown as AbiItem,
              })
              const challengePeriodSeconds: number = await provider.makeContractCall({
                contractAddress: stateManagerAddress,
                method: 'getCurrentChallengePeriodDuration',
                abi: stateManagerAbi as unknown as AbiItem,
              })
              return challengePeriodSeconds
            } catch (_err) {
              return 0
            }
          }

          const a: Record<number, number>[] = await Promise.all(
            [
              { networkId: NetworkId.GnosisMainnet, blockchain: Blockchain.Gnosis },
              { networkId: NetworkId.ArbitrumMainnet, blockchain: Blockchain.Arbitrum },
            ].map(async ({ networkId, blockchain }) => ({
              [blockchain]: await _getChallengePeriod(networkId, blockchain),
            }))
          )
          const challengePeriod = Object.assign({}, ...a) as IBpm

          _dispatch(actions.bpmLoaded(challengePeriod))
        } catch (err) {
          if (err instanceof Error) console.error('BPM API error:', err.message)
          else throw err
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
      _dispatch(actions.progressReset())
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

const updateSwapButton = (_text: string, _disabled = false, _link: string | null = null) =>
  actions.updateSwapButton({ text: _text, disabled: _disabled, link: _link })

const updateProgress = actions.progressUpdated

const resetProgress = actions.progressReset

export { loadSwapData, loadBalances, loadBalanceByAssetId, swap, updateProgress, resetProgress, updateSwapButton }
