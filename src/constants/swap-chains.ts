import { ChainId } from '.'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

export type Chain = {
  id: ChainId
  chainId: number
  endpoint: string
  network: Network
  blockchain: Blockchain
  image: string
  disabledImage: string
  networkId: NetworkId
}

export const getChainById = (id: ChainId) => swapChains[id] || null

export const getChainByBlockchain = (blockchain: Blockchain) => Object.values(swapChains).find((chain: Chain) => chain.blockchain == blockchain) as Chain

const swapChains: Record<ChainId, Chain> = {
  /* #################   Chains   #################*/
  [ChainId.ETH]: {
    id: ChainId.ETH,
    chainId: 1,
    endpoint: 'https://cloudflare-eth.com/',
    blockchain: Blockchain.Ethereum,
    networkId: NetworkId.SepoliaTestnet, // not really supported yet
    network: Network.Mainnet,
    image: 'ETH.svg',
    disabledImage: 'ETH_gray.svg'
  },
  [ChainId.BSC]: {
    id: ChainId.BSC,
    chainId: 56,
    endpoint: 'https://bsc-dataseed1.binance.org/',
    blockchain: Blockchain.Bsc,
    networkId: NetworkId.GoerliTestnet, // not really supported yet
    network: Network.Mainnet,
    image: 'BSC.svg',
    disabledImage: 'BSC_gray.svg'
  },
  [ChainId.GNOSIS]: {
    id: ChainId.GNOSIS,
    chainId: 100,
    endpoint: 'https://rpc.xdaichain.com/',
    blockchain: Blockchain.Gnosis,
    networkId: NetworkId.GnosisMainnet,
    network: Network.Mainnet,
    image: 'GNOSIS.svg',
    disabledImage: 'GNOSIS_gray.svg'
  },
  [ChainId.ARBITRUM]: {
    id: ChainId.ARBITRUM,
    chainId: 42161,
    endpoint: 'https://arb1.arbitrum.io/rpc',
    blockchain: Blockchain.Arbitrum,
    networkId: NetworkId.ArbitrumMainnet,
    network: Network.Mainnet,
    image: 'ARBITRUM.svg',
    disabledImage: 'ARBITRUM_gray.svg'
  },
  [ChainId.POLYGON]: {
    id: ChainId.POLYGON,
    chainId: 137,
    endpoint: 'https://polygon-rpc.com/',
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.PolygonMainnet,
    network: Network.Mainnet,
    image: 'POLYGON.svg',
    disabledImage: 'POLYGON_gray.svg'
  },
}

export default swapChains