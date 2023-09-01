const settings = {
  dappName: 'pTokens Dapp v3',
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
    bpm: 'https://internal.pnetwork.watch:8082/sync-status?apikey=a1d87144c4d60917b880d9fed94d480829d0893a',
  },
  supportedBlockchains: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
    },
    {
      name: 'Binance Smart Chain',
      symbol: 'BSC',
    },
    {
      name: 'gnosis',
      symbol: 'GNOSIS',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARBITRUM',
    },
  ],
  rpc: {
    mainnet: {
      eth: {
        endpoint: 'https://cloudflare-eth.com/',
        chainId: 1,
        label: 'Ethereum',
      },
      bsc: {
        endpoint: 'https://bsc-dataseed1.binance.org/',
        chainId: 56,
        label: 'BSC',
      },
      gnosis: {
        endpoint: 'https://rpc.xdaichain.com/',
        chainId: 100,
        label: 'GNOSIS',
      },
      arbitrum: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
        chainId: 42161,
        label: 'Arbitrum',
      },
    },
  },
  explorers: {
    mainnet: {
      eth: 'https://etherscan.io/',
      bsc: 'https://bscscan.com/',
      gnosis: 'https://gnosisscan.io/',
      arbitrum: 'https://arbiscan.io/',
    },
  },
}

export default settings
