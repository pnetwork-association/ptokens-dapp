import EthereumProvider from '@walletconnect/ethereum-provider'

const walletConnectV2Connector = async (_package, options) => {
  const provider = await _package.init({
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: options.chainId,
    showQrModal: options.chainId,
    methods: ['eth_sendTransaction', 'eth_signTransaction', 'eth_sign', 'personal_sign', 'eth_signTypedData'],
    events: ['chainChanged', 'accountsChanged'],
  })

  await provider.connect()

  return provider
}

const walletConnectV2ConnectorDisplay = {
  logo: './assets/png/walletconnectv2.png',
  name: 'WalletConnect V2',
  description: 'Connect through WalletConnect V2',
}

export const createWalletConnect2 = (_chainId) => ({
  display: walletConnectV2ConnectorDisplay,
  options: {
    chainId: [_chainId],
    showQrModal: true,
  },
  package: EthereumProvider,
  connector: walletConnectV2Connector,
})
