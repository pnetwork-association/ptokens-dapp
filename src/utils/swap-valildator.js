import _ from 'lodash'

import { ETHPNT_ON_ETH_MAINNET } from '../constants'

export const isValidSwap = (from, to, assets) => {
  if (_.isNil(from) || _.isNil(to)) return false
  if (to.id === from.id) return false
  if (!assets.find(({ id }) => from.id === id) || !assets.find(({ id }) => to.id === id)) return false
  if (from.id === ETHPNT_ON_ETH_MAINNET && to.nativeSymbol === 'PNT' && !to.isNative) return true
  if (to.isHidden) return false
  if (to.nativeSymbol.toLowerCase() !== from.nativeSymbol.toLowerCase()) return false
  if (from.id === 'TLOS_ON_ETH_MAINNET' && to.id !== 'TLOS') return false
  if (from.isNative) {
    if (to.requiresCurve) return false
    return true
  } else {
    if (from.onlyLegacyRedeem && !to.isNative) return false
    if (from.onPnetworkV2 && !to.isNative && !to.onPnetworkV2) return false
    if (!from.onPnetworkV2 && !to.isNative) return false
    if (from.isPseudoNative && !to.isNative) return false
    if (to.isPseudoNative) return false
    if (to.requiresCurve) return false
    if (from.requiresCurve && from.blockchain === to.blockchain) return false
    return true
  }
}
