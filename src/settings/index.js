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
  PLRC_ON_EOS_MAINNET
} from '../constants'

const settings = {
  dappName: 'pTokens',
  telegram: 'https://t.me/pNetworkDefi',
  googleAnalyticsTrackId: 'UA-157173999-1',
  BLOCKSTREAM_BASE_MAINNET_ENDPOINT: 'https://blockstream.info/api/',
  BLOCKSTREAM_BASE_TESTNET_ENDPOINT: 'https://blockstream.info/testnet/api/',
  // prettier-ignore
  LTC_PTOKENS_NODE_MAINNET_API: 'https://ltc-node-1.ptokens.io/insight-lite-api',
  // prettier-ignore
  LTC_PTOKENS_NODE_TESTNET_API: 'https://ltc-testnet-node-1.ptokens.io/insight-lite-api',
  [PBTC_ON_ETH_MAINNET]: {
    eth: {
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 3000
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
      enclaveBlockHeightPollingTime: 3000
    }
  },
  [PBTC_ON_TELOS_MAINNET]: {
    telos: {
      chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
      host: 'api.telosfoundation.io',
      port: 443,
      protocol: 'https',
      explorer: 'https://telos.bloks.io/',
      endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://api.telosfoundation.io'
    },
    btc: {
      explorer: 'https://blockstream.info/',
      enclaveBlockHeightPollingTime: 3000
    }
  },
  [PLTC_ON_ETH_MAINNET]: {
    eth: {
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    ltc: {
      explorer: 'https://live.blockcypher.com/ltc/',
      enclaveBlockHeightPollingTime: 3000
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
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
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
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_live_D0A703008A4B17B7',
      wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
      network: 'mainnet',
      chainId: 1,
      explorer: 'https://etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    }
  },

  [PBTC_ON_ETH_TESTNET]: {
    eth: {
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      network: 'ropsten',
      chainId: 3,
      explorer: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    btc: {
      explorer: 'https://blockstream.info/testnet/',
      enclaveBlockHeightPollingTime: 3000,
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
      enclaveBlockHeightPollingTime: 3000,
      faucet1: 'https://testnet-faucet.mempool.co',
      faucet2: 'https://bitcoinfaucet.uo1.net/send.php'
    }
  },
  [PLTC_ON_ETH_TESTNET]: {
    eth: {
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      network: 'ropsten',
      chainId: 3,
      explorer: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    ltc: {
      explorer: 'https://testnet.litecore.io/',
      enclaveBlockHeightPollingTime: 3000,
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
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false
    },
    {
      id: PBTC_ON_EOS_MAINNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false
    },
    {
      id: PBTC_ON_TELOS_MAINNET,
      name: 'pBTC',
      tokenType: 'TELOS Token',
      issueFrom: 'BTC',
      redeemFrom: 'TELOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false
    },
    {
      id: PLTC_ON_ETH_MAINNET,
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false
    },
    {
      id: PLTC_ON_EOS_MAINNET,
      name: 'pLTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'LTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false
    },
    {
      id: PETH_ON_EOS_MAINNET,
      name: 'pETH',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PNT_ON_EOS_MAINNET,
      name: 'PNT',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PMKR_ON_EOS_MAINNET,
      name: 'pMKR',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PLINK_ON_EOS_MAINNET,
      name: 'pLINK',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PYFI_ON_EOS_MAINNET,
      name: 'pYFI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PBTC_ON_ETH_TESTNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005'
    },
    {
      id: PBTC_ON_EOS_TESTNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005'
    },
    {
      id: PLTC_ON_ETH_TESTNET,
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      network: 'testnet'
    },
    {
      id: PTERIA_ON_EOS_MAINNET,
      name: 'PTERIA',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PUNI_ON_EOS_MAINNET,
      name: 'pUNI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PBAL_ON_EOS_MAINNET,
      name: 'pBAL',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PBAND_ON_EOS_MAINNET,
      name: 'pBAND',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PCOMP_ON_EOS_MAINNET,
      name: 'pCOMP',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PSNX_ON_EOS_MAINNET,
      name: 'pSNX',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: POMG_ON_EOS_MAINNET,
      name: 'pOMG',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PANT_ON_EOS_MAINNET,
      name: 'pANT',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PDAI_ON_EOS_MAINNET,
      name: 'pDAI',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.0001',
      minimumRedeamable: '0.0001',
      isPerc20: true,
      isHidden: false
    },
    {
      id: PLRC_ON_EOS_MAINNET,
      name: 'pLRC',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isPerc20: true,
      isHidden: false
    }
  ]
}

export default settings
