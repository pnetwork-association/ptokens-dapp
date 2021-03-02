import { useMemo } from 'react'

const useSwap = (_assets, _from, _to) => {
  return useMemo(() => {
    console.log(_from)

    return {
      fromAssets: []
    }
  }, [_assets, _from, _to])
}

export { useSwap }
