const blockchainSymbolToName = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  TELOS: 'Telos',
  LIBRE: 'Libre',
  XDAI: 'xDai',
  BSC: 'Binance Smart Chain',
  DOGE: 'Dogecoin',
  EOS: 'EOS',
  POLYGON: 'Polygon',
  RVN: 'Ravencoin',
  LBC: 'Lbry Credits',
  ULTRA: 'Ultra',
  ARBITRUM: 'Arbitrum',
  LUXOCHAIN: 'Luxochain',
  ALGORAND: 'Algorand',
  FTM: 'Fantom',
  ORE: 'ORE',
  SEPOLIA: 'Sepolia',
  GOERLI: 'Goerli',
}

const blockchainSymbolToCoin = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  TELOS: 'Telos',
  LIBRE: 'Libre',
  XDAI: 'xDai',
  BSC: 'Binance Coin',
  DOGE: 'Dogecoin',
  EOS: 'EOS',
  POLYGON: 'MATIC',
  RVN: 'Ravencoin',
  LBC: 'Lbry Credits',
  ULTRA: 'Ultra Token',
  ARBITRUM: 'Arbitrum',
  LUXOCHAIN: 'Luxochain',
  ALGORAND: 'Algorand',
  FTM: 'Fantom',
  ORE: 'ORE',
  SEPOLIA: 'Sepolia',
  GOERLI: 'Goerli',
}

const getAssetFromSymbol = (_assets, _symbol) => _assets.find(({ symbol }) => symbol === _symbol)

export { blockchainSymbolToName, getAssetFromSymbol, blockchainSymbolToCoin }
