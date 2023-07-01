import { Blockchain } from 'ptokens-constants'

const blockchainSymbolToName = {
  [Blockchain.Gnosis]: 'xDai',
  [Blockchain.Arbitrum]: 'Arbitrum',
}

const blockchainSymbolToCoin = {
  [Blockchain.Gnosis]: 'xDai',
  [Blockchain.Arbitrum]: 'Arbitrum',
}

const getAssetFromSymbol = (_assets: [], _symbol: string) => _assets.find(({ symbol }) => symbol === _symbol)

export { blockchainSymbolToName, getAssetFromSymbol, blockchainSymbolToCoin }
