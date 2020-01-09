const settings = {
  dappName: 'pTokens Dapp',
  api: {
    endpoint: 'https://nuc-bridge-1.ngrok.io/'
  },
  peos: {
    eth: {
    wsInfuraEndpoint: 'wss://kovan.infura.io/ws/v3',
    httpsInfuraEndpoint: 'https://kovan.infura.io/v3/',
    infuraProjectId: '4762c881ac0c4938be76386339358ed6',
    portisDappId: 'd1f79009-507e-48a9-be58-30468c67b33c',
    formaticKey: 'pk_test_48E59AF566747C40',
    network: 'kovan',
    chainId: 42,
    etherscanLink: 'https://kovan.etherscan.io/'
    },
    eos: {
      blockchain: 'eos',
      chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
      host: 'ptoken-eos.provable.xyz',
      port: 443,
      protocol: 'https',
      explorer: 'https://jungle.bloks.io/',
      provableEndpoint: 'https://ptoken-eos.provable.xyz:443',
      token: {
        'symbol': 'SYS',
        'contract': 'eosio.token',
        'decimals': 4
      }
    }
  },
  pbtc: {
    eth: {
      wsInfuraEndpoint: 'wss://ropsten.infura.io/ws/v3',
      httpsInfuraEndpoint: 'https://ropsten.infura.io/v3/',
      infuraProjectId: '4762c881ac0c4938be76386339358ed6',
      portisDappId: 'd1f79009-507e-48a9-be58-30468c67b33c',
      formaticKey: 'pk_test_48E59AF566747C40',
      network: 'ropsten',
      chainId: 3,
      etherscanLink: 'https://ropsten.etherscan.io/'
    },
    btc: {
      explorer: 'https://blockstream.info/testnet/'
    }
  }
}

export default settings