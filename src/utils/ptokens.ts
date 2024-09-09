import { pTokensEvmAssetBuilder, pTokensEvmProvider } from '@p.network/ptokens-assets-evm'
import { BlockchainType } from '@p.network/ptokens-constants'
import { getPublicClient } from 'wagmi/actions'

import { getFactoryAddressByBlockchain } from '../settings'
import swapAssets, { Asset, NativeAsset, isNative } from '../constants/swap-assets'
import { AssetId } from '../constants'
import { getBlockchain } from './utils'
import { pTokensAsset } from '@p.network/ptokens-entities'

const getAssetBuilder = async (_asset: Asset) => {
  if (networkIdToTypeMap.get(_asset.networkId) === BlockchainType.EVM) {
    const publicClient = getPublicClient({chainId: getBlockchain(_asset).chainId})
    // @ts-ignore
    const provider = new pTokensEvmProvider(publicClient)
    return new pTokensEvmAssetBuilder(provider)
  }
  throw new Error('Cannot create provider, only EVM assets are supported')
}

const getAssetById = (_id: AssetId) => swapAssets[_id] || null

const buildAssetInfo = (_asset: Asset) => {
  const underlyingAsset = 'underlyingAsset' in _asset ? getAssetById(_asset.underlyingAsset) : null 
  return {
    networkId: _asset.networkId,
    symbol: _asset.symbol,
    decimals: _asset.decimals,
    assetTokenAddress: isNative(_asset) ? (_asset as NativeAsset).address : undefined,
    isNative: isNative(_asset),
    underlyingAssetName: underlyingAsset ? underlyingAsset.name : _asset.name,
    underlyingAssetSymbol: underlyingAsset ? underlyingAsset.symbol : _asset.symbol,
    underlyingAssetDecimals: underlyingAsset ? underlyingAsset.decimals : _asset.decimals,
    underlyingAssetTokenAddress: underlyingAsset ? (underlyingAsset as NativeAsset).address : (_asset as NativeAsset).address,
    underlyingAssetNetworkId: underlyingAsset ? underlyingAsset.networkId : _asset.networkId,
  }
}

export const createAsset = async (_asset: Asset): Promise<pTokensAsset> => { // TODO should be UpdatedAsset
  const builder = await getAssetBuilder(_asset)
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