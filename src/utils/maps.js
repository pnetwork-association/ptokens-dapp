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

const getAssetFromSymbol = (_assets, _symbol) => _assets.find(({ symbol }) => symbol === _symbol)

export { blockchainSymbolToName, getAssetFromSymbol, blockchainSymbolToCoin }
