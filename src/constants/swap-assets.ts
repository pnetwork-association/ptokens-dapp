import BigNumber from 'bignumber.js'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { AssetId } from '.'

export const IS_NATIVE = 'isNative'
export const IS_PTOKEN = 'isPtoken'

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
  [IS_NATIVE]: boolean
  address: string
  marketApi: string
}

export interface HostAsset extends BaseAsset {
  [IS_PTOKEN]: boolean
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

const swapAssets: Asset[] = [
  /* #################   pTokens   #################*/
  {
    id: AssetId.PUSDC_ON_XDAI_MAINNET,
    name: 'pUSDC',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 18,
    symbol: 'pUSDC',
    isPtoken: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Gnosis,
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    underlyingAsset: AssetId.USDC_ON_XDAI,
    isPerc20: true,
    isHidden: true,
  },
  {
    id: AssetId.PUSDC_ON_ARBITRUM_MAINNET,
    name: 'pUSDC',
    nativeDecimals: 6,
    network: Network.Mainnet,
    blockchain: Blockchain.Arbitrum,
    decimals: 18,
    symbol: 'pUSDC',
    isPtoken: true,
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
  {
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
    isNative: true,
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
]

export default swapAssets