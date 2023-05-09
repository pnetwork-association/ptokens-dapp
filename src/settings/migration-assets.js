import { ChainId } from 'ptokens-constants'

const migrationAssets = [
  {
    address: '0x5228a22e72ccc52d415ecfd199f99d0665e7733b',
    id: 'PBTC_ON_ETH_MAINNET_V1_MIGRATION',
    name: 'pNetwork BTC',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isBase: true,
    image: 'pBTC_gray.svg',
    version: 1,
    titleLabel: 'pBTC v1',
    formattedName: 'pBTC v1',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0xd7d147c6Bb90A718c3De8C0568F9B560C79fa416',
    id: 'PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION',
    name: 'pBTC-v1/sbtcCRV Gauge Deposit',
    workingName: 'pbtc',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'pBTC/sbtcCRV-gauge',
    isBase: true,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'Curve.fi pBTC-v1/sbtcCRV Gauge Deposit',
    formattedName: 'Curve.fi pBTC-v1/sbtcCRV Gauge Deposit',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0x62199B909FB8B8cf870f97BEf2cE6783493c4908', // TODO: change
    id: 'PBTC_ON_ETH_MAINNET_V2_MIGRATION',
    name: 'pNetwork BTC',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isBase: false,
    image: 'pBTC.svg',
    version: 2,
    titleLabel: 'pBTC v2',
    formattedName: 'pBTC v2',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0xB5efA93d5D23642f970aF41a1ea9A26f19CbD2Eb',
    id: 'PBTC_SBTC_CURVE_ON_ETH_MAINNET_V2_MIGRATION',
    name: 'Curve.fi pbtc-v2/sbtcCRV-f Gauge Deposit',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'pbtc/sbtcCRV-f-gauge',
    isBase: false,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'Curve.fi pbtc-v2/sbtcCRV-f Gauge Deposit',
    formattedName: 'Curve.fi pbtc-v2/sbtcCRV-f Gauge Deposit',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0x4657B96D587c4d46666C244B40216BEeEA437D0d',
    id: 'IDLE_CDO_AA_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION',
    name: 'IdleCDO AA Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'AA_idleCvxpbtc/sbtcCRV-f',
    isBase: false,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'IdleCDO AA Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    formattedName: 'IdleCDO AA Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0x3872418402d1e967889aC609731fc9E11f438De5',
    id: 'IDLE_CDO_BB_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION',
    name: 'IdleCDO BB Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'BB_idleCvxpbtc/sbtcCRV-f',
    isBase: false,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'IdleCDO BB Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    formattedName: 'IdleCDO BB Tranche - idleCvxpbtc-v2/sbtcCRV-f',
    withBalanceDecimalsConversion: true,
  },
  {
    address: '0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed',
    id: 'PNT_ON_ETH_MAINNET',
    symbol: 'PNT',
    name: 'pNetwork',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    nativeDecimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    titleLabel: 'PNT',
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xf4eA6B892853413bD9d9f1a5D3a620A0ba39c5b2',
    id: 'ETHPNT_ON_ETH_MAINNET',
    symbol: 'ethPNT',
    name: 'pNetwork',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    nativeDecimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'ethPNT',
    nativeBlockchain: 'ETH',
    image: 'PNT_gray.svg',
    withBalanceDecimalsConversion: true,
    titleLabel: 'ethPNT',
    chainId: ChainId.EthereumMainnet,
  },
]

export default migrationAssets
