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
  RVN: 'Ravencoin',
  LBC: 'Lbry Credits',
  ULTRA: 'Ultra',
  ARBITRUM: 'Arbitrum',
  LUXOCHAIN: 'Luxochain'
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
  RVN: 'Ravencoin',
  LBC: 'Lbry Credits',
  ULTRA: 'Ultra Token',
  ARBITRUM: 'Arbitrum',
  LUXOCHAIN: 'Luxochain'
}

const getAssetFromNativeSymbol = (_assets, _symbol) => _assets.find(({ symbol }) => symbol === _symbol)

const getWorkingNameForNodeSelection = _workingName =>
  _workingName.toLowerCase() === 'peth' ? 'pweth' : _workingName.toLowerCase()

export { blockchainSymbolToName, getAssetFromNativeSymbol, blockchainSymbolToCoin, getWorkingNameForNodeSelection }
