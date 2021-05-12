const swapAssets = [
  {
    address: '5228a22e72ccc52d415ecfd199f99d0665e7733b',
    id: 'PBTC_ON_ETH_MAINNET',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: 'btc.ptokens',
    id: 'PBTC_ON_EOS_MAINNET',
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
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'btc.ptokens',
    id: 'PBTC_ON_TELOS_MAINNET',
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
    image: 'pBTC.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: '0x5979f50f1d4c08f9a53863c2f39a7b0492c38d0f',
    id: 'PLTC_ON_ETH_MAINNET',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: 'ltc.ptokens',
    id: 'PLTC_ON_EOS_MAINNET',
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
    image: 'pLTC.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'eth.ptokens',
    id: 'PETH_ON_EOS_MAINNET',
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
    image: 'pETH.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: 'pnt.ptokens',
    id: 'PNT_ON_EOS_MAINNET',
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
    image: 'PNT.svg',
    withBalanceDecimalsConversion: false,
    isSpecial: true
  },
  {
    address: 'mkr.ptokens',
    id: 'PMKR_ON_EOS_MAINNET',
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
    image: 'pMKR.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'link.ptokens',
    id: 'PLINK_ON_EOS_MAINNET',
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
    image: 'pLINK.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'yfi.ptokens',
    id: 'PYFI_ON_EOS_MAINNET',
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
    image: 'pYFI.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'pte.ptokens',
    id: 'PTERIA_ON_EOS_MAINNET',
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
    image: 'PTERIA.svg',
    withBalanceDecimalsConversion: false,
    isSpecial: true
  },
  {
    address: 'uni.ptokens',
    id: 'PUNI_ON_EOS_MAINNET',
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
    image: 'pUNI.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'bal.ptokens',
    id: 'PBAL_ON_EOS_MAINNET',
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
    image: 'pBAL.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'band.ptokens',
    id: 'PBAND_ON_EOS_MAINNET',
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
    image: 'pBAND.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'comp.ptokens',
    id: 'PCOMP_ON_EOS_MAINNET',
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
    image: 'pCOMP.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'snx.ptokens',
    id: 'PSNX_ON_EOS_MAINNET',
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
    image: 'pSNX.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'omg.ptokens',
    id: 'POMG_ON_EOS_MAINNET',
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
    image: 'pOMG.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'ant.ptokens',
    id: 'PANT_ON_EOS_MAINNET',
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
    image: 'pANT.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'dai.ptokens',
    id: 'PDAI_ON_EOS_MAINNET',
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
    image: 'pDAI.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'lrc.ptokens',
    id: 'PLRC_ON_EOS_MAINNET',
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
    image: 'pLRC.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'uos1.ptokens',
    id: 'PUOS_ON_EOS_MAINNET',
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
    image: 'pUOS.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'bat.ptokens',
    id: 'PBAT_ON_EOS_MAINNET',
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
    image: 'pBAT.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'rep.ptokens',
    id: 'PREP_ON_EOS_MAINNET',
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
    image: 'pREP.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'zrx.ptokens',
    id: 'PZRX_ON_EOS_MAINNET',
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
    image: 'pZRX.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'pnk.ptokens',
    id: 'PPNK_ON_EOS_MAINNET',
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
    image: 'pPNK.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: '0xd055b033b2d72e4b2c26048c5d412026c1823015',
    id: 'PDOGE_ON_ETH_MAINNET',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x8e220b9d3f09c56dc306cab1d7644b846066cc43',
    id: 'PEOS_ON_ETH_MAINNET',
    name: 'pEOS',
    workingName: 'peos',
    nativeDecimals: 0,
    network: 'mainnet',
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
    image: 'pEOS.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xed28a457a5a76596ac48d87c0f577020f6ea1c4c',
    id: 'PBTC_ON_BSC_MAINNET',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '2d9eef197371ff2309000a8fc2a1aeeaba401089',
    id: 'PEOS_ON_POLYGON_MAINNET',
    name: 'pEOS',
    workingName: 'peos',
    nativeDecimals: 0,
    network: 'mainnet',
    minimumIssuable: '0.0001',
    minimumRedeamable: '0.00001',
    isPeosioToken: true,
    isHidden: false,
    blockchain: 'POLYGON',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PEOS',
    isPtoken: true,
    nativeSymbol: 'EOS',
    nativeBlockchain: 'EOS',
    image: 'pEOS.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x3effbc016fc50beacd4fa1c7be20cddca38e7f66',
    id: 'PBTC_ON_XDAI_MAINNET',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xa23d33d5e0a61ba81919bfd727c671bb03ab0fea',
    id: 'IQ_ON_ETH_MAINNET',
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
    image: 'pIQ.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x7825e833d495f3d1c28872415a4aee339d26ac88',
    id: 'TLOS_ON_ETH_MAINNET',
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
    isSpecial: true,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'pTLOS.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xdaacb0ab6fb34d24e8a67bfa14bf4d95d4c7af92',
    id: 'PNT_ON_BSC_MAINNET',
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
    isPerc20: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true,
    withAmountConversionPegout: true,
    isSpecial: true
  },
  {
    address: '0x9f5377fa03dcd4016a33669b385be4d0e02f27bc',
    id: 'PTERIA_ON_BSC_MAINNET',
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
    isPerc20: true,
    nativeSymbol: 'PTERIA',
    nativeBlockchain: 'ETH',
    image: 'PTERIA.svg',
    withBalanceDecimalsConversion: true,
    withAmountConversionPegout: true
  },
  {
    address: '0x566cedd201f67e542a6851a2959c1a449a041945',
    id: 'POPIUM_ON_BSC_MAINNET',
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
    isPerc20: true,
    nativeSymbol: 'OPIUM',
    nativeBlockchain: 'ETH',
    image: 'pOPIUM.svg',
    withBalanceDecimalsConversion: true,
    withAmountConversionPegout: true
  },
  {
    address: '0xae22e27d1f727b585549c10e26192b2bc01082ca',
    id: 'PDEFIPLUSPLUS_ON_BSC_MAINNET',
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
    isPerc20: true,
    nativeSymbol: 'DEFI++',
    nativeBlockchain: 'ETH',
    image: 'pDEFI++.svg',
    withBalanceDecimalsConversion: true,
    withAmountConversionPegout: true
  },
  {
    address: '0xa114f89b49d6a58416bb07dbe09502c4f3a19e2f',
    id: 'PBCP_ON_BSC_MAINNET',
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
    isPerc20: true,
    nativeSymbol: 'BCP',
    nativeBlockchain: 'ETH',
    image: 'pBCP.svg',
    withBalanceDecimalsConversion: true,
    withAmountConversionPegout: true
  },
  {
    address: '0x1613957159e9b0ac6c80e824f7eea748a32a0ae2',
    id: 'CGG_ON_BSC_MAINNET',
    name: 'CGG',
    workingName: 'cgg',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
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
    withAmountConversionPegout: true
  },
  {
    address: 'eth.ptokens',
    id: 'PETH_ON_TELOS_MAINNET',
    name: 'pETH',
    workingName: 'peth',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    symbol: 'PETH',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'pETH.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'link.ptokens',
    id: 'PLINK_ON_TELOS_MAINNET',
    name: 'pLINK',
    workingName: 'plink',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    symbol: 'PLINK',
    isPtoken: true,
    isPerc20: true,
    nativeSymbol: 'LINK',
    nativeBlockchain: 'ETH',
    image: 'pLINK.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'pnt.ptokens',
    id: 'PNT_ON_TELOS_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    isSpecial: true,
    isPerc20: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'usdt.ptokens',
    id: 'PUSDT_ON_TELOS_MAINNET',
    name: 'pUSDT',
    workingName: 'pusdt',
    nativeDecimals: 6,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    symbol: 'PUSDT',
    isPtoken: true,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'pUSDT.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true
  },
  {
    address: 'usdc.ptokens',
    id: 'PUSDC_ON_TELOS_MAINNET',
    name: 'pUSDC',
    workingName: 'pusdc',
    nativeDecimals: 6,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    symbol: 'PUSDC',
    isPtoken: true,
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'pUSDC.svg',
    withBalanceDecimalsConversion: false,
    isPerc20: true
  },
  {
    address: '0x0259461eed4d76d4f0f900f9035f6c4dfb39159a',
    id: 'PNT_ON_XDAI_MAINNET',
    name: 'PNT',
    workingName: 'pnt',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'XDAI',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PNT',
    isPtoken: true,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true,
    isSpecial: true,
    isPerc20: true
  },
  {
    address: '0x0c80075886d9e64CC33ca701A4Ad1C0D8F0bd651',
    id: 'PRVN_ON_BSC_MAINNET',
    name: 'pRVN',
    workingName: 'prvn',
    nativeDecimals: 8,
    network: 'mainnet',
    minimumIssuable: '0',
    minimumRedeamable: '0.0000546',
    isHidden: false,
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PRVN',
    isPtoken: true,
    nativeSymbol: 'RVN',
    nativeBlockchain: 'RVN',
    image: 'pRVN.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xb6c53431608e626ac81a9776ac3e999c5556717c',
    id: 'TLOS_ON_BSC_MAINNET',
    name: 'TLOS',
    workingName: 'tlos',
    nativeDecimals: 0,
    network: 'mainnet',
    minimumIssuable: '0.001',
    minimumRedeamable: '0.00005',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xabae871b7e3b67aeec6b46ae9fe1a91660aadac5',
    id: 'POPEN_ON_BSC_MAINNET',
    name: 'pOPEN',
    workingName: 'popen',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xA4b85d23238396051d554b1f8918E484ee9f08e2',
    id: 'OCP_ON_ETH_MAINNET',
    name: 'OCP',
    workingName: 'ocp',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    symbol: 'OCP',
    isPtoken: true,
    isBep20: true,
    nativeSymbol: 'OCP',
    nativeBlockchain: 'BSC',
    image: 'pOCP.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true,
    isSpecial: true
  },
  {
    address: '0xe2e7329499e8ddb1f2b04ee4b35a8d7f6881e4ea',
    id: '$ANRX_ON_BSC_MAINNET',
    name: '$ANRX',
    workingName: 'anrx',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
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
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xd7ecf95cf7ef5256990beaf4ac895cd9e64cb947',
    id: 'PBTC_ON_POLYGON_MAINNET',
    name: 'pBTC',
    workingName: 'pbtc',
    nativeDecimals: 8,
    network: 'mainnet',
    minimumIssuable: '0',
    minimumRedeamable: '0.00005',
    isHidden: false,
    blockchain: 'POLYGON',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isPtoken: true,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'pBTC.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xad178e5d81dbbf0e7da5106e8c035d9289091c45',
    id: 'TFF_ON_POLYGON_MAINNET',
    name: 'TFF',
    workingName: 'tff',
    nativeDecimals: 18,
    network: 'mainnet',
    minimumIssuable: '0.000000001',
    minimumRedeamable: '0.000000001',
    isHidden: false,
    blockchain: 'POLYGON',
    decimals: 18,
    withMiniImage: true,
    symbol: 'TFF',
    isPtoken: true,
    isBep20: true,
    nativeSymbol: 'TFF',
    nativeBlockchain: 'BSC',
    image: 'pTFF.svg',
    withAmountConversionPegout: true,
    withBalanceDecimalsConversion: true,
    isSpecial: true
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'ETH.svg',
    withBalanceDecimalsConversion: true,
    isBlockchainTokenNative: true
  },
  {
    address: 'eosio.token',
    id: 'EOS',
    symbol: 'EOS',
    name: 'EOS',
    network: 'mainnet',
    blockchain: 'EOS',
    decimals: 8,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'EOS',
    nativeBlockchain: 'EOS',
    image: 'EOS.svg',
    withBalanceDecimalsConversion: false,
    isBlockchainTokenNative: true
  },
  {
    address: null,
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'mainnet',
    blockchain: 'BTC',
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'BTC.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true
  },
  {
    address: null,
    id: 'LTC',
    symbol: 'LTC',
    name: 'Litecoin',
    network: 'mainnet',
    blockchain: 'LTC',
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'LTC',
    nativeBlockchain: 'LTC',
    image: 'LTC.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true
  },
  {
    address: null,
    id: 'DOGE',
    symbol: 'DOGE',
    name: 'Dogecoin',
    network: 'mainnet',
    blockchain: 'DOGE',
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'DOGE',
    nativeBlockchain: 'DOGE',
    image: 'DOGE.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true
  },
  {
    address: null,
    id: 'RVN',
    symbol: 'RVN',
    name: 'Ravencoin',
    network: 'mainnet',
    blockchain: 'RVN',
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'RVN',
    nativeBlockchain: 'RVN',
    image: 'RVN.svg',
    peginWithDepositAddress: true,
    withBalanceDecimalsConversion: null,
    isBlockchainTokenNative: true
  },
  {
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    id: 'UNI',
    symbol: 'UNI',
    name: 'Uniswap',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'UNI',
    nativeBlockchain: 'ETH',
    image: 'UNI.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e',
    id: 'ANT',
    symbol: 'ANT',
    name: 'Aragon',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'ANT',
    nativeBlockchain: 'ETH',
    image: 'ANT.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xba100000625a3754423978a60c9317c58a424e3d',
    id: 'BAL',
    symbol: 'BAL',
    name: 'Balancer',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAL',
    nativeBlockchain: 'ETH',
    image: 'BAL.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    id: 'BAND',
    symbol: 'BAND',
    name: 'Band Protocol',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAND',
    nativeBlockchain: 'ETH',
    image: 'BAND.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    id: 'BAT',
    symbol: 'BAT',
    name: 'Basic Attention Token',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAT',
    nativeBlockchain: 'ETH',
    image: 'BAT.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    id: 'COMP',
    symbol: 'COMP',
    name: 'Compound',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'COMP',
    nativeBlockchain: 'ETH',
    image: 'COMP.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    id: 'DAI',
    symbol: 'DAI',
    name: 'Dai',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'DAI',
    nativeBlockchain: 'ETH',
    image: 'DAI.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
    id: 'LINK',
    symbol: 'LINK',
    name: 'Chainlink',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'LINK',
    nativeBlockchain: 'ETH',
    image: 'LINK.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    id: 'LRC',
    symbol: 'LRC',
    name: 'Loopring',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'LRC',
    nativeBlockchain: 'ETH',
    image: 'LRC.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    id: 'MKR',
    symbol: 'MKR',
    name: 'Maker',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'MKR',
    nativeBlockchain: 'ETH',
    image: 'MKR.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    id: 'OMG',
    symbol: 'OMG',
    name: 'OMG Network',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'OMG',
    nativeBlockchain: 'ETH',
    image: 'OMG.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d',
    id: 'PNK',
    symbol: 'PNK',
    name: 'Kleros',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'PNK',
    nativeBlockchain: 'ETH',
    image: 'PNK.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed',
    id: 'PNT',
    symbol: 'PNT',
    name: 'pNetwork',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: 'PTERIA',
    nativeBlockchain: 'ETH',
    image: 'PTERIA.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x221657776846890989a759ba2973e427dff5c9bb',
    id: 'REP',
    symbol: 'REP',
    name: 'Augur',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'REP',
    nativeBlockchain: 'ETH',
    image: 'REP.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    id: 'SNX',
    symbol: 'SNX',
    name: 'Synthetix',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'SNX',
    nativeBlockchain: 'ETH',
    image: 'SNX.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
    id: 'UOS',
    symbol: 'UOS',
    name: 'Ultra',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'UOS',
    nativeBlockchain: 'ETH',
    image: 'UOS.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    id: 'YFI',
    symbol: 'YFI',
    name: 'Yearn Finance',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'YFI',
    nativeBlockchain: 'ETH',
    image: 'YFI.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    id: 'ZRX',
    symbol: 'ZRX',
    name: '0X',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'ZRX',
    nativeBlockchain: 'ETH',
    image: 'ZRX.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: 'everipediaiq',
    id: 'IQ',
    symbol: 'IQ',
    name: 'Everipedia',
    network: 'mainnet',
    blockchain: 'EOS',
    decimals: 0,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'IQ',
    nativeBlockchain: 'EOS',
    image: 'IQ.svg',
    withBalanceDecimalsConversion: false
  },
  {
    address: 'eosio.token',
    id: 'TLOS',
    symbol: 'TLOS',
    name: 'Telos',
    network: 'mainnet',
    blockchain: 'TELOS',
    decimals: 0,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'TLOS.svg',
    withBalanceDecimalsConversion: false
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
    isPtoken: false,
    nativeSymbol: 'OPIUM',
    nativeBlockchain: 'ETH',
    image: 'OPIUM.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x8d1ce361eb68e9e05573443c407d4a3bed23b033',
    id: 'DEFI++',
    symbol: 'DEFI++',
    name: 'PieDAO DEFI++',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'DEFI++',
    nativeBlockchain: 'ETH',
    image: 'DEFI++.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0xe4f726adc8e89c6a6017f01eada77865db22da14',
    id: 'BCP',
    symbol: 'BCP',
    name: 'PieDAO Balanced Crypto Pie',
    network: 'mainnet',
    blockchain: 'ETH',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BCP',
    nativeBlockchain: 'ETH',
    image: 'BCP.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: 'CGG',
    nativeBlockchain: 'ETH',
    image: 'CGG.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'USDT.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: 'USDC',
    nativeBlockchain: 'ETH',
    image: 'USDC.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: 'OPEN',
    nativeBlockchain: 'ETH',
    image: 'OPEN.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x3c70260eee0a2bfc4b375feb810325801f289fbd',
    id: 'OCP',
    symbol: 'OCP',
    name: 'Omni Consumer Protocols',
    network: 'mainnet',
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'OCP',
    nativeBlockchain: 'BSC',
    image: 'OCP.svg',
    withBalanceDecimalsConversion: true
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
    isPtoken: false,
    nativeSymbol: '$ANRX',
    nativeBlockchain: 'ETH',
    image: '$ANRX.svg',
    withBalanceDecimalsConversion: true
  },
  {
    address: '0x2d69c55baecefc6ec815239da0a985747b50db6e',
    id: 'TFF',
    symbol: 'TFF',
    name: 'Tutti Frutti',
    network: 'mainnet',
    blockchain: 'BSC',
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'TFF',
    nativeBlockchain: 'BSC',
    image: 'TFF.svg',
    withBalanceDecimalsConversion: true
  }
]

export default swapAssets
