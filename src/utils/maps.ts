import { Chain } from '@p.network/ptokens-constants'

import { Asset } from '../constants/swap-assets'

const chainToName: Record<string, string> = {
  [Chain.GnosisMainnet]: 'xDai',
}

// const blockchainSymbolToCoin: Record<string, string> = {
//   [Chain.GnosisMainnet]: 'xDai',
// }

const getAssetFromId = (_assets: Asset[], _id: string) => {
  return _assets.find(({ id }) => id === _id)
}

export { chainToName, getAssetFromId }
