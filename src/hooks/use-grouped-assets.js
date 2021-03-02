import { useMemo } from 'react'
import _ from 'lodash'

const useGroupedAssets = _assets => {
  return useMemo(() => {
    const assetsGroupedByNativeSymbol = _.groupBy(
      Object.values(_assets).sort((_a, _b) => (_a.nativeSymbol > _b.nativeSymbol ? 1 : -1)),
      'nativeSymbol'
    )

    return [assetsGroupedByNativeSymbol]
  }, [_assets])
}

export { useGroupedAssets }
