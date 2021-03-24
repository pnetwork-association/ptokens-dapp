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
  PBTC_ON_XDAI_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET
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
  infuraProjectId: 'c2efa32f17a349c9b44d0e5c358cef3c',
  portisDappId: '522ff2fb-0934-4252-912b-a549a388a574',
  fortmaticKey: 'pk_live_D0A703008A4B17B7',
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
        wsEndpoint: 'wss://mainnet.infura.io/ws/v3/',
        endpoint: 'https://mainnet.infura.io/v3s/ '
      },
      eos: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://eos.greymass.com'
      },
      telos: {
        endpoint: 'https://corsproxy.ptokens.io/v1/?apiurl=https://telos.greymass.com'
      },
      bsc: {
        endpoint: 'https://bsc-dataseed.binance.org/'
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
      bsc: 'https://bsc-dataseed.binance.org/',
      xdai: 'https://blockscout.com/poa/xdai/',
      polygon: 'https://explorer-mainnet.maticvigil.com/'
    }
  },
  pTokensAvailable: [
    {
      id: PBTC_ON_ETH_MAINNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: PBTC_ON_EOS_MAINNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg'
    },
    {
      id: PBTC_ON_TELOS_MAINNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'TELOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg'
    },
    {
      id: PLTC_ON_ETH_MAINNET,
      name: 'pLTC',
      workingName: 'pltc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC',
      nativeBlockchain: 'LTC',
      image: 'pLTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: PLTC_ON_EOS_MAINNET,
      name: 'pLTC',
      workingName: 'pltc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC',
      nativeBlockchain: 'LTC',
      image: 'pLTC.svg'
    },
    {
      id: PETH_ON_EOS_MAINNET,
      name: 'pETH',
      workingName: 'peth',
      nativeDecimals: 18,
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
      nativeSymbol: 'ETH',
      nativeBlockchain: 'ETH',
      image: 'pETH.svg'
    },
    {
      id: PNT_ON_EOS_MAINNET,
      name: 'PNT',
      workingName: 'pnt',
      nativeDecimals: 18,
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
      nativeSymbol: 'PNT',
      nativeBlockchain: 'ETH',
      image: 'PNT.svg'
    },
    {
      id: PMKR_ON_EOS_MAINNET,
      name: 'pMKR',
      workingName: 'pmkr',
      nativeDecimals: 18,
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
      nativeSymbol: 'MKR',
      nativeBlockchain: 'ETH',
      image: 'pMKR.svg'
    },
    {
      id: PLINK_ON_EOS_MAINNET,
      name: 'pLINK',
      workingName: 'plink',
      nativeDecimals: 18,
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
      nativeSymbol: 'LINK',
      nativeBlockchain: 'ETH',
      image: 'pLINK.svg'
    },
    {
      id: PYFI_ON_EOS_MAINNET,
      name: 'pYFI',
      workingName: 'pyfi',
      nativeDecimals: 18,
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
      nativeSymbol: 'YFI',
      nativeBlockchain: 'ETH',
      image: 'pYFI.svg'
    },
    {
      id: PBTC_ON_ETH_TESTNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      blockchain: 'EOS',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'ETH',
      image: 'pBTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: PBTC_ON_EOS_TESTNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'testnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      blockchain: 'EOS',
      decimals: 0,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg'
    },
    {
      id: PLTC_ON_ETH_TESTNET,
      name: 'pLTC',
      workingName: 'pltc',
      nativeDecimals: 8,
      network: 'testnet',
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PLTC',
      isPtoken: true,
      nativeSymbol: 'LTC',
      nativeBlockchain: 'LTC',
      image: 'pLTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: PTERIA_ON_EOS_MAINNET,
      name: 'PTERIA',
      workingName: 'pteria',
      nativeDecimals: 18,
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
      nativeSymbol: 'PTERIA',
      nativeBlockchain: 'ETH',
      image: 'PTERIA.svg'
    },
    {
      id: PUNI_ON_EOS_MAINNET,
      name: 'pUNI',
      workingName: 'puni',
      nativeDecimals: 18,
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
      nativeSymbol: 'UNI',
      nativeBlockchain: 'ETH',
      image: 'pUNI.svg'
    },
    {
      id: PBAL_ON_EOS_MAINNET,
      name: 'pBAL',
      workingName: 'pbal',
      nativeDecimals: 18,
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
      nativeSymbol: 'BAL',
      nativeBlockchain: 'ETH',
      image: 'pBAL.svg'
    },
    {
      id: PBAND_ON_EOS_MAINNET,
      name: 'pBAND',
      workingName: 'pband',
      nativeDecimals: 18,
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
      nativeSymbol: 'BAND',
      nativeBlockchain: 'ETH',
      image: 'pBAND.svg'
    },
    {
      id: PCOMP_ON_EOS_MAINNET,
      name: 'pCOMP',
      workingName: 'pcomp',
      nativeDecimals: 18,
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
      nativeSymbol: 'COMP',
      nativeBlockchain: 'ETH',
      image: 'pCOMP.svg'
    },
    {
      id: PSNX_ON_EOS_MAINNET,
      name: 'pSNX',
      workingName: 'psnx',
      nativeDecimals: 18,
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
      nativeSymbol: 'SNX',
      nativeBlockchain: 'ETH',
      image: 'pSNX.svg'
    },
    {
      id: POMG_ON_EOS_MAINNET,
      name: 'pOMG',
      workingName: 'pomg',
      nativeDecimals: 18,
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
      nativeSymbol: 'OMG',
      nativeBlockchain: 'ETH',
      image: 'pOMG.svg'
    },
    {
      id: PANT_ON_EOS_MAINNET,
      name: 'pANT',
      workingName: 'pant',
      nativeDecimals: 18,
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
      nativeSymbol: 'ANT',
      nativeBlockchain: 'ETH',
      image: 'pANT.svg'
    },
    {
      id: PDAI_ON_EOS_MAINNET,
      name: 'pDAI',
      workingName: 'pdai',
      nativeDecimals: 18,
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
      nativeSymbol: 'DAI',
      nativeBlockchain: 'ETH',
      image: 'pDAI.svg'
    },
    {
      id: PLRC_ON_EOS_MAINNET,
      name: 'pLRC',
      workingName: 'plrc',
      nativeDecimals: 18,
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
      nativeSymbol: 'LRC',
      nativeBlockchain: 'ETH',
      image: 'pLRC.svg'
    },
    {
      id: PUOS_ON_EOS_MAINNET,
      name: 'pUOS',
      workingName: 'puos',
      nativeDecimals: 4,
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
      nativeSymbol: 'UOS',
      nativeBlockchain: 'ETH',
      image: 'pUOS.svg'
    },
    {
      id: PBAT_ON_EOS_MAINNET,
      name: 'pBAT',
      workingName: 'pbat',
      nativeDecimals: 18,
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
      nativeSymbol: 'BAT',
      nativeBlockchain: 'ETH',
      image: 'pBAT.svg'
    },
    {
      id: PREP_ON_EOS_MAINNET,
      name: 'pREP',
      workingName: 'prep',
      nativeDecimals: 18,
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
      nativeSymbol: 'REP',
      nativeBlockchain: 'ETH',
      image: 'pREP.svg'
    },
    {
      id: PZRX_ON_EOS_MAINNET,
      name: 'pZRX',
      workingName: 'pzrx',
      nativeDecimals: 18,
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
      nativeSymbol: 'ZRX',
      nativeBlockchain: 'ETH',
      image: 'pZRX.svg'
    },
    {
      id: PPNK_ON_EOS_MAINNET,
      name: 'pPNK',
      workingName: 'ppnk',
      nativeDecimals: 18,
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
      nativeSymbol: 'PNK',
      nativeBlockchain: 'ETH',
      image: 'pPNK.svg'
    },
    {
      id: PDOGE_ON_ETH_MAINNET,
      name: 'pDOGE',
      workingName: 'pdoge',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.0000546',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PDOGE',
      isPtoken: true,
      nativeSymbol: 'DOGE',
      nativeBlockchain: 'DOGE',
      image: 'pDOGE.svg',
      withAmountConversionPegout: true
    },
    {
      id: PEOS_ON_ETH_MAINNET,
      name: 'pEOS',
      workingName: 'peos',
      nativeDecimals: 0,
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
      nativeSymbol: 'EOS',
      nativeBlockchain: 'EOS',
      image: 'pEOS.svg'
    },
    {
      id: PBTC_ON_BSC_MAINNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: PEOS_ON_POLYGON_MAINNET,
      name: 'pEOS',
      workingName: 'peos',
      nativeDecimals: 0,
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
      nativeSymbol: 'EOS',
      nativeBlockchain: 'EOS',
      image: 'pEOS.svg',
      withAmountConversionPegout: true
    },
    {
      id: PBTC_ON_XDAI_MAINNET,
      name: 'pBTC',
      workingName: 'pbtc',
      nativeDecimals: 8,
      network: 'mainnet',
      minimumIssuable: '0',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'XDAI',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBTC',
      isPtoken: true,
      nativeSymbol: 'BTC',
      nativeBlockchain: 'BTC',
      image: 'pBTC.svg',
      withAmountConversionPegout: true
    },
    {
      id: IQ_ON_ETH_MAINNET,
      name: 'IQ',
      workingName: 'iq',
      nativeDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.001',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'IQ',
      isPtoken: true,
      nativeSymbol: 'IQ',
      nativeBlockchain: 'EOS',
      image: 'pIQ.svg'
    },
    {
      id: TLOS_ON_ETH_MAINNET,
      name: 'TLOS',
      workingName: 'tlos',
      nativeDecimals: 0,
      network: 'mainnet',
      minimumIssuable: '0.001',
      minimumRedeamable: '0.00005',
      isHidden: false,
      blockchain: 'ETH',
      decimals: 18,
      withMiniImage: true,
      symbol: 'TLOS',
      isPtoken: true,
      nativeSymbol: 'TLOS',
      nativeBlockchain: 'TLOS',
      image: 'pTLOS.svg'
    },
    {
      id: PNT_ON_BSC_MAINNET,
      name: 'PNT',
      workingName: 'pnt',
      nativeDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PNT',
      isPtoken: true,
      nativeSymbol: 'PNT',
      nativeBlockchain: 'ETH',
      image: 'PNT.svg'
    },
    {
      id: PTERIA_ON_BSC_MAINNET,
      name: 'PTERIA',
      workingName: 'pteria',
      nativeDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PTERIA',
      isPtoken: true,
      nativeSymbol: 'PTERIA',
      nativeBlockchain: 'ETH',
      image: 'PTERIA.svg'
    },
    {
      id: POPIUM_ON_BSC_MAINNET,
      name: 'pOPIUM',
      workingName: 'popium',
      nativeDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'POPIUM',
      isPtoken: true,
      nativeSymbol: 'OPIUM',
      nativeBlockchain: 'ETH',
      image: 'pOPIUM.svg'
    },
    {
      id: PDEFIPLUSPLUS_ON_BSC_MAINNET,
      name: 'pDEFI++',
      workingName: 'pdefiplusplus',
      nativeDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PDEFI++',
      isPtoken: true,
      nativeSymbol: 'DEFI++',
      nativeBlockchain: 'ETH',
      image: 'pDEFI++.svg'
    },
    {
      id: PBCP_ON_BSC_MAINNET,
      name: 'pBCP',
      workingName: 'pbcp',
      nativeDecimals: 18,
      network: 'mainnet',
      minimumIssuable: '0.000000001',
      minimumRedeamable: '0.000000001',
      isHidden: false,
      blockchain: 'BSC',
      decimals: 18,
      withMiniImage: true,
      symbol: 'PBCP',
      isPtoken: true,
      nativeSymbol: 'BCP',
      nativeBlockchain: 'ETH',
      image: 'pBCP.svg'
    }
  ]
}

export default settings
