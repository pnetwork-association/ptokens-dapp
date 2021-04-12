import { useMemo } from 'react'
import _ from 'lodash'

const useGroupedAssetsByNativeSymbol = _assets => {
  return useMemo(() => {
    const assetsGroupedByNativeSymbol = _.groupBy(
      Object.values(_assets)
        .map(_asset => ({
          ..._asset,
          formattedName: _asset.formattedName === _asset.nativeSymbol ? 'NATIVE' : _asset.formattedName
        }))
        .sort((_a, _b) => (_a.nativeSymbol > _b.nativeSymbol ? 1 : -1)),
      'nativeSymbol'
    )

    return [assetsGroupedByNativeSymbol]
  }, [_assets])
}

export { useGroupedAssetsByNativeSymbol }
