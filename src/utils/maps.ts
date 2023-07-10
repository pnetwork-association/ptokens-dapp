import { Blockchain } from 'ptokens-constants'

import { Asset } from '../settings/swap-assets'

const blockchainSymbolToName: Record<string, string> = {
  [Blockchain.Gnosis]: 'xDai',
  [Blockchain.Arbitrum]: 'Arbitrum',
}

const blockchainSymbolToCoin: Record<string, string> = {
  [Blockchain.Gnosis]: 'xDai',
  [Blockchain.Arbitrum]: 'Arbitrum',
}

const getAssetFromSymbol = (_assets: Asset[], _symbol: string) => {
  console.info('getAssetFromSymbol', _assets, _symbol)
  return _assets.find(({ symbol }) => symbol === _symbol)
}

export { blockchainSymbolToName, getAssetFromSymbol, blockchainSymbolToCoin }
