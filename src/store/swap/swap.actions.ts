import { Blockchain, NetworkId } from 'ptokens-constants'
import { AbiItem } from 'web3-utils'

import { AppDispatch, AppThunk } from '..'
import { AssetId } from '../../constants'
import { getFactoryAddressByBlockchain } from '../../settings'
import assets, { Asset, AssetWithAddress, NativeAsset, UpdatedAsset, isNative } from '../../settings/swap-assets'
import { parseError } from '../../utils/errors'
import { createAsset, getProviderByNetworkId, getSwapBuilder } from '../../utils/ptokens'
import { updateInfoModal } from '../pages/pages.actions'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

import factoryAbi from './abi/PFactroryAbi.json'
import stateManagerAbi from './abi/PStateManagerAbi.json'
import * as actions from './swap.reducer'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { loadEvmCompatibleBalances, loadEvmCompatibleBalance } from './utils/balances'
import { getDefaultSelection } from './utils/default-selection'
import peginWithWallet from './utils/pegin-with-wallet'

const computePTokenAddress = async (_asset: Asset, _assets: Record<AssetId, Asset>): Promise<string> => {
  const asset = 'underlyingAsset' in _asset ? (_assets[_asset.underlyingAsset] as NativeAsset) : _asset
  if (asset) {
    const provider = getProviderByNetworkId(_asset.networkId)
    if (!provider) throw new Error(`Missing provider for network ID ${_asset.networkId}`)
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

export type LoadSwapDataOpts = { defaultSelection?: { asset?: string; from?: string; to?: string } }

const loadSwapData = (_opts: LoadSwapDataOpts = {}): AppThunk<Promise<void>> => {
  const { defaultSelection: { asset, from, to } = {} } = _opts
  return async (_dispatch: AppDispatch) => {
    try {
      const assetsWithAddress = Object.fromEntries(
        await Promise.all(
          Object.values(assets).map(async (_asset) => {
            const pTokenAddress: string = await computePTokenAddress(_asset, assets)
            return [
              _asset.id,
              {
                ..._asset,
                address: 'address' in _asset ? _asset.address : pTokenAddress,
                pTokenAddress: isNative(_asset) ? pTokenAddress : null,
              },
            ] as [AssetId, AssetWithAddress]
          })
        )
      ) as Record<AssetId, AssetWithAddress>
      _dispatch(
        actions.assetsLoaded(
          Object.assign(
            {},
            assetsWithAddress,
            getDefaultSelection(assetsWithAddress, {
              asset,
              from,
              to,
            })
          )
        )
      )

      const loadBpm = async () => {
        try {
          const _getChallengePeriod = async (_networkId: NetworkId, _blockchain: Blockchain): Promise<number> => {
            try {
              const provider = getProviderByNetworkId(_networkId)
              if (!provider) return 0
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

          const a: [Blockchain, number][] = await Promise.all(
            [
              { networkId: NetworkId.GnosisMainnet, blockchain: Blockchain.Gnosis },
              { networkId: NetworkId.ArbitrumMainnet, blockchain: Blockchain.Arbitrum },
            ].map(async ({ networkId, blockchain }) => [blockchain, await _getChallengePeriod(networkId, blockchain)])
          )
          const challengePeriod = Object.fromEntries(a)

          _dispatch(actions.bpmLoaded(challengePeriod))
        } catch (err) {
          if (err instanceof Error) console.error('BPM API error:', err.message)
          else throw err
        }
      }

      setInterval(() => loadBpm(), 1000 * 5)

      const wallets = getWallets()
      Object.keys(wallets).forEach((_network) => {
        if (wallets[_network] && wallets[_network].account) {
          _dispatch(loadBalances(wallets[_network].account!, _network as unknown as Blockchain))
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

const loadBalanceByAssetId = (_id: AssetId) => {
  return (_dispatch: AppDispatch) => {
    try {
      const asset = getAssetById(_id)
      if (!asset) return
      const wallet = getWalletByBlockchain(asset.blockchain)
      if (!wallet || !wallet.account) return
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

const swap = (_from: UpdatedAsset, _to: UpdatedAsset, _amount: string, _address: string): AppThunk<Promise<void>> => {
  return async (_dispatch: AppDispatch) => {
    try {
      _dispatch(actions.progressReset())
      const wallets = getWallets()

      const sourceAsset = await createAsset(_from, wallets)
      const destinationAsset = await createAsset(_to, wallets)
      const swapBuilder = getSwapBuilder()
      swapBuilder.setAmount(_amount)
      swapBuilder.setSourceAsset(sourceAsset)
      swapBuilder.addDestinationAsset(destinationAsset, _address, '0x', isNative(_to))

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
            showMoreText: _err instanceof Error ? _err.message : '',
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
