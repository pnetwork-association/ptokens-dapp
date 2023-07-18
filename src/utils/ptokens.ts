import { pTokensEvmAssetBuilder, pTokensEvmProvider } from 'ptokens-assets-evm'
import { BlockchainType, NetworkId, networkIdToTypeMap } from 'ptokens-constants'
import { pTokensSwapBuilder } from 'ptokens-swap'

import { getFactoryAddressByBlockchain } from '../settings'
import { Asset, UpdatedAsset } from '../settings/swap-assets'
import { getAssetById } from '../store/swap/swap.selectors'
import { Wallets } from '../store/wallets/wallets.reducer'

import { getReadOnlyProviderByBlockchain, getReadOnlyProviderByNetworkId } from './read-only-providers'

const getAssetBuilder = (_asset: Asset, _wallets: Wallets) => {
  if (networkIdToTypeMap.get(_asset.networkId) === BlockchainType.EVM) {
    const provider = getProvider(_asset, _wallets)
    return new pTokensEvmAssetBuilder(provider)
  }
}

export const getProviderByNetworkId = (_networkId: NetworkId) => {
  if (networkIdToTypeMap.get(_networkId) === BlockchainType.EVM) {
    const url = getReadOnlyProviderByNetworkId(_networkId)
    return new pTokensEvmProvider(url)
  }
}

const getProvider = (_asset: Asset, _wallets: Wallets) => {
  if (networkIdToTypeMap.get(_asset.networkId) === BlockchainType.EVM)
    return new pTokensEvmProvider(
      _wallets[_asset.blockchain].provider || getReadOnlyProviderByBlockchain(_asset.blockchain)
    )
  throw new Error('Cannot create provider')
}

const buildAssetInfo = (_asset: UpdatedAsset) => {
  const underlyingAsset = 'underlyingAsset' in _asset ? getAssetById(_asset.underlyingAsset) : null
  return {
    networkId: _asset.networkId,
    symbol: _asset.symbol,
    assetTokenAddress: _asset.address,
    decimals: _asset.decimals,
    underlyingAssetName: underlyingAsset ? underlyingAsset.name : _asset.name,
    underlyingAssetSymbol: underlyingAsset ? underlyingAsset.symbol : _asset.symbol,
    underlyingAssetDecimals: underlyingAsset ? underlyingAsset.decimals : _asset.decimals,
    underlyingAssetTokenAddress: underlyingAsset ? underlyingAsset.address : _asset.address,
    underlyingAssetNetworkId: underlyingAsset ? underlyingAsset.networkId : _asset.networkId,
  }
}

export const createAsset = async (_asset: UpdatedAsset, _wallets: Wallets) => {
  const builder = getAssetBuilder(_asset, _wallets)
  if (builder) {
    builder.setBlockchain(_asset.networkId)
    builder.setDecimals(_asset.decimals)
    builder.setFactoryAddress(getFactoryAddressByBlockchain(_asset.blockchain))
    const assetInfo = buildAssetInfo(_asset)
    builder.setAssetInfo(assetInfo)
    const asset = await builder.build()
    return asset
  } else {
    throw new Error('Missing builder')
  }
}

export const getSwapBuilder = () => {
  return new pTokensSwapBuilder()
}
