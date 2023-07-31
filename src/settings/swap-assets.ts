import BigNumber from 'bignumber.js'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { AssetId } from '../constants'

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
}

export interface HostAsset extends BaseAsset {
  underlyingAsset: AssetId
  nativeSymbol: string
  nativeBlockchain: Blockchain
  nativeDecimals: number
  isPtoken: boolean
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

const swapAssets = [
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
  /* #################   Native Tokens   #################*/
  {
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    id: AssetId.USDC_ON_XDAI,
    symbol: 'USDC',
    name: 'USD//C on xDai',
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 6,
    isNative: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: Blockchain.Gnosis,
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    isPerc20: true,
  },
]

export default swapAssets