export const walletConnectV2Connector = async (EthereumProvider, options) => {
  const provider = await EthereumProvider.init({
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: options.chainId,
    showQrModal: options.chainId,
    methods: ['eth_sendTransaction', 'eth_signTransaction', 'eth_sign', 'personal_sign', 'eth_signTypedData'],
    events: ['chainChanged', 'accountsChanged'],
  })

  await provider.connect()

  return provider
}

export const walletConnectV2ConnectorDisplay = {
  logo: './assets/png/walletconnectv2.png',
  name: 'WalletConnect V2',
  description: 'Connect through WalletConnect V2',
}
