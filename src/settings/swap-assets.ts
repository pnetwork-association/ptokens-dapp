import BigNumber from 'bignumber.js'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { AssetId, TokenId, PTokenId } from '../constants'

export type BaseAsset = {
  address?: string
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
  isHidden?: boolean
  formattedName?: string
  miniImage?: string
  titleLabel?: string
  isSpecial?: boolean
  symbolToDisplay?: string
}

export interface NativeAsset extends BaseAsset {
  address: string
  underlyingAsset?: never
  isPtoken?: never
  nativeSymbol?: never
  nativeBlockchain?: never
  nativeDecimals?: never
}

export interface HostAsset extends BaseAsset {
  address?: never
  underlyingAsset: TokenId
  nativeSymbol: string
  nativeBlockchain: Blockchain
  nativeDecimals: number
  isPtoken: boolean
}

export type Asset = NativeAsset | HostAsset

export type UpdatedAsset = Asset & {
  address: string
  explorer: string
  balance: BigNumber
  formattedBalance: string
  pTokenAddress?: string
  formattedName?: string
  coin?: string
  miniImage?: string
  defaultFrom?: boolean
  defaultTo?: boolean
}

export const isNative = (_asset: Asset) => !isHost(_asset)

export const isHost = (_asset: Asset) => 'underlyingAsset' in _asset

const swapAssets: Asset[] = [
  {
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    id: TokenId.USDC_ON_XDAI,
    symbol: 'USDC',
    name: 'USD//C on xDai',
    network: Network.Mainnet,
    blockchain: Blockchain.Gnosis,
    decimals: 6,
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    networkId: NetworkId.GnosisMainnet,
    isPerc20: true,
  },
  {
    id: PTokenId.PUSDC_ON_XDAI_MAINNET,
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
    underlyingAsset: TokenId.USDC_ON_XDAI,
    isPerc20: true,
    isHidden: true,
  },
  {
    id: PTokenId.PUSDC_ON_ARBITRUM_MAINNET,
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
    underlyingAsset: TokenId.USDC_ON_XDAI,
    isPerc20: true,
  },
]

export default swapAssets
