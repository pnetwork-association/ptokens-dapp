import _ from 'lodash'

export const isValidSwap = (from, to, assets) => {
  if (_.isNil(from) || _.isNil(to)) return false
  if (to.id === from.id) return false
  if (!assets.find(({ id }) => from.id === id) && !assets.find(({ id }) => to.id === id)) return false
  if (to.isHidden) return false
  if (to.nativeSymbol.toLowerCase() !== from.nativeSymbol.toLowerCase()) return false
  if (from.isNative) {
    if (to.requiresCurve) return false
    return true
  } else {
    if (from.isPseudoNative && !to.isNative) return false
    if (to.isPseudoNative) return false
    if (to.requiresCurve) return false
    if (from.requiresCurve && from.blockchain === to.blockchain) return false
    return true
  }
}
