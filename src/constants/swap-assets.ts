import BigNumber from 'bignumber.js'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { AssetId } from '.'

export const UNDERLYNG_ASSET = 'underlyingAsset'

export type BaseAsset = {
  id: AssetId
  name: string
  network: Network
  blockchain: Blockchain
  decimals: number
  symbol: string
  image: string
  networkId: NetworkId
  withBalanceDecimalsConversion: boolean
  isPerc20?: boolean
  isBep20?: boolean
  isHidden?: boolean
  formattedName?: string
  miniImage?: string
  titleLabel?: string
  isSpecial?: boolean
  symbolToDisplay?: string
}

export interface NativeAsset extends BaseAsset {
  address: `0x${string}`
  marketApi: string
}

export interface HostAsset extends BaseAsset {
  underlyingAsset: AssetId
  nativeSymbol: string
  nativeBlockchain: Blockchain
  nativeDecimals: number
}

export type Asset = (NativeAsset | HostAsset) & {
  defaultFrom?: boolean
  defaultTo?: boolean
  formattedName?: string
  balance?: BigNumber
}

export type UpdatedAsset = Asset & {
  explorer: string
  balance: BigNumber
  formattedBalance: string
  formattedName: string
  coin?: string
  miniImage?: string
}

export const isNative = (_asset: Asset): boolean => !isHost(_asset)

export const isHost = (_asset: Asset): boolean => UNDERLYNG_ASSET in _asset

export const assetsHaveMatches = (chain: Blockchain, symbol: string) => {
  return Object.values(swapAssets).every((asset) => {
    return !(asset.blockchain === chain && asset.symbol === symbol)
  })
}

export const getAllNativeAssets = (symbol?: string) => {
  return Object.entries(swapAssets).reduce((result, [key, asset]) => {
    if (isNative(asset)) {
      if (symbol && symbol === asset.symbol)
        result[key as AssetId] = asset
      if (!symbol)
        result[key as AssetId] = asset
    }
    return result
  }, {} as Record<AssetId, Asset>)
}

export const getNativeAssetByAddress = (address: string) => Object.values(swapAssets).find((asset) => 'address' in asset ? (asset as NativeAsset).address.toLowerCase() === address.toLowerCase() : false)

export const getAssetById = (id: AssetId) => swapAssets[id] || null

