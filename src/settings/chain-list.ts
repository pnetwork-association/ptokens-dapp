import { ChainId } from '../constants'
import { Blockchain, Network, NetworkId } from 'ptokens-constants'

export type BaseChain = {
  id: ChainId
  network: Network
  blockchain: Blockchain
  image: string
  networkId: NetworkId
}

const chainList = [
  /* #################   Chains   #################*/
  {
    id: ChainId.XDAI,
    blockchain: Blockchain.Gnosis,
    networkId: NetworkId.GnosisMainnet,
    network: Network.Mainnet,
    image: 'XDAI.svg'
  },
  {
    id: ChainId.ARBITRUM,
    blockchain: Blockchain.Arbitrum,
    networkId: NetworkId.ArbitrumMainnet,
    network: Network.Mainnet,
    image: 'ARBITRUM.svg'
  },
  {
    id: ChainId.BTC,
    blockchain: Blockchain.Bitcoin,
    networkId: NetworkId.SepoliaTestnet,
    network: Network.Mainnet,
    image: 'BTC.svg'
  },
  {
    id: ChainId.ETH,
    blockchain: Blockchain.Ethereum,
    networkId: NetworkId.SepoliaTestnet,
    network: Network.Mainnet,
    image: 'ETH.svg'
  },
]

export default chainList