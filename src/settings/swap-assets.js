import { Blockchain, Network, NetworkId } from 'ptokens-constants'

import { pTokenId, tokenId } from '../constants'

const swapAssets = [
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
    underlyingAsset: tokenId.USDC_ON_XDAI,
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
    underlyingAsset: tokenId.USDC_ON_XDAI,
    isPerc20: true,
  },
  /* #################   Native Tokens   #################*/
  {
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    id: tokenId.USDC_ON_XDAI,
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
