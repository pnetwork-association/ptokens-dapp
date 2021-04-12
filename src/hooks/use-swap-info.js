import { useMemo } from 'react'
import { getPeginOrPegoutMinutesEstimation } from '../utils/estimations'

const useSwapInfo = (_from, _to) => {
  return useMemo(() => {
    if (!_from || !_to) {
      return {
        fee: 1,
        formattedFee: '-',
        estimatedSwapTime: `-`,
        show: false
      }
    }

    // NOTE: fee hardcoded at the moment
    if (!_from.isPtoken && _to.isPtoken) {
      return {
        fee: 1 - 0.0025,
        formattedFee: '0.25%',
        estimatedSwapTime: `${getPeginOrPegoutMinutesEstimation(_to.nativeBlockchain, _to.blockchain)} minutes`,
        show: true
      }
    } else if (_from.isPtoken && !_to.isPtoken) {
      return {
        fee: 1 - 0.005,
        formattedFee: '0.5%',
        estimatedSwapTime: `${getPeginOrPegoutMinutesEstimation(_from.nativeBlockchain, _from.blockchain)} minutes`,
        show: true
      }
    }
  }, [_from, _to])
}

export { useSwapInfo }
