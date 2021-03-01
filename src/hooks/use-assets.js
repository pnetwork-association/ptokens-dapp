import { useMemo } from 'react'
import { offChainFormat, strip } from '../utils/amount-utils'

const useAssets = _assets => {
  return useMemo(() => {
    return [
      _assets.map(_asset => {
        return {
          ..._asset,
          formattedBalance: _asset.balance ? strip(offChainFormat(_asset.balance, _asset.decimals)) : '-',
          formattedName:
            _asset.name === 'BTC' || _asset.name === 'EOS' || _asset.name === 'LTC' || _asset.name === 'ETH'
              ? _asset.name
              : `${_asset.name} on ${_asset.blockchain}`
        }
      })
    ]
  }, [_assets])
}

export { useAssets }
