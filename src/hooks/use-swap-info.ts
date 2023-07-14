import { useMemo } from 'react'

import { UpdatedAsset } from '../settings/swap-assets'
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
    return {
      formattedFee: fees ? getFormattedFees(fees, amount, to.symbol) : null,
      estimatedSwapTime,
      show: true,
    }
  }, [from, to, amount, fees, bpm])
}

export { useSwapInfo }
