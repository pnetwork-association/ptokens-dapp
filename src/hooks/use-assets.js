import { useMemo } from 'react'
import { offChainFormat, strip } from '../utils/amount-utils'
import BigNumber from 'bignumber.js'

const useAssets = _assets => {
  return useMemo(() => {
    return [
      _assets.map(_asset => {
        if (_asset.name === 'pLTC') console.log(_asset)
        return {
          ..._asset,
          formattedBalance:
            _asset.balance && _asset.blockchain !== 'EOS'
              ? strip(offChainFormat(_asset.balance, _asset.decimals))
              : _asset.blockchain === 'EOS'
              ? _asset.balance
                ? strip(_asset.balance)
                : '-'
              : '-',
          formattedName:
            _asset.name === 'BTC' || _asset.name === 'EOS' || _asset.name === 'LTC' || _asset.name === 'ETH'
              ? _asset.name
              : `${_asset.name} on ${_asset.blockchain}`
        }
      }).sort((_a, _b) => BigNumber(_a.formattedNumber).isGreaterThan(_b.formattedBalance))
    ]
  }, [_assets])
}

export { useAssets }
