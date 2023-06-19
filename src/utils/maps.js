import { Blockchain } from '../constants'

const blockchainToName = {
  [Blockchain.Ethereum]: 'Ethereum',
  [Blockchain.Bitcoin]: 'Bitcoin',
  [Blockchain.Litecoin]: 'Litecoin',
  [Blockchain.Telos]: 'Telos',
  [Blockchain.Libre]: 'Libre',
  [Blockchain.XDAI]: 'xDai',
  [Blockchain.BSC]: 'Binance Smart Chain',
  [Blockchain.Dogecoin]: 'Dogecoin',
  [Blockchain.EOS]: 'EOS',
  [Blockchain.Polygon]: 'Polygon',
  [Blockchain.Ultra]: 'Ultra',
  [Blockchain.Arbitrum]: 'Arbitrum',
  [Blockchain.Luxochain]: 'Luxochain',
  [Blockchain.Algorand]: 'Algorand',
  [Blockchain.Fantom]: 'Fantom',
  [Blockchain.Ore]: 'Ore',
}

const blockchainToCoin = {
  [Blockchain.Ethereum]: 'Ethereum',
  [Blockchain.Bitcoin]: 'Bitcoin',
  [Blockchain.Litecoin]: 'Litecoin',
  [Blockchain.Telos]: 'Telos',
  [Blockchain.Libre]: 'Libre',
  [Blockchain.XDAI]: 'xDai',
  [Blockchain.BSC]: 'Binance Coin',
  [Blockchain.Dogecoin]: 'Dogecoin',
  [Blockchain.EOS]: 'EOS',
  [Blockchain.Polygon]: 'MATIC',
  [Blockchain.Ultra]: 'Ultra Token',
  [Blockchain.Arbitrum]: 'Arbitrum',
  [Blockchain.Luxochain]: 'Luxochain',
  [Blockchain.Algorand]: 'Algorand',
  [Blockchain.Fantom]: 'Fantom',
  [Blockchain.Ore]: 'Ore',
}

const getAssetFromSymbol = (_assets, _symbol) => _assets.find(({ symbol }) => symbol === _symbol)

const getWorkingNameForNodeSelection = (_workingName) =>
  _workingName.toLowerCase() === 'peth' ? 'pweth' : _workingName.toLowerCase()

export { blockchainToName, getAssetFromSymbol, blockchainToCoin, getWorkingNameForNodeSelection }
