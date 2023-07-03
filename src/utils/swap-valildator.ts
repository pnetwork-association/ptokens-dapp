import _ from 'lodash'

import { Asset } from '../settings/swap-assets'

export const isValidSwap = (from: Asset, to: Asset, assets: Asset[]) => {
  if (_.isNil(from) || _.isNil(to)) return false
  if (to.id === from.id) return false
  if (!assets.find(({ id }) => from.id === id) && !assets.find(({ id }) => to.id === id)) return false
  if (to.isHidden) return false
  if (to.nativeSymbol.toLowerCase() !== from.nativeSymbol.toLowerCase()) return false
  if (from.isNative) {
    return true
  } else {
    if (from.isPseudoNative && !to.isNative) return false
    if (to.isPseudoNative) return false
    return true
  }
}
