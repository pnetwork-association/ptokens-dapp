import { useMemo } from 'react'

const useSidebarPtokensAvailable = (_pTokensAvailable, _showHiddenPtokens, _withTestnetInstances) => {
  return useMemo(() => {
    return [
      _pTokensAvailable
        .filter(({ isHidden }) =>
          isHidden === true && _showHiddenPtokens ? true : isHidden === true && !_showHiddenPtokens ? false : true
        )
        .filter(({ network }) => (_withTestnetInstances ? true : network === 'mainnet'))
    ]
  }, [_pTokensAvailable, _showHiddenPtokens, _withTestnetInstances])
}

export { useSidebarPtokensAvailable }
