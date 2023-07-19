import { Blockchain, Network } from 'ptokens-constants'
import { getWeb3Settings } from 'react-web3-settings'

interface ISettings {
  dappName: string
  links: Record<string, string>
  supportedBlockchains: Array<{ name: string; symbol: string }>
  rpc: Record<Network, Record<Blockchain, { endpoint: string; chainId: number }>>
  explorers: Record<Network, Record<Blockchain, string>>
}

const settings: ISettings = {
  dappName: 'pTokens Dapp',
  links: {
    audit: 'https://skynet.certik.com/projects/pnt',
    stats: 'https://pnetwork.watch/',
    coinmarketcap: 'https://coinmarketcap.com/currencies/pnetwork/',
    twitter: 'https://twitter.com/pNetworkDeFi',
    telegram: 'https://t.me/pNetworkDefi',
    'p.network': 'https://p.network/',
    github: 'https://github.com/pnetwork-association/',
  },
  supportedBlockchains: [
    {
      name: 'xDai',
      symbol: 'XDAI',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARBITRUM',
    },
  ],
  rpc: {
    [Network.Mainnet]: {
      [Blockchain.Gnosis]: {
        endpoint: 'https://rpc.xdaichain.com/',
        chainId: 100,
      },
      [Blockchain.Arbitrum]: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
        chainId: 42161,
      },
    },
    [Network.Testnet]: {},
  },
  explorers: {
    [Network.Mainnet]: {
      [Blockchain.Gnosis]: 'https://gnosisscan.io/',
      [Blockchain.Arbitrum]: 'https://arbiscan.io/',
    },
    [Network.Testnet]: {},
  },
}

export const getFactoryAddressByBlockchain = (_blockchain: Blockchain, _network = Network.Mainnet) => {
  const web3Settings = getWeb3Settings() as { factoryAddress: Record<Blockchain, string> }
  switch (_blockchain) {
    case Blockchain.Arbitrum:
    case Blockchain.Gnosis:
      return web3Settings.factoryAddress[_blockchain]
    default:
      throw new Error(`Missing factory address for blockchain ${_blockchain}`)
  }
}

export default settings
