import settings from './index'

const swapAssets = [
  ...settings.pTokensAvailable,
  {
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'ETH',
    nativeBlockchain: 'ETH',
    image: 'ETH.svg'
  },
  {
    id: 'EOS',
    symbol: 'EOS',
    name: 'EOS',
    network: 'mainnet',
    blockchain: 'EOS',
    skipNodeSelection: true,
    decimals: 8,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'EOS',
    nativeBlockchain: 'EOS',
    image: 'EOS.svg'
  },
  {
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'mainnet',
    blockchain: 'BTC',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'BTC',
    nativeBlockchain: 'BTC',
    image: 'BTC.svg',
    peginWithDepositAddress: true
  },
  {
    id: 'LTC',
    symbol: 'LTC',
    name: 'Litecoin',
    network: 'mainnet',
    blockchain: 'LTC',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'LTC',
    nativeBlockchain: 'LTC',
    image: 'LTC.svg',
    peginWithDepositAddress: true
  },
  {
    id: 'DOGE',
    symbol: 'DOGE',
    name: 'Dogecoin',
    network: 'mainnet',
    blockchain: 'DOGE',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'DOGE',
    nativeBlockchain: 'DOGE',
    image: 'DOGE.svg',
    peginWithDepositAddress: true
  },
  {
    id: 'RVN',
    symbol: 'RVN',
    name: 'Ravencoin',
    network: 'mainnet',
    blockchain: 'RVN',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false,
    nativeSymbol: 'RVN',
    nativeBlockchain: 'RVN',
    image: 'RVN.svg',
    peginWithDepositAddress: true
  },
  {
    id: 'UNI',
    symbol: 'UNI',
    name: 'Uniswap',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'UNI',
    nativeBlockchain: 'ETH',
    image: 'UNI.svg'
  },
  {
    id: 'ANT',
    symbol: 'ANT',
    name: 'Aragon Network',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'ANT',
    nativeBlockchain: 'ETH',
    image: 'ANT.svg'
  },
  {
    id: 'BAL',
    symbol: 'BAL',
    name: 'Balance',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAL',
    nativeBlockchain: 'ETH',
    image: 'BAL.svg'
  },
  {
    id: 'BAND',
    symbol: 'BAND',
    name: 'Band Protocol',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAND',
    nativeBlockchain: 'ETH',
    image: 'BAND.svg'
  },
  {
    id: 'BAT',
    symbol: 'BAT',
    name: 'Basic Attention Token',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BAT',
    nativeBlockchain: 'ETH',
    image: 'BAT.svg'
  },
  {
    id: 'COMP',
    symbol: 'COMP',
    name: 'Compound',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'COMP',
    nativeBlockchain: 'ETH',
    image: 'COMP.svg'
  },
  {
    id: 'DAI',
    symbol: 'DAI',
    name: 'Compound',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'DAI',
    nativeBlockchain: 'ETH',
    image: 'DAI.svg'
  },
  {
    id: 'LINK',
    symbol: 'LINK',
    name: 'Chainlink',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'LINK',
    nativeBlockchain: 'ETH',
    image: 'LINK.svg'
  },
  {
    id: 'LRC',
    symbol: 'LRC',
    name: 'Loopring',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'LRC',
    nativeBlockchain: 'ETH',
    image: 'LRC.svg'
  },
  {
    id: 'MKR',
    symbol: 'MKR',
    name: 'Maker DAO',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'MKR',
    nativeBlockchain: 'ETH',
    image: 'MKR.svg'
  },
  {
    id: 'OMG',
    symbol: 'OMG',
    name: 'Omise Go',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'OMG',
    nativeBlockchain: 'ETH',
    image: 'OMG.svg'
  },
  {
    id: 'PNK',
    symbol: 'PNK',
    name: 'Kleros',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'PNK',
    nativeBlockchain: 'ETH',
    image: 'PNK.svg'
  },
  {
    id: 'PNT',
    symbol: 'PNT',
    name: 'pNetwork Token',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'PNT',
    nativeBlockchain: 'ETH',
    image: 'PNT.svg'
  },
  {
    id: 'PTERIA',
    symbol: 'PTERIA',
    name: 'PTERIA',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'PTERIA',
    nativeBlockchain: 'ETH',
    image: 'PTERIA.svg'
  },
  {
    id: 'REP',
    symbol: 'REP',
    name: 'Augur',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'REP',
    nativeBlockchain: 'ETH',
    image: 'REP.svg'
  },
  {
    id: 'SNX',
    symbol: 'SNX',
    name: 'Synthetix',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'SNX',
    nativeBlockchain: 'ETH',
    image: 'SNX.svg'
  },
  {
    id: 'UOS',
    symbol: 'UOS',
    name: 'Ultra',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'UOS',
    nativeBlockchain: 'ETH',
    image: 'UOS.svg'
  },
  {
    id: 'YFI',
    symbol: 'YFI',
    name: 'yearn Finance',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'YFI',
    nativeBlockchain: 'ETH',
    image: 'YFI.svg'
  },
  {
    id: 'ZRX',
    symbol: 'ZRX',
    name: '0X',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'ZRX',
    nativeBlockchain: 'ETH',
    image: 'ZRX.svg'
  },
  {
    id: 'IQ',
    symbol: 'IQ',
    name: 'Everipedia',
    network: 'mainnet',
    blockchain: 'EOS',
    skipNodeSelection: true,
    decimals: 0,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'IQ',
    nativeBlockchain: 'EOS',
    image: 'IQ.svg'
  },
  {
    id: 'TLOS',
    symbol: 'TLOS',
    name: 'Telos',
    network: 'mainnet',
    blockchain: 'TELOS',
    skipNodeSelection: true,
    decimals: 0,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'TLOS',
    nativeBlockchain: 'TELOS',
    image: 'TLOS.svg'
  },
  {
    id: 'OPIUM',
    symbol: 'OPIUM',
    name: 'Opium Network Token',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'OPIUM',
    nativeBlockchain: 'ETH',
    image: 'OPIUM.svg'
  },
  {
    id: 'DEFI++',
    symbol: 'DEFI++',
    name: 'DEFI++',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'DEFI++',
    nativeBlockchain: 'ETH',
    image: 'DEFI++.svg'
  },
  {
    id: 'BCP',
    symbol: 'BCP',
    name: 'Balanced Crypo Pie',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'BCP',
    nativeBlockchain: 'ETH',
    image: 'BCP.svg'
  },
  {
    id: 'CGG',
    symbol: 'CGG',
    name: 'ChainGuardians Governance Token',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'CGG',
    nativeBlockchain: 'ETH',
    image: 'CGG.svg'
  },
  {
    id: 'USDT',
    symbol: 'USDT',
    name: 'Tether USD',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 6,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'USDT.svg'
  },
  {
    id: 'USDC',
    symbol: 'USDC',
    name: 'USD Coin',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 6,
    withMiniImage: true,
    isPtoken: false,
    nativeSymbol: 'USDT',
    nativeBlockchain: 'ETH',
    image: 'USDT.svg'
  }
]

export default swapAssets
