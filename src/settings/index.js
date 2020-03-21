const settings = {
  dappName: 'pTokens Dapp',
  telegram: 'https://t.me/ptokens',
  googleAnalyticsTrackId: 'UA-157173999-1',
  /*peos: {
    eth: {
      wsInfuraEndpoint: 'wss://kovan.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://kovan.infura.io/v3/',
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: 'd1f79009-507e-48a9-be58-30468c67b33c',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      network: 'kovan',
      chainId: 42,
      explorer: 'https://kovan.etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    eos: {
      blockchain: 'eos',
      chainId:
        'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
      host: 'ptoken-eos.provable.xyz',
      port: 443,
      protocol: 'https',
      explorer: 'https://jungle.bloks.io/',
      provableEndpoint: 'https://ptoken-eos.provable.xyz:443',
      token: {
        symbol: 'SYS',
        contract: 'eosio.token',
        decimals: 4
      },
      enclaveBlockHeightPollingTime: 3000
    }
  },*/
  0: {
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
  1: {
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
  2: {
    eos: {
      chainId:
        'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
      host: 'ptoken-eos.provable.xyz',
      port: 443,
      protocol: 'https',
      explorer: 'https://jungle.bloks.io/',
      provableEndpoint: 'https://eosjungle.ptokens.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    btc: {
      explorer: 'https://blockstream.info/testnet/',
      enclaveBlockHeightPollingTime: 3000,
      faucet1: 'https://testnet-faucet.mempool.co',
      faucet2: 'https://bitcoinfaucet.uo1.net/send.php'
    }
  }

  /*pltc: {
    eth: {
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      fortmaticKey: 'pk_test_48E59AF566747C40',
      network: 'ropsten',
      chainId: 3,
      explorer: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    ltc: {
      explorer: 'https://testnet.litecore.io/',
      enclaveBlockHeightPollingTime: 3000,
      faucet1: 'https://faucet.xblau.com/',
      faucet2: 'https://tltc.bitaps.com/'
    }
  }*/
}

export default settings
