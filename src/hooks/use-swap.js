import { useMemo } from 'react'

const useSwap = (_assets, _from, _to) => {
  return useMemo(() => {
    let fromAssets = []
    if (!_from && _to) {
      if (_to.isPtoken) {
        fromAssets = _assets.filter(({ isPtoken }) => !isPtoken)
      }
    }

    if ((_from && _to) || (!_from && !_to)) fromAssets = _assets

    return {
      fromAssets
    }
  }, [_assets, _from, _to])
}

export { useSwap }
