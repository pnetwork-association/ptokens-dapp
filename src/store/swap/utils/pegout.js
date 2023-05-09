import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'

const pegout = async ({ swap, ptokenFrom, ptokenTo, dispatch }) => {
  let link
  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false,
    })
  )

  // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
  await swap
    .execute()
    .once('inputTxBroadcasted', (_hash) => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false,
        })
      )
    })
    .once('inputTxConfirmed', (_tx) => {
      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false,
        })
      )
    })
    .once('inputTxDetected', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 60,
          message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false,
        })
      )
    })
    .once('outputTxBroadcasted', (_outputs) => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _outputs[0].txHash)
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false,
        })
      )
    })
    .then((_) => {
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true,
        })
      )

      dispatch(updateSwapButton('Swap'))
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
    })
    .catch((_err) => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegout, try again!',
            showMoreText: _err.message ? _err.message : _err,
            showMoreLabel: 'Show Details',
            icon: 'cancel',
          })
        )
      }
      dispatch(updateSwapButton('Swap'))
      dispatch(resetProgress())
    })
}

export default pegout
