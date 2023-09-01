import { ChainId } from '.'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

export type Chain = {
  id: ChainId
  chainId: number
  endpoint: string
  network: Network
  blockchain: Blockchain
  image: string
  networkId: NetworkId
}

const swapChains: Chain[] = [
  /* #################   Chains   #################*/
  {
    id: ChainId.ETH,
    chainId: 1,
    endpoint: 'https://cloudflare-eth.com/',
    blockchain: Blockchain.Ethereum,
    networkId: NetworkId.SepoliaTestnet, // not really supported yet
    network: Network.Mainnet,
    image: 'ETH.svg'
  },
  {
    id: ChainId.BSC,
    chainId: 56,
    endpoint: 'https://bsc-dataseed1.binance.org/',
    blockchain: Blockchain.Bsc,
    networkId: NetworkId.GoerliTestnet, // not really supported yet
    network: Network.Mainnet,
    image: 'BSC.svg'
  },
  {
    id: ChainId.GNOSIS,
    chainId: 100,
    endpoint: 'https://rpc.xdaichain.com/',
    blockchain: Blockchain.Gnosis,
    networkId: NetworkId.GnosisMainnet,
    network: Network.Mainnet,
    image: 'GNOSIS.svg'
  },
  {
    id: ChainId.ARBITRUM,
    chainId: 42161,
    endpoint: 'https://arb1.arbitrum.io/rpc',
    blockchain: Blockchain.Arbitrum,
    networkId: NetworkId.ArbitrumMainnet,
    network: Network.Mainnet,
    image: 'ARBITRUM.svg'
  },
  // {
  //   id: ChainId.BTC,
  //   blockchain: Blockchain.Bitcoin,
  //   networkId: NetworkId.SepoliaTestnet,
  //   network: Network.Mainnet,
  //   image: 'BTC.svg'
  // },
]

export default swapChains