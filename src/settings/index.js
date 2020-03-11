const settings = {
  dappName: 'pTokens Dapp',
  telegram: 'https://t.me/ptokens',
  googleAnalyticsTrackId: 'UA-157173999-1',
  peos: {
    eth: {
      wsInfuraEndpoint: 'wss://kovan.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://kovan.infura.io/v3/',
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: 'd1f79009-507e-48a9-be58-30468c67b33c',
      formaticKey: 'pk_test_48E59AF566747C40',
      network: 'kovan',
      chainId: 42,
      etherscanLink: 'https://kovan.etherscan.io/',
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
  },
  pbtc: {
    infuraProjectId: '4762c881ac0c4938be76386339358ed6',
    portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
    formaticKey: 'pk_test_48E59AF566747C40',
    testnet: {
      eth: {
        wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
        httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
        network: 'ropsten',
        chainId: 3,
        etherscanLink: 'https://ropsten.etherscan.io/',
        enclaveBlockHeightPollingTime: 3000
      },
      btc: {
        explorer: 'https://blockstream.info/testnet/',
        enclaveBlockHeightPollingTime: 3000,
        faucet1: 'https://testnet-faucet.mempool.co',
        faucet2: 'https://bitcoinfaucet.uo1.net/send.php',
        publicKey:
          '0x02157351e30cfcb2603cfbfaab4c87d795839c907c068c9710b2230e8af72bc9d7'
      }
    },
    mainnet: {
      eth: {
        wsInfuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
        httpsInfuraEndpoint: 'https://mainnet.infura.io/v3/',
        network: 'mainnet',
        chainId: 1,
        etherscanLink: 'https://etherscan.io/',
        enclaveBlockHeightPollingTime: 3000
      },
      btc: {
        explorer: 'https://blockstream.info/',
        enclaveBlockHeightPollingTime: 3000,
        publicKey:
          '0x0367663eeb293b978b495c20dee62cbfba551bf7e05a8381b374af84861ab6de39'
      }
    }
  },
  pltc: {
    eth: {
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3/',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
      formaticKey: 'pk_test_48E59AF566747C40',
      network: 'ropsten',
      chainId: 3,
      etherscanLink: 'https://ropsten.etherscan.io/',
      enclaveBlockHeightPollingTime: 3000
    },
    ltc: {
      explorer: 'https://testnet.litecore.io/',
      enclaveBlockHeightPollingTime: 3000,
      faucet1: 'https://faucet.xblau.com/',
      faucet2: 'https://tltc.bitaps.com/'
    }
  }
}

export default settings
