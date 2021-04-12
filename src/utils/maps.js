const blockchainSymbolToName = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  TELOS: 'Telos',
  XDAI: 'xDai',
  BSC: 'Binance Smart Chain',
  DOGE: 'Dogecoin',
  EOS: 'EOS',
  POLYGON: 'Polygon',
  RVN: 'Ravencoin'
}

const blockchainSymbolToCoin = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  TELOS: 'Telos',
  XDAI: 'xDai',
  BSC: 'Binance Coin',
  DOGE: 'Dogecoin',
  EOS: 'EOS',
  POLYGON: 'MATIC',
  RVN: 'Ravencoin'
}

const blockchainSymbolToConfirmationTimeString = {
  ETH: '15 seconds',
  BTC: '10 minutes',
  LTC: 'few seconds',
  TELOS: 'few seconds',
  XDAI: 'few seconds',
  BSC: 'few seconds',
  DOGE: 'few seconds',
  EOS: 'few seconds',
  POLYGON: 'few seconds',
  RVN: 'few seconds'
}

const getAssetFromSymbol = (_assets, _symbol) => _assets.find(({ symbol }) => symbol === _symbol)

export { blockchainSymbolToName, getAssetFromSymbol, blockchainSymbolToCoin, blockchainSymbolToConfirmationTimeString }
