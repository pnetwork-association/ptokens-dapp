import _ from 'lodash'

import { Asset, isNative } from '../settings/swap-assets'

const sameAssets = (from: Asset, to: Asset) => {
  const a = 'underlyingAsset' in from ? from.underlyingAsset : from.id
  const b = 'underlyingAsset' in to ? to.underlyingAsset : to.id
  return a === b
}

export const isValidSwap = (from: Asset | null, to: Asset | null, assets: Asset[]) => {
  if (_.isNil(from) || _.isNil(to)) return false
  if (to.id === from.id) return false
  if (!assets.find(({ id }) => from.id === id) && !assets.find(({ id }) => to.id === id)) return false
  if (to.isHidden) return false
  if (!sameAssets(from, to)) return false
  if (isNative(from)) return true
  if (!isNative(from)) {
    if ('isPseudoNative' in from && from.isPseudoNative && !isNative(to)) return false
    if ('isPseudoNative' in to && to.isPseudoNative) return false
    return true
  }
}
