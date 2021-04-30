import { useMemo } from 'react'

const useProvider = _provider => {
  return useMemo(() => {
    if (!_provider) {
      return {
        isMetaMask: false,
        chainId: null
      }
    }
    return {
      isMetaMask: _provider.isMetaMask,
      chainId: _provider.chainId
    }
  }, [_provider])
}

export { useProvider }