const swapAssets: Record<AssetId, Asset> = {
  /* #################   pTokens   #################*/
  [AssetId.PUSDC_ON_GNOSIS_MAINNET]: {
    id: AssetId.PUSDC_ON_GNOSIS_MAINNET,
    name: 'pUSD Coin',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 18,
    symbol: 'pUSDC',
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Polygon,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    underlyingAsset: AssetId.USDC_ON_POLYGON_MAINNET,
    isPerc20: true,
    isHidden: true,
  },
  [AssetId.PUSDC_ON_POLYGON_MAINNET]: {
    id: AssetId.PUSDC_ON_POLYGON_MAINNET,
    name: 'pUSD Coin',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Polygon,
    decimals: 18,
    symbol: 'pUSDC',
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Polygon,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.PolygonMainnet,
    underlyingAsset: AssetId.USDC_ON_POLYGON_MAINNET,
    isPerc20: true,
    isHidden: true,
  },
  [AssetId.PUSDC_ON_BSC_MAINNET]: {
    id: AssetId.PUSDC_ON_BSC_MAINNET,
    name: 'pUSD Coin',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Bsc,
    decimals: 18,
    symbol: 'pUSDC',
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Polygon,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.BscMainnet,
    underlyingAsset: AssetId.USDC_ON_POLYGON_MAINNET,
    isPerc20: true,
    isHidden: true,
  },
  [AssetId.PPNT_ON_GNOSIS_MAINNET]: {
    id: AssetId.PPNT_ON_GNOSIS_MAINNET,
    name: 'ppNetwork Token',
    nativeDecimals: 18,
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 18,
    symbol: 'pPNT',
    nativeSymbol: 'PNT',
    nativeBlockchain: Blockchain.Bsc,
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    underlyingAsset: AssetId.PNT_ON_BSC_MAINNET,
    isPerc20: true,
  },
  [AssetId.PPNT_ON_POLYGON_MAINNET]: {
    id: AssetId.PPNT_ON_POLYGON_MAINNET,
    name: 'ppNetwork Token',
    nativeDecimals: 18,
    network: Network.Mainnet,
    blockchain: Blockchain.Polygon,
    decimals: 18,
    symbol: 'pPNT',
    nativeSymbol: 'PNT',
    nativeBlockchain: Blockchain.Bsc,
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.PolygonMainnet,
    underlyingAsset: AssetId.PNT_ON_BSC_MAINNET,
    isPerc20: true,
  },
  [AssetId.PPNT_ON_BSC_MAINNET]: {
    id: AssetId.PPNT_ON_BSC_MAINNET,
    name: 'ppNetwork Token',
    nativeDecimals: 18,
    network: Network.Mainnet,
    blockchain: Blockchain.Bsc,
    decimals: 18,
    symbol: 'pPNT',
    nativeSymbol: 'PNT',
    nativeBlockchain: Blockchain.Bsc,
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.BscMainnet,
    underlyingAsset: AssetId.PNT_ON_BSC_MAINNET,
    isPerc20: true,
  },
  // [AssetId.PUSDC_ON_ARBITRUM_MAINNET]: {
  //   id: AssetId.PUSDC_ON_ARBITRUM_MAINNET,
  //   name: 'pUSDC',
  //   nativeDecimals: 6,
  //   network: Network.Mainnet,
  //   blockchain: Blockchain.Arbitrum,
  //   decimals: 18,
  //   symbol: 'pUSDC',
  //   nativeSymbol: 'USDC',
  //   nativeBlockchain: Blockchain.Gnosis,
  //   image: 'pUSDC.svg',
  //   withBalanceDecimalsConversion: true,
  //   networkId: NetworkId.ArbitrumMainnet,
  //   underlyingAsset: AssetId.USDC_ON_XDAI,
  //   isPerc20: true,
  // },
  // [AssetId.PPNT_ON_POLYGON_MAINNET]: {
  //   id: AssetId.PPNT_ON_POLYGON_MAINNET,
  //   name: 'ppNetwork Token',
  //   nativeDecimals: 18,
  //   network: Network.Mainnet,
  //   blockchain: Blockchain.Polygon,
  //   decimals: 18,
  //   symbol: 'pPNT',
  //   nativeSymbol: 'PNT',
  //   nativeBlockchain: Blockchain.Polygon,
  //   image: 'PNT.svg',
  //   withBalanceDecimalsConversion: true,
  //   networkId: NetworkId.PolygonMainnet,
  //   underlyingAsset: AssetId.PNTV2_ON_POLYGON_MAINNET,
  //   isPerc20: true,
  // },
  // [AssetId.PNT_ON_GOERLI_TESTNET]: {
  //   id: AssetId.PNT_ON_GOERLI_TESTNET,
  //   name: 'pPNT',
  //   nativeDecimals: 18,
  //   network: Network.Testnet,
  //   blockchain: Blockchain.Goerli,
  //   decimals: 6,
  //   symbol: 'ppTokens PNT',
  //   nativeSymbol: 'PNT',
  //   nativeBlockchain: Blockchain.Polygon,
  //   image: 'PNT.svg',
  //   withBalanceDecimalsConversion: true,
  //   networkId: NetworkId.GoerliTestnet,
  //   underlyingAsset: AssetId.PNTV2_ON_POLYGON_MAINNET,
  //   isPerc20: true,
  // },
  /* #################   Native Tokens   #################*/
  [AssetId.USDC_ON_POLYGON_MAINNET]:{
    address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
    id: AssetId.USDC_ON_POLYGON_MAINNET,
    symbol: 'USDC',
    name: 'USD Coin',
    network: Network.Mainnet,
    blockchain: Blockchain.Polygon,
    decimals: 6,
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.PolygonMainnet,
    isPerc20: true,
    marketApi: 'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart',
  },
  [AssetId.PNT_ON_BSC_MAINNET]: {
    address: '0xdaacB0Ab6Fb34d24E8a67BfA14BF4D95D4C7aF92',
    id: AssetId.PNT_ON_BSC_MAINNET,
    symbol: 'PNT',
    name: 'pNetwork Token',
    network: Network.Mainnet,
    blockchain: Blockchain.Bsc,
    decimals: 18,
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.BscMainnet,
    isPerc20: true,
    marketApi: 'https://api.coingecko.com/api/v3/coins/pnetwork/market_chart',
  },
  // [AssetId.PNTV2_ON_POLYGON_MAINNET]: {
  //   address: '0xb6bcae6468760bc0cdfb9c8ef4ee75c9dd23e1ed',
  //   id: AssetId.PNTV2_ON_POLYGON_MAINNET,
  //   symbol: 'PNT',
  //   name: 'pTokens PNT',
  //   network: Network.Mainnet,
  //   blockchain: Blockchain.Polygon,
  //   decimals: 18,
  //   image: 'PNT.svg',
  //   withBalanceDecimalsConversion: true,
  //   networkId: NetworkId.PolygonMainnet,
  //   isPerc20: true,
  //   marketApi: 'https://api.coingecko.com/api/v3/coins/pnetwork/market_chart',
  // },
}

export default swapAssets