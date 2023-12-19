import { configureChains, createConfig } from 'wagmi'
import { mainnet, bsc, gnosis, polygon } from '@wagmi/core/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { getWeb3Settings } from 'react-web3-settings'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Blockchain, Network } from 'ptokens-constants'

import settings from '../../../settings'

const setting = getWeb3Settings()

const getRpcEndpoint = (blockchain: Blockchain) => setting.rpcEndpoints ? setting.rpcEndpoints[blockchain] : settings.rpc[Network.Mainnet][blockchain].endpoint

//TODO pass also configuration for providers
const { chains, publicClient } = configureChains(
  [mainnet, bsc, gnosis, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === mainnet.id ? getRpcEndpoint(Blockchain.Ethereum) :
          chain.id === bsc.id ? getRpcEndpoint(Blockchain.Bsc) :
          chain.id === gnosis.id ? getRpcEndpoint(Blockchain.Gnosis) :
          chain.id === polygon.id ? getRpcEndpoint(Blockchain.Polygon) :
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
        appName: 'pNetwork-v3',
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