import { sendEvent } from '../../../ga4'
import { parseError } from '../../../utils/errors'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { updateInfoModal } from '../../pages/pages.actions'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'

const pegout = async ({ swap, ptokenFrom, ptokenTo, dispatch }) => {
  let link
  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 50, 100],
      terminated: false,
    })
  )

  // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
  await swap
    .execute()
    .once('inputTxBroadcasted', (_hash) => {
      sendEvent('swap_confirmed_by_user', { operation: 'pegout', asset_from: ptokenFrom.id, asset_to: ptokenTo.id })
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
      dispatch(
        updateProgress({
          show: true,
          percent: 50,
          message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
          steps: [0, 50, 100],
          terminated: false,
        })
      )
    })
    .once('inputTxConfirmed', (_tx) => {
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `Wait for <a href="${link}" target="_blank">transaction</a> to be processed. Please be patient as completion times for redeems are uncertain and may take several days.`,
          steps: [0, 50, 100],
          terminated: false,
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
            text: _err.message.includes('transaction underpriced')
              ? "You transaction wasn't accepted by the network as underpriced. Please try again increasing the gasprice from your wallet before signing."
              : 'Error during pegout, try again!',
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
