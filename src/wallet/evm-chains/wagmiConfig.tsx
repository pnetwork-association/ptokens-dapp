import { configureChains, createConfig } from 'wagmi'
import { arbitrum, bsc, gnosis, mainnet } from '@wagmi/core/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient } = configureChains(
  [arbitrum, gnosis, bsc, mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://arb1.arbitrum.io/rpc`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc.xdaichain.com/`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://bsc-dataseed1.binance.org/`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://cloudflare-eth.com/`,
      }),
    }),
  ],
)

const wagmiConfig = createConfig({
  autoConnect: true,
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