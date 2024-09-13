import BigNumber from 'bignumber.js'
import { Chain, Version } from '@p.network/ptokens-constants'

import { AssetId } from '.'

export const UNDERLYNG_ASSET = 'underlyingAsset'

export interface BaseAsset {
  id: AssetId
  adapterAddress: string
  chain: Chain
  isNative: boolean
  version: Version
  image: string
  miniImage?: string
  formattedName?: string
  titleLabel?: string
  symbolToDisplay?: string
  isHidden?: boolean
}

export interface NativeAsset extends BaseAsset {
  isNative: true
  marketApi: string
}

export interface HostAsset extends BaseAsset {
  isNative: false
  nativeAsset: AssetId
}

export type Asset = (NativeAsset | HostAsset) & {
  defaultFrom?: boolean
  defaultTo?: boolean
  formattedName?: string
  balance?: bigint
}

export type UpdatedAsset = Asset & {
  explorer: string
  balance: BigNumber
  formattedBalance: string
  formattedName: string
  coin?: string
  miniImage?: string
}

export const isNative = (_asset: Asset): boolean => _asset.isNative

export const isHost = (_asset: Asset): boolean => !_asset.isNative

export const assetsHaveMatches = (chain: Chain, id: string) => {
  return Object.values(swapAssets).every((asset) => {
    return !(asset.chain === chain && asset.id === id)
  })
}

export const getAllNativeAssets = (/*symbol?: string*/) => {
  return Object.entries(swapAssets).reduce((result, [key, asset]) => {
    if (isNative(asset)) {
      // if (symbol && symbol === asset.symbol)
        result[key as AssetId] = asset
      // if (!symbol)
      //   result[key as AssetId] = asset
    }
    return result
  }, {} as Record<AssetId, Asset>)
}

export const getNativeAsset = (_asset: Asset) =>  isNative(_asset) ? _asset : Object.values(swapAssets).find((asset) => asset.id === (_asset as HostAsset).nativeAsset)

// export const getNativeAssetByAddress = (address: string) => Object.values(swapAssets).find((asset) => 'address' in asset ? (asset as NativeAsset).address.toLowerCase() === address.toLowerCase() : false)

export const getAssetById = (id: AssetId) => swapAssets[id] || null

const swapAssets: Record<AssetId, Asset> = {
  /* #################   pTokens   #################*/
  [AssetId.PUSDC_ON_GNOSIS_MAINNET]: {
    id: AssetId.PUSDC_ON_GNOSIS_MAINNET,
    adapterAddress: 'token-adapter-address',
    chain: Chain.GnosisMainnet,
    version: Version.V1,
    image: 'pUSDC.svg',
    nativeAsset: AssetId.USDC_ON_POLYGON_MAINNET,
    isNative: false,
  },
  /* #################   Tokens   #################*/
  [AssetId.USDC_ON_POLYGON_MAINNET]: {
    id: AssetId.USDC_ON_POLYGON_MAINNET,
    adapterAddress: 'token-adapter-address',
    chain: Chain.PolygonMainnet,
    version: Version.V1,
    image: 'USDC.svg',
    isNative: true,
    marketApi: 'market-api',
  }

}

export default swapAssets