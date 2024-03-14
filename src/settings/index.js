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
    bpm: 'https://internal.pnetwork.watch:8082/sync-status',
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
      name: 'Gnosis Chain',
      symbol: 'GNOSIS',
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
  ],
  rpc: {
    mainnet: {
      eth: {
        endpoint: 'https://ethereum.publicnode.com',
        chainId: 1,
        label: 'Ethereum',
      },
      eos: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'https://eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com',
        label: 'EOS',
      },
      telos: {
        chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        host: 'telos.eosphere.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://telos.eosphere.io',
        label: 'Telos',
      },
      libre: {
        chainId: '38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465',
        host: 'libre-node-2.ptokens.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://libre-node-2.ptokens.io:8889',
        label: 'Libre',
      },
      bsc: {
        endpoint: 'https://bsc-dataseed1.binance.org/',
        chainId: 56,
        label: 'BSC',
      },
      gnosis: {
        endpoint: 'https://rpc.gnosischain.com',
        chainId: 100,
        label: 'Gnosis',
      },
      polygon: {
        endpoint: 'https://polygon-rpc.com/',
        chainId: 137,
        label: 'Polygon',
      },
      ultra: {
        chainId: 'a9c481dfbc7d9506dc7e87e9a137c931b0a9303f64fd7a1d08b8230133920097',
        host: 'https://corsproxy.ptokens.io/v1/?apiurl=https://api.ultra.eossweden.org',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://api.ultra.eossweden.org',
        label: 'Ultra',
      },
      arbitrum: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
        chainId: 42161,
        label: 'Arbitrum',
      },
      luxochain: {
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://lugano.nodes.luxochain.io',
        chainId: 110,
        label: 'Luxochain',
      },
      algorand: {
        token: '4950dcab89ddc2e7f4dd8e51deb2f0c44aa37aab18cbfd8242ac5fb697222342',
        port: 443,
        endpoint: 'https://mainnet-api.algonode.cloud',
        label: 'Algorand',
      },
      ftm: {
        endpoint: 'https://rpc.ftm.tools/',
        chainId: 250,
        label: 'Fantom',
      },
      btc: {
        endpoint: 'https://blockstream.info/api/',
        label: 'Bitcoin',
      },
    },
  },
  explorers: {
    mainnet: {
      eth: 'https://etherscan.io/',
      btc: 'https://blockstream.info/',
      eos: 'https://bloks.io/',
      telos: 'https://explorer.telos.net/',
      libre: 'https://lb.libre.org/v2/explore/',
      ltc: 'https://live.blockcypher.com/ltc/',
      bsc: 'https://bscscan.com/',
      gnosis: 'https://gnosisscan.io/',
      polygon: 'https://polygonscan.com/',
      doge: 'https://dogechain.info/',
      rvn: 'https://ravencoin.network/',
      lbc: 'https://explorer.lbry.com/',
      ultra: 'https://explorer.mainnet.ultra.io/',
      arbitrum: 'https://arbiscan.io/',
      luxochain: 'https://explorer.luxochain.io/',
      algorand: 'https://allo.info/',
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
      withMiniImage: true,
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
}

export default settings
