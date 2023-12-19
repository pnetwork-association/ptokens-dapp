import { Blockchain, Network } from 'ptokens-constants'
import { getWeb3Settings } from 'react-web3-settings'

interface ISettings {
  dappName: string
  links: Record<string, string>
  supportedBlockchains: Array<{ name: string; symbol: string }>
  rpc: Record<number, Record<number, { endpoint: string; chainId: number }>>
  explorers: Record<number, Record<number, string>>
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
      name: 'gnosis',
      symbol: 'GNOSIS',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARBITRUM',
    },
    {
      name: 'Bsc',
      symbol: 'BSC',
    },
    {
      name: 'Polygon',
      symbol: 'POLYGON',
    },
  ],
  rpc: {
    [Network.Mainnet]: {
      [Blockchain.Gnosis]: {
        endpoint: 'https://rpc.gnosischain.com/',
        chainId: 100,
      },
      [Blockchain.Ethereum]: {
        endpoint: 'https://ethereum.publicnode.com',
        chainId: 1,
      },
      [Blockchain.Arbitrum]: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
        chainId: 42161,
      },
      [Blockchain.Bsc]: {
        endpoint: 'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
        chainId: 56,
      },
      [Blockchain.Polygon]: {
        endpoint: 'https://polygon-rpc.com/',
        chainId: 137,
      },
    },
    [Network.Testnet]: {},
  },
  explorers: {
    [Network.Mainnet]: {
      [Blockchain.Gnosis]: 'https://gnosisscan.io/',
      [Blockchain.Ethereum]: 'https://etherscan.io/',
      [Blockchain.Arbitrum]: 'https://arbiscan.io/',
      [Blockchain.Polygon]: 'https://polygonscan.com/',
      [Blockchain.Bsc]: 'https://bscscan.com/',
    },
    [Network.Testnet]: {},
  },
}

export const getFactoryAddressByBlockchain = (_blockchain: Blockchain, _network = Network.Mainnet) => {
  const web3Settings = getWeb3Settings() as { factoryAddress: Record<Blockchain, string> }
  switch (_blockchain) {
    case Blockchain.Ethereum:
      return web3Settings.factoryAddress[_blockchain]
    case Blockchain.Gnosis:
      return web3Settings.factoryAddress[_blockchain]
    case Blockchain.Polygon:
      return web3Settings.factoryAddress[_blockchain]
    case Blockchain.Bsc:
      return web3Settings.factoryAddress[_blockchain]
    default:
      throw new Error(`Missing factory address for blockchain ${_blockchain}`)
  }
}

export default settings