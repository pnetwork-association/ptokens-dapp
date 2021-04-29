import { useMemo } from 'react'

const useProvider = _provider => {
  return useMemo(() => {
    if (!_provider) {
      return {
        isMetamask: false,
        chainId: null
      }
    }
    return {
      isMetamask: _provider.isMetamask,
      chainId: _provider.chainId
    }
  }, [_provider])
}

export { useProvider }
