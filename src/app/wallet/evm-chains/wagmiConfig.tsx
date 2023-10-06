import { configureChains, createConfig } from 'wagmi'
import { arbitrum, bsc, gnosis, mainnet, polygon } from '@wagmi/core/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import settings from '../../../settings'
import { Blockchain, Network } from 'ptokens-constants'


//TODO pass also configuration for providers
const { chains, publicClient } = configureChains(
  [mainnet, arbitrum, bsc, gnosis, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === arbitrum.id ? settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint :
          chain.id === bsc.id ? settings.rpc[Network.Mainnet][Blockchain.Bsc].endpoint:
          chain.id === gnosis.id ? settings.rpc[Network.Mainnet][Blockchain.Gnosis].endpoint:
          chain.id === polygon.id ? settings.rpc[Network.Mainnet][Blockchain.Polygon].endpoint:
          'Unsupported Chain'
      }),
    }),
  ]
)

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '86b104208dd39901af8efecd767e8f6a',
      },
    }),
  ],
  publicClient,
})

export default wagmiConfig