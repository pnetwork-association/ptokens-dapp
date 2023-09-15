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
  address: string
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
}

export type AssetWithAddress = Asset & {
  address: string
  pTokenAddress: string | null
  formattedName?: string
  balance?: BigNumber
}

export type UpdatedAsset = AssetWithAddress & {
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

export const getAllNativeAssets = () => {
  return Object.entries(swapAssets).reduce((result, [key, asset]) => {
    if (isNative(asset)) {
      result[key as AssetId] = asset
    }
    return result
  }, {} as Record<AssetId, Asset>)
}

export const getAssetById = (id: AssetId) => swapAssets[id] || null

const swapAssets: Record<AssetId, Asset> = {
  /* #################   pTokens   #################*/
  [AssetId.PUSDC_ON_XDAI_MAINNET]: {
    id: AssetId.PUSDC_ON_XDAI_MAINNET,
    name: 'pUSDC',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 18,
    symbol: 'pUSDC',
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Gnosis,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    underlyingAsset: AssetId.USDC_ON_XDAI,
    isPerc20: true,
    isHidden: true,
  },
  [AssetId.PUSDC_ON_ARBITRUM_MAINNET]: {
    id: AssetId.PUSDC_ON_ARBITRUM_MAINNET,
    name: 'pUSDC',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Arbitrum,
    decimals: 18,
    symbol: 'pUSDC',
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Gnosis,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.ArbitrumMainnet,
    underlyingAsset: AssetId.USDC_ON_XDAI,
    isPerc20: true,
  },
  // {
  //   address: '0x62199B909FB8B8cf870f97BEf2cE6783493c4908',
  //   id: 'PBTC_ON_ETH_MAINNET',
  //   name: 'pBTC',
  //   workingName: 'pbtc',
  //   nativeDecimals: 8,
  //   network: Network.Mainnet,
  //   isHidden: false,
  //   blockchain: Blockchain.Ethereum,
  //   decimals: 18,
  //   withMiniImage: true,
  //   symbol: 'PBTC',
  //   isPtoken: true,
  //   nativeSymbol: 'BTC',
  //   nativeBlockchain: Blockchain.Bitcoin,
  //   image: 'pBTC.svg',
  //   withBalanceDecimalsConversion: true,
  //   onPnetworkV2: true,
  //   networkId: NetworkId.SepoliaTestnet,
  // },
  /* #################   Native Tokens   #################*/
  [AssetId.USDC_ON_XDAI]:{
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    id: AssetId.USDC_ON_XDAI,
    symbol: 'USDC',
    name: 'USD//C on xDai',
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 6,
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    isPerc20: true,
    marketApi: 'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart',
  },
  // {
  //   address: null,
  //   id: 'BTC',
  //   symbol: 'BTC',
  //   name: 'Bitcoin',
  //   network: Network.Mainnet,
  //   blockchain: Blockchain.Bitcoin,
  //   withMiniImage: false,
  //   isNative: true,
  //   nativeSymbol: 'BTC',
  //   nativeBlockchain: Blockchain.Bitcoin,
  //   image: 'BTC.svg',
  //   peginWithDepositAddress: true,
  //   withBalanceDecimalsConversion: null,
  //   isBlockchainTokenNative: true,
  //   networkId: NetworkId.SepoliaTestnet,
  //   marketApi: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
  // },
}

export default swapAssets