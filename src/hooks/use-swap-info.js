import { useMemo } from 'react'
import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFormattedFees } from '../utils/fee'
import { getAssetById } from '../store/swap/swap.selectors'
import { chainIdToTypeMap, BlockchainType } from 'ptokens-constants'

const useSwapInfo = ({ from, to, amount, bpm, swappersBalances, fees }) => {
  return useMemo(() => {
    function getEta() {
      let fromAsset = from
      if (from.requiresCurve) {
        fromAsset = getAssetById(from.PTokenId)
      }
      // ATM, the API returns untrustworthy estimates for EOS-like chains.
      // For those chains, assume the sync ETA is 0 if the BPM is > 0
      // as EOS-like chains are usually very fast.
      const eosLikeChainIds = [...chainIdToTypeMap]
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
      const amounts = { ...swappersBalances }
      const poolAmount =
        to.isPseudoNative && amounts[to.swapperAddress]
          ? amounts[to.swapperAddress][to.address] / 10 ** to.decimals
          : undefined
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
        eta,
        poolAmount,
      }
    } else if (!from.isNative) {
      const amounts = { ...swappersBalances }
      const requiresCurve = from.requiresCurve
      const poolAmount =
        from.isPseudoNative && amounts[from.swapperAddress]
          ? amounts[from.swapperAddress][from.ptokenAddress] / 10 ** from.decimals
          : undefined
      return {
        formattedFee: getFormattedFees(fees, amount, to.symbol),
        estimatedSwapTime,
        show: true,
        eta,
        poolAmount,
        requiresCurve,
      }
    }

    // NOTE: it should never happen
    return {
      formattedFee: null,
      feeDescription: null,
      estimatedSwapTime: `-`,
      show: false,
    }
  }, [from, to, amount, bpm, swappersBalances, fees])
}

export { useSwapInfo }
