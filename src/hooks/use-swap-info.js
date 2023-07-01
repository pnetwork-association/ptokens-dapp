import { networkIdToTypeMap, BlockchainType } from 'ptokens-constants'
import { useMemo } from 'react'

import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFormattedFees } from '../utils/fee'

const useSwapInfo = ({ from, to, amount, bpm, fees }) => {
  return useMemo(() => {
    function getEta() {
      let fromAsset = from
      // ATM, the API returns untrustworthy estimates for EOS-like chains.
      // For those chains, assume the sync ETA is 0 if the BPM is > 0
      // as EOS-like chains are usually very fast.
      const eosLikeChainIds = [...networkIdToTypeMap]
        .filter(([_k, _v]) => _v === BlockchainType.EOSIO)
        .map(([_id]) => _id)
      if (!fromAsset.isNative) {
        const selectedBpm = Object.values(bpm).find(
          (_el) =>
            _el.bridgeName.includes(`${fromAsset.symbol.toLowerCase()}-on-`) && _el.hostChainId === fromAsset.chainId
        )
        return selectedBpm
          ? eosLikeChainIds.includes(fromAsset.chainId)
            ? selectedBpm.bpmMedianHost > 0
              ? 0
              : -1
            : selectedBpm.estimatedHostSyncTime
          : -2
      } else {
        const selectedBpm = Object.values(bpm).find(
          (_el) =>
            _el.bridgeName.includes(`${fromAsset.symbol.toLowerCase()}-on-`) && _el.nativeChainId === fromAsset.chainId
        )
        return selectedBpm
          ? eosLikeChainIds.includes(fromAsset.chainId)
            ? selectedBpm.bpmMedianNative > 0
              ? 0
              : -1
            : selectedBpm.estimatedNativeSyncTime
          : -2
      }
    }

    if (!from || !to) {
      return {
        formattedFee: null,
        feeDescription: null,
        estimatedSwapTime: `-`,
        show: false,
        eta: null,
      }
    }

    const eta = getEta()
    const estimatedSwapTime = getPeginOrPegoutMinutesEstimationByBlockchainAndEta(from.blockchain, eta)

    if (from.isNative && !to.isNative) {
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
        eta,
      }
    } else if (!from.isNative) {
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
        eta,
      }
    }

    // NOTE: it should never happen
    return {
      formattedFee: null,
      feeDescription: null,
      estimatedSwapTime: `-`,
      show: false,
    }
  }, [from, to, amount, bpm, fees])
}

export { useSwapInfo }
