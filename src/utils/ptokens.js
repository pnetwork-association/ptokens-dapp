import { pTokensEvmAssetBuilder, pTokensEvmProvider } from 'ptokens-assets-evm'
import { pTokensSwapBuilder } from 'ptokens-swap'

import { getAssetById } from '../store/swap/swap.selectors'

import { getReadOnlyProviderByBlockchain } from './read-only-providers'

const evmBlockchains = ['eth', 'sepolia', 'goerli', 'bsc', 'ftm', 'polygon', 'luxochain', 'arbitrum']

const getAssetBuilder = (_asset) => {
  if (evmBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensEvmAssetBuilder()
}

const getProvider = (_asset, _wallets) => {
  if (evmBlockchains.includes(_asset.blockchain.toLowerCase()))
    return new pTokensEvmProvider(
      _wallets[_asset.blockchain.toLowerCase()].provider ||
        getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase())
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
