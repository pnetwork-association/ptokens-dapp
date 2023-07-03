import { useMemo } from 'react'

import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFormattedFees } from '../utils/fee'

const useSwapInfo = ({ from, to, amount, fees, bpm }) => {
  return useMemo(() => {
    if (!from || !to) {
      return {
        formattedFee: null,
        feeDescription: null,
        estimatedSwapTime: `-`,
        show: false,
        eta: null,
      }
    }

    const estimatedSwapTime = getPeginOrPegoutMinutesEstimationByBlockchainAndEta(to.blockchain, bpm)

    if (from.isNative && !to.isNative) {
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
      }
    } else if (!from.isNative) {
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
      }
    }

    // NOTE: it should never happen
    return {
      formattedFee: null,
      feeDescription: null,
      estimatedSwapTime: `-`,
      show: false,
    }
  }, [from, to, amount, fees, bpm])
}

export { useSwapInfo }
