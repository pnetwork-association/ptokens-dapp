import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { AssetId, PTokenId, TokenId } from '../constants'

export type Asset = {
  id: AssetId
  address: string
  name: string
  nativeDecimals?: number
  network: Network
  blockchain: Blockchain
  decimals: number
  symbol: string
  isPtoken?: boolean
  nativeSymbol: string
  nativeBlockchain: Blockchain
  image: string
  withBalanceDecimalsConversion: boolean
  networkId: NetworkId
  isPerc20: boolean
  underlyingAsset?: TokenId
  isHidden?: boolean
  pTokenAddress?: string
  isNative?: boolean
  formattedName?: string
  formattedBalance?: string
  coin?: string
  miniImage?: string
  balance?: string
  defaultFrom?: boolean
  defaultTo?: boolean
}

const swapAssets: Asset[] = [
  /* #################   pTokens   #################*/
  {
    id: pTokenId.PUSDC_ON_XDAI_MAINNET,
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
    id: pTokenId.PUSDC_ON_ARBITRUM_MAINNET,
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
  /* #################   Native Tokens   #################*/
  {
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    id: TokenId.USDC_ON_XDAI,
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
