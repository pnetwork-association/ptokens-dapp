import { useMemo } from 'react'

import { UpdatedAsset, isNative } from '../settings/swap-assets'
import { IBpm } from '../store/swap/swap.reducer'
import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { Fees, getFormattedFees } from '../utils/fee'

type useSwapInfoArg = {
  from: UpdatedAsset | null
  to: UpdatedAsset | null
  amount: string
  fees: Fees | null
  bpm: IBpm
}

const useSwapInfo = ({ from, to, amount, fees, bpm }: useSwapInfoArg) => {
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

    if (isNative(from) && !isNative(to)) {
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
      }
    } else if (!isNative(from)) {
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
