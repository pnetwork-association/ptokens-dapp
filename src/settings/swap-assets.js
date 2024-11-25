import { ChainId } from '@p.network/ptokens-constants'

export const dismissedAssets = ['USDC_ON_ALGORAND_MAINNET', 'USDT_ON_ALGORAND_MAINNET']

const swapAssets = [
  /* #################   pTokens   #################*/
  {
    address: '0x62199B909FB8B8cf870f97BEf2cE6783493c4908',
    id: 'PBTC_ON_ETH_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    onPnetworkV2: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    id: 'WBTC_ON_ETH_MAINNET',
    name: 'WBTC',
    workingName: 'wbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 8,
    withMiniImage: true,
    symbol: 'WBTC',
    isPtoken: false,
    requiresCurve: true,
    curveChainId: 1,
    pTokenId: 'PBTC_ON_ETH_MAINNET',
    swapToAddress: '0x62199B909FB8B8cf870f97BEf2cE6783493c4908',
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'wBTC.svg',
    withBalanceDecimalsConversion: true,
    onPnetworkV2: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: 'btc.ptokens',
    id: 'PBTC_ON_EOS_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'EOS',
    decimals: 8,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.EosMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
  },
  {
    address: 'btc.ptokens',
    id: 'PBTC_ON_TELOS_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 8,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.TelosMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
  },
  {
    address: 'btc.ptokens',
    id: 'PBTC_ON_LIBRE_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'LIBRE',
    decimals: 9,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.LibreMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x115d8bf0a53e751f8a472f88d587944ec1c8ca6d',
    id: 'PBTC_ON_ARBITRUM_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ARBITRUM',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    gasLimitPegout: 80000 * 10,
    chainId: ChainId.ArbitrumMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
  },
  {
    address: '0x5979f50f1d4c08f9a53863c2f39a7b0492c38d0f',
    id: 'PLTC_ON_ETH_MAINNET',
    name: 'pLTC',
    workingName: 'pltc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PLTC',
    isPtoken: true,
    nativeSymbol: 'LTC',
    nativeBlockchain: 'LTC',
    image: 'pLTC.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
    onlyLegacyRedeem: true,
  },
  {
    address: 'ltc.ptokens',
    id: 'PLTC_ON_EOS_MAINNET',
    name: 'pLTC',
    workingName: 'pltc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'EOS',
    decimals: 8,
    withMiniImage: true,
    symbol: 'PLTC',
    isPtoken: true,
    nativeSymbol: 'LTC',
    nativeBlockchain: 'LTC',
    image: 'pLTC.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.EosMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
  },
  {
    address: 'eth.ptokens',
    id: 'PETH_ON_EOS_MAINNET',
    name: 'pETH',
    workingName: 'peth',
    nativeDecimals: 18,
    network: 'mainnet',
    isPerc20: true,
    isHidden: false,
    blockchain: 'EOS',
    decimals: 9,
    withMiniImage: true,
    symbol: 'PETH',
    isPtoken: true,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'pETH.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.EosMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x1003d3574ac79303a5fa0951ecb04cc7acba9747',
    id: 'PBTC_ON_BSC_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xa23d33d5e0a61ba81919bfd727c671bb03ab0fea',
    id: 'IQ_ON_ETH_MAINNET',
    name: 'IQ',
    workingName: 'iq',
    nativeDecimals: 3,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'IQ',
    isPtoken: true,
    nativeSymbol: 'IQ',
    nativeBlockchain: 'EOS',
    image: 'pIQ.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    chainId: ChainId.EthereumMainnet,
    onlyLegacyRedeem: true,
    onPnetworkV2: true,
  },
  {
    address: '0x7825e833d495f3d1c28872415a4aee339d26ac88',
    id: 'TLOS_ON_ETH_MAINNET',
    name: 'TLOS',
    workingName: 'tlos',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'TLOS',
    isPtoken: true,
    isSpecial: true,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'pTLOS.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    onlyLegacyRedeem: true,
    onPnetworkV2: true,
  },
  {
    address: '0xdaacb0ab6fb34d24e8a67bfa14bf4d95d4c7af92',
    id: 'PNT_ON_BSC_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x9f5377fa03dcd4016a33669b385be4d0e02f27bc',
    id: 'PTERIA_ON_BSC_MAINNET',
    name: 'PTERIA',
    workingName: 'pteria',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PTERIA',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'PTERIA',
    nativeBlockchain: 'ETH',
    image: 'PTERIA.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x566cedd201f67e542a6851a2959c1a449a041945',
    id: 'POPIUM_ON_BSC_MAINNET',
    name: 'pOPIUM',
    workingName: 'popium',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'POPIUM',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'OPIUM',
    nativeBlockchain: 'ETH',
    image: 'pOPIUM.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x1613957159e9b0ac6c80e824f7eea748a32a0ae2',
    id: 'CGG_ON_BSC_MAINNET',
    name: 'CGG',
    workingName: 'cgg',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'CGG',
    isPtoken: true,
    isSpecial: true,
    isPerc20: true,
    nativeSymbol: 'CGG',
    nativeBlockchain: 'ETH',
    image: 'pCGG.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: 'eth.ptokens',
    id: 'PETH_ON_TELOS_MAINNET',
    name: 'pETH',
    workingName: 'peth',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 9,
    withMiniImage: true,
    symbol: 'PETH',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'pETH.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.TelosMainnet,
    onPnetworkV2: true,
  },
  {
    address: 'usdt.ptokens',
    id: 'PUSDT_ON_TELOS_MAINNET',
    name: 'pUSDT',
    workingName: 'pusdt',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 6,
    withMiniImage: true,
    symbol: 'PUSDT',
    isPtoken: true,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'pUSDT.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true,
    chainId: ChainId.TelosMainnet,
    onPnetworkV2: true,
  },
  {
    address: 'usdt.ptokens',
    id: 'PUSDT_ON_LIBRE_MAINNET',
    name: 'pUSDT',
    workingName: 'pusdt',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'LIBRE',
    decimals: 9,
    withMiniImage: true,
    symbol: 'PUSDT',
    isPtoken: true,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'pUSDT.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true,
    chainId: ChainId.LibreMainnet,
    onPnetworkV2: true,
  },
  {
    address: 'usdc.ptokens',
    id: 'PUSDC_ON_TELOS_MAINNET',
    name: 'pUSDC',
    workingName: 'pusdc',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 6,
    withMiniImage: true,
    symbol: 'PUSDC',
    isPtoken: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true,
    chainId: ChainId.TelosMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xbB43F6EAEE709f238fA7FECaF007123600b48Ee2',
    id: 'PNT_ON_GNOSIS_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'GNOSIS',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true,
    chainId: ChainId.XdaiMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xb6c53431608e626ac81a9776ac3e999c5556717c',
    id: 'TLOS_ON_BSC_MAINNET',
    name: 'TLOS',
    workingName: 'tlos',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'TLOS',
    isPtoken: true,
    isSpecial: true,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'pTLOS.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xabae871b7e3b67aeec6b46ae9fe1a91660aadac5',
    id: 'POPEN_ON_BSC_MAINNET',
    name: 'pOPEN',
    workingName: 'popen',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'POPEN',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'OPEN',
    nativeBlockchain: 'ETH',
    image: 'pOPEN.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xe2e7329499e8ddb1f2b04ee4b35a8d7f6881e4ea',
    id: '$ANRX_ON_BSC_MAINNET',
    name: '$ANRX',
    workingName: 'anrx',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: '$ANRX',
    isPtoken: true,
    isPerc20: true,
    isSpecial: true,
    nativeSymbol: '$ANRX',
    nativeBlockchain: 'ETH',
    image: 'p$ANRX.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xd7ecf95cf7ef5256990beaf4ac895cd9e64cb947',
    id: 'PBTC_ON_POLYGON_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'POLYGON',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.PolygonMainnet,
    onPnetworkV2: true,
    notifyDepositAddressWarning: true,
  },
  {
    address: '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
    id: 'EFX_ON_BSC_MAINNET',
    name: 'EFX',
    workingName: 'efx',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'EFX',
    isPtoken: true,
    isSpecial: true,
    nativeSymbol: 'EFX',
    nativeBlockchain: 'EOS',
    image: 'pEFX.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x6db338e6ED75F67Cd5A4eF8bDf59163b32d4bD46',
    id: 'PSEEDS_ON_ETH_MAINNET',
    name: 'pSEEDS',
    workingName: 'pseeds',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'SEEDS',
    isPtoken: true,
    isSpecial: true,
    nativeSymbol: 'SEEDS',
    nativeBlockchain: 'TELOS',
    image: 'pSEEDS.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x419c44c48cd346c0b0933ba243be02af46607c9b',
    id: 'GALA_ON_BSC_MAINNET',
    name: 'GALA',
    workingName: 'gala',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'GALA',
    isPtoken: true,
    isSpecial: true,
    isPerc20: true,
    nativeSymbol: 'GALA',
    nativeBlockchain: 'ETH',
    image: 'pGALA.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: 'eosio.token',
    id: 'PUOS_ON_ULTRA_MAINNET',
    name: 'pUOS',
    workingName: 'puos',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ULTRA',
    decimals: 8,
    withMiniImage: true,
    symbol: 'PUOS',
    symbolToDisplay: 'UOS',
    symbolBalance: 'UOS',
    isPtoken: true,
    nativeSymbol: 'UOS',
    nativeBlockchain: 'ETH',
    image: 'UOS.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true,
    chainId: ChainId.UltraMainnet,
    onPnetworkV2: true,
    formattedName: 'Native UOS',
  },
  {
    address: '0x9b917D94Fb0138eDF520332f3d45494f1a74Bec8',
    id: 'EFX_ON_ETH_MAINNET',
    name: 'EFX',
    workingName: 'efx',
    nativeDecimals: 4,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'EFX',
    isPtoken: true,
    isSpecial: true,
    nativeSymbol: 'EFX',
    nativeBlockchain: 'EOS',
    image: 'pEFX.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xde960267b9aabfb5404d9a566c1ed6db9db09522',
    id: 'ZMT_ON_BSC_MAINNET',
    name: 'ZMT',
    workingName: 'zmt',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'ZMT',
    isPtoken: true,
    isSpecial: true,
    isPerc20: true,
    nativeSymbol: 'ZMT',
    nativeBlockchain: 'ETH',
    image: 'pZMT.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xbd525e51384905c6c0936a431bc7efb6c4903ea0',
    id: 'BIST_ON_BSC_MAINNET',
    name: 'BIST',
    workingName: 'bist',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'BIST',
    isPtoken: true,
    isSpecial: true,
    isPerc20: true,
    nativeSymbol: 'BIST',
    nativeBlockchain: 'ETH',
    image: 'pBIST.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0xb6bcae6468760bc0cdfb9c8ef4ee75c9dd23e1ed',
    id: 'PNT_ON_POLYGON_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'POLYGON',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true,
    onPnetworkV2: true,
    chainId: ChainId.PolygonMainnet,
  },
  {
    address: '0xe1590a6fa0cff9c960181cb77d8a873601772f64',
    id: 'WSB_ON_ETH_MAINNET',
    name: 'WSB',
    workingName: 'wsb',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'WSB',
    isPtoken: true,
    isSpecial: true,
    isBep20: true,
    nativeSymbol: 'WSB',
    nativeBlockchain: 'BSC',
    image: 'pWSB.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    onPnetworkV2: true,
  },
  {
    address: '0x89Ed0738eC8BF59302dC34AdecE3508CF3B911E2',
    id: 'PNT_ON_ARBITRUM_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ARBITRUM',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true,
    onPnetworkV2: true,
    gasLimitPegout: 90000 * 10,
    chainId: ChainId.ArbitrumMainnet,
  },
  {
    address: '0x1949E136DdD99062E3865134BA96a98ad186B10F',
    id: 'LUXO_ON_LUXOCHAIN_MAINNET',
    name: 'LUXO',
    workingName: 'luxo',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'LUXOCHAIN',
    decimals: 18,
    withMiniImage: true,
    symbol: 'LUXO',
    isPtoken: true,
    nativeSymbol: 'LUXO',
    nativeBlockchain: 'ETH',
    image: 'pLUXO.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true,
    onPnetworkV2: true,
    gasPricePegout: 0,
    chainId: ChainId.LuxochainMainnet,
  },
  {
    address: '0xA26dE83Ea3A573B6bcafa489a364951C2A8D3A6E',
    id: 'LUXO_ON_BSC_MAINNET',
    name: 'LUXO',
    workingName: 'luxo',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'LUXO',
    isPtoken: true,
    nativeSymbol: 'LUXO',
    nativeBlockchain: 'ETH',
    image: 'pLUXO.svg',
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true,
    onPnetworkV2: true,
    chainId: ChainId.BscMainnet,
  },
  {
    address: '0x8783ed9b70d4c354c19dacd211f9d6258cc5ab89',
    id: 'PKEYS_ON_BSC_MAINNET',
    name: 'PKEYS',
    workingName: 'pkeys',
    nativeDecimals: 9,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PKEYS',
    isPtoken: true,
    nativeSymbol: 'KEYS',
    nativeBlockchain: 'ETH',
    image: 'pKEYS.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    onPnetworkV2: true,
    chainId: ChainId.BscMainnet,
  },
  {
    address: '744665252',
    id: 'PBTC_ON_ALGORAND_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ALGORAND',
    decimals: 8,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    isBep20: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    onPnetworkV2: true,
    chainId: ChainId.AlgorandMainnet,
  },
  {
    address: '0x7c16f14afe5852cfbd66364982f27e103dec2795',
    id: 'OATH_ON_ETH_MAINNET',
    name: 'OATH',
    workingName: 'oath',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'OATH',
    isPtoken: true,
    nativeSymbol: 'OATH',
    nativeBlockchain: 'FTM',
    image: 'pOATH.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    onPnetworkV2: true,
    isSpecial: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xC66F557134695523aD7D06Fc2cf1E7C6c7849bE4',
    id: 'PFTM_ON_ETH_MAINNET',
    name: 'pFTM',
    workingName: 'pftm',
    nativeDecimals: 18,
    network: 'mainnet',
    isPerc20: true,
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PFTM',
    isPtoken: true,
    nativeSymbol: 'FTM',
    nativeBlockchain: 'FTM',
    image: 'pFTM.svg',
    withBalanceDecimalsConversion: true,
    onPnetworkV2: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: 'nuco.ptokens',
    id: 'NUCO_ON_TELOS_MAINNET',
    name: 'NUCO',
    workingName: 'nuco',
    nativeDecimals: 18,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 9,
    withMiniImage: true,
    symbol: 'NUCO',
    isPtoken: true,
    nativeSymbol: 'NCDT',
    nativeBlockchain: 'ETH',
    image: 'pNUCO.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true,
    onPnetworkV2: true,
    isSpecial: true,
    chainId: ChainId.TelosMainnet,
  },
  {
    address: '748211185',
    id: 'PUSDC_ON_ALGORAND_MAINNET',
    name: 'pUSDC',
    workingName: 'pusdc',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ALGORAND',
    decimals: 6,
    withMiniImage: true,
    symbol: 'PUSDC',
    isPtoken: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    onPnetworkV2: true,
    chainId: ChainId.AlgorandMainnet,
  },
  {
    address: '31566704',
    id: 'USDC_ON_ALGORAND_MAINNET',
    name: 'USDC',
    workingName: 'pusdc',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ALGORAND',
    decimals: 6,
    withMiniImage: true,
    symbol: 'USDC',
    isPseudoNative: true,
    swapperAddress: '770102986',
    ptokenAddress: '748211185',
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    symbolToDisplay: 'USDC',
    onPnetworkV2: true,
    isSpecial: true,
    chainId: ChainId.AlgorandMainnet,
  },
  {
    address: '748208047',
    id: 'PUSDT_ON_ALGORAND_MAINNET',
    name: 'pUSDT',
    workingName: 'pusdt',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ALGORAND',
    decimals: 6,
    withMiniImage: true,
    symbol: 'PUSDT',
    isPtoken: true,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'pUSDT.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    onPnetworkV2: true,
    chainId: ChainId.AlgorandMainnet,
  },
  {
    address: '312769',
    id: 'USDT_ON_ALGORAND_MAINNET',
    name: 'USDT',
    workingName: 'pusdt',
    nativeDecimals: 6,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ALGORAND',
    decimals: 6,
    withMiniImage: true,
    symbol: 'USDT',
    isPseudoNative: true,
    swapperAddress: '770102986',
    ptokenAddress: '748208047',
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'USDT.svg',
    withBalanceDecimalsConversion: true,
    isPerc20: true,
    symbolToDisplay: 'USDT',
    onPnetworkV2: true,
    isSpecial: true,
    chainId: ChainId.AlgorandMainnet,
  },
  {
    address: 'wmbt.ptokens',
    id: 'PWOMBAT_ON_EOS_MAINNET',
    name: 'pWOMBAT',
    workingName: 'pwombat',
    nativeDecimals: 18,
    network: 'mainnet',
    isPerc20: true,
    isHidden: false,
    blockchain: 'EOS',
    decimals: 6,
    withMiniImage: true,
    symbol: 'PWOMBAT',
    isPtoken: true,
    nativeSymbol: 'WOMBAT',
    nativeBlockchain: 'ETH',
    image: 'pWOMBAT.svg',
    withBalanceDecimalsConversion: false,
    onPnetworkV2: true,
    chainId: ChainId.EosMainnet,
  },
  {
    address: '0x3effbc016fc50beacd4fa1c7be20cddca38e7f66',
    id: 'PBTC_ON_GNOSIS_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    isHidden: false,
    blockchain: 'GNOSIS',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.XdaiMainnet,
  },
  /* #################   Native Tokens   #################*/
  {
    address: '0x0000000000000000000000000000000000000000',
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: false,
    isNative: true,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'ETH.svg',
    withBalanceDecimalsConversion: true,
    isBlockchainTokenNative: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    id: 'FTM',
    symbol: 'FTM',
    name: 'Fantom',
    network: 'mainnet',
    blockchain: 'FTM',
    decimals: 18,
    withMiniImage: false,
    isNative: true,
    nativeSymbol: 'FTM',
    nativeBlockchain: 'FTM',
    image: 'FTM.svg',
    withBalanceDecimalsConversion: true,
    isBlockchainTokenNative: true,
    chainId: ChainId.FantomMainnet,
  },
  {
    address: null,
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'testnet',
    blockchain: 'BTC',
    withMiniImage: false,
    isNative: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'BTC.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true,
    chainId: ChainId.BitcoinMainnet,
  },
  {
    address: null,
    id: 'LTC',
    symbol: 'LTC',
    name: 'Litecoin',
    network: 'mainnet',
    blockchain: 'LTC',
    withMiniImage: false,
    isNative: true,
    nativeSymbol: 'LTC',
    nativeBlockchain: 'LTC',
    image: 'LTC.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true,
    chainId: ChainId.LitecoinMainnet,
  },
  {
    address: '0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed',
    id: 'PNT_ON_ETH_MAINNET',
    symbol: 'PNT',
    name: 'pNetwork',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xf4eA6B892853413bD9d9f1a5D3a620A0ba39c5b2',
    id: 'ETHPNT_ON_ETH_MAINNET',
    symbol: 'ethPNT',
    name: 'eth-pNetwork',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    nativeDecimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'ethPNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    titleLabel: 'ethPNT',
    chainId: ChainId.EthereumMainnet,
    extendsPnt: true,
    onPnetworkV2: true,
  },
  {
    address: '0x02eca910cb3a7d43ebc7e8028652ed5c6b70259b',
    id: 'PTERIA',
    symbol: 'PTERIA',
    name: 'Pteria',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'PTERIA',
    nativeBlockchain: 'ETH',
    image: 'PTERIA.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
    id: 'UOS',
    symbol: 'UOS',
    name: 'Ultra',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 4,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'UOS',
    nativeBlockchain: 'ETH',
    image: 'UOS.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
    formattedName: 'ERC20 UOS',
  },
  {
    address: 'everipediaiq',
    id: 'IQ',
    symbol: 'IQ',
    name: 'Everipedia',
    network: 'mainnet',
    blockchain: 'EOS',
    decimals: 3,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'IQ',
    nativeBlockchain: 'EOS',
    image: 'IQ.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.EosMainnet,
  },
  {
    address: 'eosio.token',
    id: 'TLOS',
    symbol: 'TLOS',
    name: 'Telos',
    network: 'mainnet',
    blockchain: 'TELOS',
    decimals: 4,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'TLOS.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.TelosMainnet,
  },
  {
    address: '0x888888888889c00c67689029d7856aac1065ec11',
    id: 'OPIUM',
    symbol: 'OPIUM',
    name: 'Opium',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'OPIUM',
    nativeBlockchain: 'ETH',
    image: 'OPIUM.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x1fe24f25b1cf609b9c4e7e12d802e3640dfa5e43',
    id: 'CGG',
    symbol: 'CGG',
    name: 'Chain Guardians',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'CGG',
    nativeBlockchain: 'ETH',
    image: 'CGG.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    id: 'USDT',
    symbol: 'USDT',
    name: 'Tether',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 6,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'USDT.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    id: 'USDC',
    symbol: 'USDC',
    name: 'USD Coin',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 6,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x69e8b9528cabda89fe846c67675b5d73d463a916',
    id: 'OPEN',
    symbol: 'OPEN',
    name: 'Open Governance Token',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'OPEN',
    nativeBlockchain: 'ETH',
    image: 'OPEN.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xcae72a7a0fd9046cf6b165ca54c9e3a3872109e0',
    id: '$ANRX',
    symbol: '$ANRX',
    name: 'AnRKey X',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: '$ANRX',
    nativeBlockchain: 'ETH',
    image: '$ANRX.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: 'effecttokens',
    id: 'EFX',
    symbol: 'EFX',
    name: 'Effects',
    network: 'mainnet',
    blockchain: 'EOS',
    decimals: 4,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'EFX',
    nativeBlockchain: 'EOS',
    image: 'EFX.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.EosMainnet,
  },
  {
    address: 'token.seeds',
    id: 'SEEDS',
    symbol: 'SEEDS',
    name: 'Seeds',
    network: 'mainnet',
    blockchain: 'TELOS',
    decimals: 4,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'SEEDS',
    nativeBlockchain: 'TELOS',
    image: 'SEEDS.svg',
    withBalanceDecimalsConversion: false,
    chainId: ChainId.TelosMainnet,
  },
  {
    address: '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da',
    id: 'GALA',
    symbol: 'GALA',
    name: 'Gala',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 8,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'GALA',
    nativeBlockchain: 'ETH',
    image: 'GALA.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xaa602dE53347579f86b996D2Add74bb6F79462b2',
    id: 'ZMT',
    symbol: 'ZMT',
    name: 'Zipmex Token',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'ZMT',
    nativeBlockchain: 'ETH',
    image: 'ZMT.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x6e8908cfa881c9f6f2c64d3436e7b80b1bf0093f',
    id: 'BIST',
    symbol: 'BIST',
    name: 'Bistroo Token',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'BIST',
    nativeBlockchain: 'ETH',
    image: 'BIST.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x22168882276e5d5e1da694343b41dd7726eeb288',
    id: 'WSB',
    symbol: 'WSB',
    name: 'WallStreetBets Token',
    network: 'mainnet',
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'WSB',
    nativeBlockchain: 'BSC',
    image: 'WSB.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.BscMainnet,
  },
  {
    address: '0xd39a2cecba2657e125ba6a5c98ad2f6b6d7e83fd',
    id: 'LUXO',
    symbol: 'LUXO',
    name: 'Luxochain',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'LUXO',
    nativeBlockchain: 'ETH',
    image: 'LUXO.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0xe0a189c975e4928222978a74517442239a0b86ff',
    id: 'KEYS',
    symbol: 'KEYS',
    name: 'Keys',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 9,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'KEYS',
    nativeBlockchain: 'ETH',
    image: 'KEYS.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x21ada0d2ac28c3a5fa3cd2ee30882da8812279b6',
    id: 'OATH',
    symbol: 'OATH',
    name: 'Oath Token',
    network: 'mainnet',
    blockchain: 'FTM',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'OATH',
    nativeBlockchain: 'FTM',
    image: 'OATH.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.FantomMainnet,
  },
  {
    address: '0xE0C8b298db4cfFE05d1bEA0bb1BA414522B33C1B',
    id: 'NCDT',
    symbol: 'NCDT',
    name: 'Nuco.Cloud',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'NCDT',
    nativeBlockchain: 'ETH',
    image: 'NUCO.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
  {
    address: '0x0C9c7712C83B3C70e7c5E11100D33D9401BdF9dd',
    id: 'WOMBAT',
    symbol: 'WOMBAT',
    name: 'Wombat',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isNative: true,
    nativeSymbol: 'WOMBAT',
    nativeBlockchain: 'ETH',
    image: 'WOMBAT.svg',
    withBalanceDecimalsConversion: true,
    chainId: ChainId.EthereumMainnet,
  },
]

export default swapAssets
