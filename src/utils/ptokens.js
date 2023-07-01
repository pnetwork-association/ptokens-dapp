import { pTokensEvmAssetBuilder, pTokensEvmProvider } from 'ptokens-assets-evm'
import { BlockchainType, networkIdToTypeMap } from 'ptokens-constants'
import { pTokensSwapBuilder } from 'ptokens-swap'

import { getFactoryAddressByBlockchain } from '../settings'
import { getAssetById } from '../store/swap/swap.selectors'

import { getReadOnlyProviderByBlockchain } from './read-only-providers'

const getAssetBuilder = (_asset) => {
  if (networkIdToTypeMap.get(_asset.networkId) === BlockchainType.EVM) return new pTokensEvmAssetBuilder()
}

const getProvider = (_asset, _wallets) => {
  if (networkIdToTypeMap.get(_asset.networkId) === BlockchainType.EVM)
    return new pTokensEvmProvider(
      _wallets[_asset.blockchain].provider || getReadOnlyProviderByBlockchain(_asset.blockchain)
    )
}

const buildAssetInfo = (_asset) => {
  const underlyingAsset = _asset.underlyingAsset ? getAssetById(_asset.underlyingAsset) : null
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

export const createAsset = async (_asset, _wallets) => {
  const builder = getAssetBuilder(_asset)
  builder.setBlockchain(_asset.networkId)
  builder.setDecimals(_asset.decimals)
  builder.setFactoryAddress(getFactoryAddressByBlockchain(_asset.blockchain))
  const assetInfo = buildAssetInfo(_asset)
  builder.setAssetInfo(assetInfo)
  if (_wallets) {
    const provider = getProvider(_asset, _wallets)
    builder.setProvider(provider)
  }
  const asset = await builder.build()
  return asset
}

export const getSwapBuilder = () => {
  return new pTokensSwapBuilder()
}
