import { getWeb3Settings } from 'react-web3-settings'

const settings = {
  dappName: 'pTokens Dapp',
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
    bpm: 'https://pnetwork.watch:8082/sync-status?apikey=a1d87144c4d60917b880d9fed94d480829d0893a',
  },
  supportedBlockchains: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
    },
    {
      name: 'Sepolia',
      symbol: 'SEPOLIA',
    },
    {
      name: 'Goerli',
      symbol: 'GOERLI',
    },
    {
      name: 'Binance Smart Chain',
      symbol: 'BSC',
    },
    {
      name: 'EOS',
      symbol: 'EOS',
    },
    {
      name: 'Polygon',
      symbol: 'POLYGON',
    },
    {
      name: 'Telos',
      symbol: 'TELOS',
    },
    {
      name: 'Libre',
      symbol: 'LIBRE',
    },
    {
      name: 'xDai',
      symbol: 'XDAI',
    },
    {
      name: 'Ultra',
      symbol: 'ULTRA',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARBITRUM',
    },
    {
      name: 'Luxochain',
      symbol: 'LUXOCHAIN',
    },
    {
      name: 'Algorand',
      symbol: 'ALGORAND',
    },
    {
      name: 'Fantom',
      symbol: 'FTM',
    },
    {
      name: 'Ore',
      symbol: 'ORE',
    },
  ],
  rpc: {
    testnet: {
      sepolia: {
        endpoint: 'https://eth-sepolia.g.alchemy.com/v2/87AIPRGpZDJxfKM0dlZwZHcgWq9M6InD',
      },
      goerli: {
        endpoint: 'https://eth-goerli.g.alchemy.com/v2/e7XRoZjRoFecrVT06tHwApWd-CoBb6DD',
      },
    },
    mainnet: {
      eth: {
        endpoint: 'https://cloudflare-eth.com/',
        chainId: 1,
      },
      eos: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'https://eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com',
      },
      telos: {
        chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        host: 'telos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com',
      },
      libre: {
        chainId: '38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465',
        host: 'libre-node-2.ptokens.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://libre-node-2.ptokens.io:8889',
      },
      bsc: {
        endpoint: 'https://bsc-dataseed1.binance.org/',
        chainId: 56,
      },
      xdai: {
        endpoint: 'https://rpc.xdaichain.com/',
        chainId: 100,
      },
      polygon: {
        endpoint: 'https://polygon-rpc.com/',
        chainId: 137,
      },
      ultra: {
        chainId: 'a9c481dfbc7d9506dc7e87e9a137c931b0a9303f64fd7a1d08b8230133920097',
        host: 'https://corsproxy.ptokens.io/v1/?apiurl=http://ultra-mainnet-1.ptokens.io:8888',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=http://ultra-mainnet-1.ptokens.io:8888',
      },
      arbitrum: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
        chainId: 42161,
      },
      luxochain: {
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://lugano.nodes.luxochain.io',
        chainId: 110,
      },
      algorand: {
        token: '4950dcab89ddc2e7f4dd8e51deb2f0c44aa37aab18cbfd8242ac5fb697222342',
        port: 443,
        endpoint: 'https://algorand-node-1.ptokens.io',
      },
      ftm: {
        endpoint: 'https://rpc.ftm.tools/',
        chainId: 250,
      },
      ore: {
        chainId: '7900eaca71d5b213d3e1e15d54d98ad235a7a5b8166361be78e672edeeb2b47a',
        host: 'https://ore-node-1.ptokens.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://ore-node-1.ptokens.io',
      },
      btc: {
        endpoint: 'https://blockstream.info/api/',
      },
    },
  },
  explorers: {
    mainnet: {
      eth: 'https://etherscan.io/',
      sepolia: 'https://sepolia.etherscan.io/',
      goerli: 'https://goerli.etherscan.io/',
      btc: 'https://blockstream.info/',
      eos: 'https://bloks.io/',
      telos: 'https://explorer.telos.net/',
      libre: 'https://lb.libre.org/v2/explore/',
      ltc: 'https://live.blockcypher.com/ltc/',
      bsc: 'https://bscscan.com/',
      xdai: 'https://blockscout.com/poa/xdai/',
      polygon: 'https://polygonscan.com/',
      doge: 'https://dogechain.info/',
      rvn: 'https://ravencoin.network/',
      lbc: 'https://explorer.lbry.com/',
      ultra: 'https://explorer.mainnet.ultra.io/',
      arbitrum: 'https://arbiscan.io/',
      luxochain: 'https://explorer.luxochain.io/',
      algorand: 'https://algoexplorer.io/',
      ftm: 'https://ftmscan.com/',
      ore: 'https://explorer.ore.network/',
    },
  },
  supportedNfts: [
    {
      symbol: 'RAREBIT',
      name: 'Rarebit Bunnies',
    },
    {
      symbol: 'CGT',
      name: 'ChainGuardians',
    },
  ],
  swapOldPntOnBsc: {
    swapContractAddress: '0x66e75D37a6fa02Fd385f94476901f95c205EfC61',
    asset: {
      address: '0x7a1da9f49224ef98389b071b8a3294d1cc5e3e6a',
      id: 'PNT_ON_BSC_MAINNET_OLD',
      name: 'PNT',
      workingName: 'pnt',
      nativeDecimals: 18,
      blockchain: 'BSC',
      decimals: 18,
      symbol: 'PNT',
      nativeSymbol: 'PNT',
      image: 'PNT_gray.svg',
      withBalanceDecimalsConversion: true,
    },
  },
  migration: {
    contractAddresses: {
      pbtcV1Migrator: '0xc612b19fD761e5Ff780b3C38996ff816AFa26aae',
      pbtcV1StrategiesMigrator: '0xc25b475fCf0E970ECacD057D41787E0704ddc763',
    },
  },
  routerAddress: {
    mainnet: {
      arbitrum: '0x2097d168d852DAF856A9Bc0Eb8E8EF16328d7d85',
      xdai: '0x40088126dDBFd5508cdb33285451161aCbdA6C56',
    },
  },
  stateManagerAddress: {
    mainnet: {
      arbitrum: '0x2Cd64a7dD0bd467fc1953521df2C440e4b493541',
      xdai: '0xa3C4398244591841bCe776EC7F8D9E7741B9F934',
    },
  },
}

export const getStateManagerAddressByBlockchain = (_blockchain, _network = 'mainnet') => {
  const web3Settings = getWeb3Settings()
  switch (_blockchain) {
    case 'ARBITRUM':
      return web3Settings.arbitrumStateManager.value
    case 'XDAI':
      return web3Settings.gnosisStateManager.value
    default:
      return ''
  }
}

export const getRouterAddressByBlockchain = (_blockchain, _network = 'mainnet') => {
  const web3Settings = getWeb3Settings()
  switch (_blockchain) {
    case 'ARBITRUM':
      return web3Settings.arbitrumRouter.value
    case 'XDAI':
      return web3Settings.gnosisRouter.value
    default:
      return ''
  }
}

export default settings
