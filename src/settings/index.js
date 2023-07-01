import { Blockchain, Network } from 'ptokens-constants'
import { getWeb3Settings } from 'react-web3-settings'

const settings = {
  dappName: 'pTokens Dapp',
  links: {
    audit: 'https://skynet.certik.com/projects/pnt',
    stats: 'https://pnetwork.watch/',
    coinmarketcap: 'https://coinmarketcap.com/currencies/pnetwork/',
    twitter: 'https://twitter.com/pNetworkDeFi',
    telegram: 'https://t.me/pNetworkDefi',
    'p.network': 'https://p.network/',
    github: 'https://github.com/pnetwork-association/ptokens-dapp/',
  },
  api: {
    bpm: 'https://pnetwork.watch:8082/sync-status?apikey=a1d87144c4d60917b880d9fed94d480829d0893a',
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
  },
  explorers: {
    [Network.Mainnet]: {
      [Blockchain.Gnosis]: 'https://gnosisscan.io/',
      [Blockchain.Arbitrum]: 'https://arbiscan.io/',
    },
  },
}

export const getFactoryAddressByBlockchain = (_blockchain, _network = Network.Mainnet) => {
  const web3Settings = getWeb3Settings()
  switch (_blockchain) {
    case Blockchain.Arbitrum:
    case Blockchain.Gnosis:
      return web3Settings.factoryAddress[_blockchain]
    default:
      throw new Error(`Missing factory address for blockchain ${_blockchain}`)
  }
}

export default settings
