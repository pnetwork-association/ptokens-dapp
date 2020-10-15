import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PLTC_ON_ETH_TESTNET
} from '../constants'

const settings = {
  dappName: 'pTokens',
  telegram: 'https://t.me/ptokens',
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
      provableEndpoint:
        'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
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
      provableEndpoint:
        'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
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
      provableEndpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
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
      chainId:
        '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
      host: '23.97.190.44',
      port: 8888,
      protocol: 'http',
      explorer: 'https://local.bloks.io/?nodeUrl=jungle3.cryptolions.io&systemDomain=eosio&hyperionUrl=https%3A%2F%2Fjungle3history.cryptolions.io/',
      provableEndpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://pbtc-on-eos-jungle-3.ptokens.io'
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
      network: 'mainnet'
    },
    {
      id: PBTC_ON_EOS_MAINNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'mainnet'
    },
    {
      id: PLTC_ON_ETH_MAINNET,
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      network: 'mainnet'
    },
    {
      id: PLTC_ON_EOS_MAINNET,
      name: 'pLTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'LTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'mainnet'
    },
    {
      id: PETH_ON_EOS_MAINNET,
      name: 'pETH',
      tokenType: 'EOSIO Token',
      issueFrom: 'ETH',
      redeemFrom: 'EOS',
      realDecimals: 18,
      contractDecimals: 1,
      network: 'mainnet',
      tokenAddress: '0x0000000000000000000000000000000000000000'
    },
    {
      id: PBTC_ON_ETH_TESTNET,
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'ETH',
      realDecimals: 8,
      contractDecimals: 18,
      network: 'testnet'
    },
    {
      id: PBTC_ON_EOS_TESTNET,
      name: 'pBTC',
      tokenType: 'EOSIO Token',
      issueFrom: 'BTC',
      redeemFrom: 'EOS',
      realDecimals: 8,
      contractDecimals: 8,
      network: 'testnet'
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
    }
  ]
}

export default settings
