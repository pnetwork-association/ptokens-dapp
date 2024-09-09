import { Chain, Protocol } from '@p.network/ptokens-constants'
import { getWeb3Settings } from '@p.network/react-web3-settings'

interface ISettings {
  dappName: string
  links: Record<string, string>
  supportedBlockchains: Array<{ name: string; symbol: string }>
  rpc: Record<Protocol, Partial<Record<Chain, { endpoint: string; chainId?: string }>>>
  explorers: Record<Protocol, Partial<Record<Chain, string>>>
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
      name: 'mainnet',
      symbol: 'MAINNET',
    },
    {
      name: 'Bsc',
      symbol: 'BSC',
    },
  ],
  rpc: {
    [Protocol.EVM]: {
      [Chain.GnosisMainnet]: {
        endpoint: 'https://rpc.gnosischain.com/',
        chainId: Chain.GnosisMainnet,
      },
      [Chain.EthereumMainnet]: {
        endpoint: 'https://ethereum.publicnode.com',
        chainId: Chain.EthereumMainnet,
      },
      [Chain.BscMainnet]: {
        endpoint: 'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
        chainId: Chain.BscMainnet,
      },
      [Chain.PolygonMainnet]: {
        endpoint: 'https://polygon-rpc.com/',
        chainId: Chain.PolygonMainnet,
      }
    },
    [Protocol.EOS]: {
      [Chain.EosMainnet]: {
        endpoint: 'https://bloks.io/',
        chainId: Chain.EosMainnet,
      },
    },
  },
  explorers: {
    [Protocol.EVM]: {
      [Chain.GnosisMainnet]: 'https://gnosisscan.io/',
      [Chain.EthereumMainnet]: 'https://etherscan.io/',
      [Chain.PolygonMainnet]: 'https://polygonscan.com/',
      [Chain.BscMainnet]: 'https://bscscan.com/'
    },
    [Protocol.EOS]: {
      [Chain.EosMainnet]: 'https://bloks.io/'
    },
  },
}

export const getAdapterAddressByBlockchain = (_chain: Chain) => {
  const web3Settings = getWeb3Settings() as { adapterAddress: Record<Chain, string> }
  switch (_chain) {
    case Chain.EthereumMainnet:
      return web3Settings.adapterAddress[_chain]
    case Chain.GnosisMainnet:
      return web3Settings.adapterAddress[_chain]
    case Chain.PolygonMainnet:
      return web3Settings.adapterAddress[_chain]
    case Chain.BscMainnet:
      return web3Settings.adapterAddress[_chain]
    default:
      throw new Error(`Missing factory address for blockchain ${_chain}`)
  }
}

export default settings