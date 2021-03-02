import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PLTC_ON_ETH_TESTNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET,
  PTERIA_ON_EOS_MAINNET,
  PUNI_ON_EOS_MAINNET,
  PBAL_ON_EOS_MAINNET,
  PBAND_ON_EOS_MAINNET,
  PCOMP_ON_EOS_MAINNET,
  PSNX_ON_EOS_MAINNET,
  POMG_ON_EOS_MAINNET,
  PDAI_ON_EOS_MAINNET,
  PANT_ON_EOS_MAINNET,
  PLRC_ON_EOS_MAINNET,
  PUOS_ON_EOS_MAINNET,
  PBAT_ON_EOS_MAINNET,
  PREP_ON_EOS_MAINNET,
  PZRX_ON_EOS_MAINNET,
  PPNK_ON_EOS_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  PBTC_ON_XDAI_MAINNET
} from '../constants'

const settings = {
  dappName: 'pTokens',
  telegram: 'https://t.me/pNetworkDefi',
  googleAnalyticsTrackId: 'UA-157173999-1',
  BLOCKSTREAM_BASE_MAINNET_ENDPOINT: 'https://blockstream.info/api/',
  BLOCKSTREAM_BASE_TESTNET_ENDPOINT: 'https://blockstream.info/testnet/api/',
  pNetworkStats: 'https://chart.ptokens.io/index.php?a=pnetwork-node-stats',
  LTC_PTOKENS_NODE_MAINNET_API: 'https://ltc-node-1.ptokens.io/insight-lite-api',
  LTC_PTOKENS_NODE_TESTNET_API: 'https://ltc-testnet-node-1.ptokens.io/insight-lite-api',
  supportedBlockchains: [
    {
      name: 'Ethereum',
      symbol: 'ETH'
    },
    {
      name: 'Binance Smart Chain',
      symbol: 'BSC'
    },
    {
      name: 'EOS',
      symbol: 'EOS'
    },
    {
      name: 'Polygon',
      symbol: 'POLYGON'
    },
    {
      name: 'Telos',
      symbol: 'TELOS'
    },
    {
      name: 'xDai',
      symbol: 'XDAI'
    }
  ],
  rpc: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/'
    },
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    telos: {
      chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
      host: 'telos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://telos.bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com'
    },
    bsc: {
      httpsBinanceSeedEndpoint: 'https://bsc-dataseed.binance.org/'
    },
    xdai: {
      httpsXdaiChainEndpoint: 'https://rpc.xdaichain.com/'
    },
    polygon: {
      httpMaticEndpoint: 'https://rpc-mainnet.matic.network'
    }
  },

  [PBTC_ON_ETH_MAINNET]: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBTC_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBTC_ON_TELOS_MAINNET]: {
    telos: {
      chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
      host: 'telos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://telos.bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com'
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PLTC_ON_ETH_MAINNET]: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    },
    ltc: {
      explorer: 'https://live.blockcypher.com/ltc/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PLTC_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    ltc: {
      explorer: 'https://live.blockcypher.com/ltc/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PETH_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PNT_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PMKR_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PLINK_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PYFI_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PTERIA_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PUNI_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBAND_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBAL_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PCOMP_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/'
    },
    bsc: {
      httpsBinanceSeedEndpoint: 'https://bsc-dataseed.binance.org/',
      network: 'mainnet',
      chainId: 56,
      explorer: 'https://bscscan.com/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PSNX_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [POMG_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PDAI_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PANT_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PLRC_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PUOS_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBAT_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PREP_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PZRX_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PPNK_ON_EOS_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PDOGE_ON_ETH_MAINNET]: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    },
    doge: {
      explorer: 'https://dogechain.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PEOS_ON_ETH_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBTC_ON_BSC_MAINNET]: {
    bsc: {
      httpsBinanceSeedEndpoint: 'https://bsc-dataseed.binance.org/',
      network: 'mainnet',
      chainId: 56,
      explorer: 'https://bscscan.com/',
      enclaveBlockHeightPollingTime: 15000
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PEOS_ON_POLYGON_MAINNET]: {
    eos: {
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      explorer: 'https://bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
    },
    polygon: {
      httpMaticEndpoint: 'https://rpc-mainnet.matic.network',
      network: 'mainnet',
      chainId: 137,
      explorer: 'https://explorer-mainnet.maticvigil.com/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBTC_ON_XDAI_MAINNET]: {
    xdai: {
      httpsXdaiChainEndpoint: 'https://rpc.xdaichain.com/',
      network: 'mainnet',
      chainId: 100,
      explorer: 'https://blockscout.com/poa/xdai/',
      enclaveBlockHeightPollingTime: 15000
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 15000
    }
  },
  [PBTC_ON_ETH_TESTNET]: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      network: 'ropsten',
      chainId: 3,
      explorer: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    },
    btc: {
      explorer: 'https://blockstream.info/testnet/',
      enclaveBlockHeightPollingTime: 15000,
      faucet1: 'https://testnet-faucet.mempool.co',
      faucet2: 'https://bitcoinfaucet.uo1.net/send.php'
    }
  },
  [PBTC_ON_EOS_TESTNET]: {
    eos: {
      chainId: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
      host: '23.97.190.44',
      port: 8888,
      protocol: 'http',
      explorer:
        'https://local.bloks.io/?nodeUrl=jungle3.cryptolions.io&systemDomain=eosio&hyperionUrl=https%3A%2F%2Fjungle3history.cryptolions.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://pbtc-on-eos-jungle-3.ptokens.io'
    },
    btc: {
      explorer: 'https://blockstream.info/testnet/',
      enclaveBlockHeightPollingTime: 15000,
      faucet1: 'https://testnet-faucet.mempool.co',
      faucet2: 'https://bitcoinfaucet.uo1.net/send.php'
    }
  },
  [PLTC_ON_ETH_TESTNET]: {
    eth: {
      infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      network: 'ropsten',
      chainId: 3,
      explorer: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 15000
    },
    ltc: {
      explorer: 'https://testnet.litecore.io/',
      enclaveBlockHeightPollingTime: 15000,
      faucet1: 'http://faucet.thonguyen.net/ltc'
    }
  },
  pTokensAvailable: [
    {
      id: PBTC_ON_ETH_MAINNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PBTC_ON_EOS_MAINNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PBTC_ON_TELOS_MAINNET,
      name: 'pBTC',
      tokenType: 'TELOS Token',
      issueFrom: 'BTC',
      redeemFrom: 'TELOS',
      realDecimals: 8,
      contractDecimals: 8,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'TELOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PLTC_ON_ETH_MAINNET,
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC'
    },
    {
      id: PLTC_ON_EOS_MAINNET,
      name: 'pLTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'LTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC'
    },
    {
      id: PETH_ON_EOS_MAINNET,
      name: 'pETH',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PETH',
      isPtoken: true,
      nativeSymbol: 'ETH'
    },
    {
      id: PNT_ON_EOS_MAINNET,
      name: 'PNT',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PNT',
      isPtoken: true,
      nativeSymbol: 'PNT'
    },
    {
      id: PMKR_ON_EOS_MAINNET,
      name: 'pMKR',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PMKR',
      isPtoken: true,
      nativeSymbol: 'MKR'
    },
    {
      id: PLINK_ON_EOS_MAINNET,
      name: 'pLINK',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PLINK',
      isPtoken: true,
      nativeSymbol: 'LINK'
    },
    {
      id: PYFI_ON_EOS_MAINNET,
      name: 'pYFI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PYFI',
      isPtoken: true,
      nativeSymbol: 'YFI'
    },
    {
      id: PBTC_ON_ETH_TESTNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 0,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      blockchain: 'EOS',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PBTC_ON_EOS_TESTNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PLTC_ON_ETH_TESTNET,
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'testnet',
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC'
    },
    {
      id: PTERIA_ON_EOS_MAINNET,
      name: 'PTERIA',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PTERIA',
      isPtoken: true,
      nativeSymbol: 'PTERIA'
    },
    {
      id: PUNI_ON_EOS_MAINNET,
      name: 'pUNI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PUNI',
      isPtoken: true,
      nativeSymbol: 'UNI'
    },
    {
      id: PBAL_ON_EOS_MAINNET,
      name: 'pBAL',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBAL',
      isPtoken: true,
      nativeSymbol: 'BAL'
    },
    {
      id: PBAND_ON_EOS_MAINNET,
      name: 'pBAND',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBAND',
      isPtoken: true,
      nativeSymbol: 'BAND'
    },
    {
      id: PCOMP_ON_EOS_MAINNET,
      name: 'pCOMP',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PCOMP',
      isPtoken: true,
      nativeSymbol: 'COMP'
    },
    {
      id: PSNX_ON_EOS_MAINNET,
      name: 'pSNX',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PSNX',
      isPtoken: true,
      nativeSymbol: 'SNX'
    },
    {
      id: POMG_ON_EOS_MAINNET,
      name: 'pOMG',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'POMG',
      isPtoken: true,
      nativeSymbol: 'OMG'
    },
    {
      id: PANT_ON_EOS_MAINNET,
      name: 'pANT',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PANT',
      isPtoken: true,
      nativeSymbol: 'ANT'
    },
    {
      id: PDAI_ON_EOS_MAINNET,
      name: 'pDAI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 4,
      totalSupplyFixedDecimals: 4,
      network: 'mainnet',
      minimumIssuable: '0.0001',
      minimumRedeamable: '0.0001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PDAI',
      isPtoken: true,
      nativeSymbol: 'DAI'
    },
    {
      id: PLRC_ON_EOS_MAINNET,
      name: 'pLRC',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PLRC',
      isPtoken: true,
      nativeSymbol: 'LRC'
    },
    {
      id: PUOS_ON_EOS_MAINNET,
      name: 'pUOS',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 4,
      contractDecimals: 0,
      balanceFixedDecimals: 4,
      totalSupplyFixedDecimals: 4,
      network: 'mainnet',
      minimumIssuable: '0.0001',
      minimumRedeamable: '0.0001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PUOS',
      isPtoken: true,
      nativeSymbol: 'UOS'
    },
    {
      id: PBAT_ON_EOS_MAINNET,
      name: 'pBAT',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBAT',
      isPtoken: true,
      nativeSymbol: 'BAT'
    },
    {
      id: PREP_ON_EOS_MAINNET,
      name: 'pREP',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PREP',
      isPtoken: true,
      nativeSymbol: 'REP'
    },
    {
      id: PZRX_ON_EOS_MAINNET,
      name: 'pZRX',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PZRX',
      isPtoken: true,
      nativeSymbol: 'ZRX'
    },
    {
      id: PPNK_ON_EOS_MAINNET,
      name: 'pPNK',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      balanceFixedDecimals: 9,
      totalSupplyFixedDecimals: 9,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PPNK',
      isPtoken: true,
      nativeSymbol: 'PNK'
    },
    {
      id: PDOGE_ON_ETH_MAINNET,
      name: 'pDOGE',
      tokenType: 'ERC-20',
      issueFrom: 'DOGE',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PDOGE',
      isPtoken: true,
      nativeSymbol: 'DOGE'
    },
    {
      id: PEOS_ON_ETH_MAINNET,
      name: 'pEOS',
      tokenType: 'ERC-20',
      issueFrom: 'EOS',
      redeemFrom: 'ETH',
      realDecimals: 0,
      contractDecimals: 18,
      balanceFixedDecimals: 4,
      totalSupplyFixedDecimals: 4,
      network: 'mainnet',
      // TODO: change amounts
      minimumIssuable: '0.0001',
      minimumRedeamable: '0.00001',
      isPeosioToken: true,
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PEOS',
      isPtoken: true,
      nativeSymbol: 'EOS'
    },
    {
      id: PBTC_ON_BSC_MAINNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'BSC',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PEOS_ON_POLYGON_MAINNET,
      name: 'pEOS',
      tokenType: 'ERC-20',
      issueFrom: 'EOS',
      redeemFrom: 'POLYGON',
      realDecimals: 0,
      contractDecimals: 18,
      balanceFixedDecimals: 4,
      totalSupplyFixedDecimals: 4,
      network: 'mainnet',
      // TODO: change amounts
      minimumIssuable: '0.0001',
      minimumRedeamable: '0.00001',
      isPeosioToken: true,
      isHidden: false,
      blockchain: 'POLYGON',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    },
    {
      id: PBTC_ON_XDAI_MAINNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'XDAI',
      realDecimals: 8,
      contractDecimals: 18,
      balanceFixedDecimals: 8,
      totalSupplyFixedDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'XDAI',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC'
    }
  ]
}

export default settings
