const settings = {
  dappName: 'pTokens Dapp',
  telegram: 'https://t.me/pNetworkDefi',
  googleAnalyticsTrackId: 'UA-157173999-1',
  infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
  portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
  fortmaticKey: 'pk_live_D0A703008A4B17B7',
  auditLinks: 'https://github.com/cryptonicsconsulting/audits/tree/master/pToken',
  ptokensWebsite: 'https://ptokens.io',
  api: {
    bpm: 'https://chart.ptokens.io/index.php?a=bpm'
  },
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
    mainnet: {
      eth: {
        wsEndpoint: 'wss://dapp-eth-node-1.ptokens.io/a9c866c62d28d63303de21fd44e95f747f725857/',
        endpoint: 'https://dapp-eth-node-1.ptokens.io/a9c866c62d28d63303de21fd44e95f747f725857/'
      },
      eos: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
      },
      telos: {
        chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        host: 'telos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com'
      },
      bsc: {
        endpoint: 'https://broken-falling-sun.bsc.quiknode.pro/cdba42b4cfeb02e1048100066283fbf3806c486a/'
      },
      xdai: {
        endpoint: 'https://rpc.xdaichain.com/'
      },
      polygon: {
        endpoint: 'https://rpc-mainnet.matic.network'
      }
    }
  },
  explorers: {
    mainnet: {
      eth: 'https://etherscan.io/',
      btc: 'https://blockstream.info/',
      eos: 'https://bloks.io/',
      telos: 'https://telos.bloks.io/',
      ltc: 'https://live.blockcypher.com/ltc/',
      bsc: 'https://bscscan.com/',
      xdai: 'https://blockscout.com/poa/xdai/',
      polygon: 'https://polygonscan.com/',
      doge: 'https://dogechain.info/',
      rvn: 'https://ravencoin.network/',
      lbc: 'https://explorer.lbry.com/'
    }
  },
  supportedNfts: [
    {
      symbol: 'RAREBIT',
      name: 'Rarebit Bunnies'
    },
    {
      symbol: 'CGT',
      name: 'ChainGuardians'
    }
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
      withBalanceDecimalsConversion: true
    }
  }
}

export default settings
