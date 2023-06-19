import { Blockchain, Network, PTokenId } from '../constants'

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
      name: 'Binance Smart Chain',
      symbol: 'BSC',
    },
    {
      name: Blockchain.EOS,
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
    [Network.Mainnet]: {
      [Blockchain.Ethereum]: {
        endpoint: 'https://cloudflare-eth.com/',
      },
      [Blockchain.EOS]: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'https://eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com',
      },
      [Blockchain.Telos]: {
        chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        host: 'telos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com',
      },
      [Blockchain.Libre]: {
        chainId: '38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465',
        host: 'libre-node-2.ptokens.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://libre-node-2.ptokens.io:8889',
      },
      [Blockchain.BSC]: {
        endpoint: 'https://bsc-dataseed1.binance.org/',
      },
      [Blockchain.XDAI]: {
        endpoint: 'https://rpc.xdaichain.com/',
      },
      [Blockchain.Polygon]: {
        endpoint: 'https://polygon-rpc.com/',
      },
      [Blockchain.Ultra]: {
        chainId: 'a9c481dfbc7d9506dc7e87e9a137c931b0a9303f64fd7a1d08b8230133920097',
        host: 'https://corsproxy.ptokens.io/v1/?apiurl=http://ultra-mainnet-1.ptokens.io:8888',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=http://ultra-mainnet-1.ptokens.io:8888',
      },
      [Blockchain.Arbitrum]: {
        endpoint: 'https://arb1.arbitrum.io/rpc',
      },
      [Blockchain.Luxochain]: {
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://lugano.nodes.luxochain.io',
      },
      [Blockchain.Algorand]: {
        token: '4950dcab89ddc2e7f4dd8e51deb2f0c44aa37aab18cbfd8242ac5fb697222342',
        port: 443,
        endpoint: 'https://algorand-node-1.ptokens.io',
      },
      [Blockchain.Fantom]: {
        endpoint: 'https://rpc.ftm.tools/',
      },
      [Blockchain.Ore]: {
        chainId: '7900eaca71d5b213d3e1e15d54d98ad235a7a5b8166361be78e672edeeb2b47a',
        host: 'https://ore-node-1.ptokens.io',
        port: 443,
        protocol: 'https',
        endpoint: 'https://ore-node-1.ptokens.io',
      },
      [Blockchain.Bitcoin]: {
        endpoint: 'https://blockstream.info/api/',
      },
    },
  },
  explorers: {
    [Network.Mainnet]: {
      [Blockchain.Ethereum]: 'https://etherscan.io/',
      [Blockchain.Bitcoin]: 'https://blockstream.info/',
      [Blockchain.EOS]: 'https://bloks.io/',
      [Blockchain.Telos]: 'https://explorer.telos.net/',
      [Blockchain.Libre]: 'https://lb.libre.org/v2/explore/',
      [Blockchain.Litecoin]: 'https://live.blockcypher.com/ltc/',
      [Blockchain.BSC]: 'https://bscscan.com/',
      [Blockchain.XDAI]: 'https://blockscout.com/poa/xdai/',
      [Blockchain.Polygon]: 'https://polygonscan.com/',
      [Blockchain.Dogecoin]: 'https://dogechain.info/',
      [Blockchain.Ultra]: 'https://explorer.mainnet.ultra.io/',
      [Blockchain.Arbitrum]: 'https://arbiscan.io/',
      [Blockchain.Luxochain]: 'https://explorer.luxochain.io/',
      [Blockchain.Algorand]: 'https://algoexplorer.io/',
      [Blockchain.Fantom]: 'https://ftmscan.com/',
      [Blockchain.Ore]: 'https://explorer.ore.network/',
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
      id: PTokenId.PNT_ON_BSC_MAINNET_OLD,
      name: 'PNT',
      workingName: 'pnt',
      nativeDecimals: 18,
      blockchain: Blockchain.BSC,
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
