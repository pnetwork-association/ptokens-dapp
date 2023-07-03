import { useMemo } from 'react'

const useProvider = (_provider): { isMetaMask: true, chainId: string} => {
  return useMemo(() => {
    if (!_provider) {
      return {
        isMetaMask: false,
        chainId: null,
      }
    }
    return {
      isMetaMask: _provider.isMetaMask,
      chainId: _provider.chainId,
    }
  }, [_provider])
}

export { useProvider }
