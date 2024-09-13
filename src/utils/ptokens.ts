import { pTokensEvmAssetBuilder, pTokensEvmProvider } from '@p.network/ptokens-assets-evm'
import { Protocol, chainToProtocolMap } from '@p.network/ptokens-constants'
import { pTokensAsset } from '@p.network/ptokens-entities'
import { getPublicClient } from '@wagmi/core'

import { Asset } from '../constants/swap-assets'
import wagmiConfig from '../app/wallet/evm-chains/wagmiConfig'



const getAssetBuilder = async (_asset: Asset) => {
  if (chainToProtocolMap.get(_asset.chain) === Protocol.EVM) {
    const publicClient = getPublicClient(wagmiConfig)
    // @ts-ignore
    const provider = new pTokensEvmProvider(publicClient)
    return new pTokensEvmAssetBuilder({provider: provider, assetNativeChain: _asset.chain})
  }
  throw new Error('Cannot create provider, only EVM assets are supported')
}

// const getAssetById = (_id: AssetId) => swapAssets[_id] || null

export const createAsset = async (_asset: Asset): Promise<pTokensAsset> => { // TODO should be UpdatedAsset
  const builder = await getAssetBuilder(_asset)
  if (builder) {
    builder.setAdapterAddress(_asset.adapterAddress)
    builder.setVersion(_asset.version)
    const asset = await builder.build()
    return asset
  } else {
    throw new Error('Missing builder')
  }
}