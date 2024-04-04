import { sendEvent } from '../../../ga4'
import { parseError } from '../../../utils/errors'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { approveTransaction, getBigNumber } from '../../evm-approve'
import { updateInfoModal } from '../../pages/pages.actions'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateMigrateButton } from '../migration.actions'

const migrationPegin = async ({ swap, ptokenFrom, ptokenTo, web3, dispatch }) => {
  let link

  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the approve ...',
      steps: [0, 17, 34, 50, 67, 84, 100],
      terminated: false,
    })
  )

  try {
    const _amount = getBigNumber(swap.amount, ptokenTo.nativeDecimals)
    const approve_hash = await approveTransaction(
      swap.sourceAsset.vaultAddress,
      swap.sourceAsset.tokenAddress,
      _amount,
      web3
    )
    link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, approve_hash)
  } catch (_err) {
    dispatch(
      updateInfoModal({
        show: true,
        text: 'Error during pegin, try again!',
        showMoreText: _err.message ? _err.message : _err,
        showMoreLabel: 'Show Details',
        icon: 'cancel',
      })
    )
    dispatch(updateMigrateButton('Migrate'))
    dispatch(resetProgress())
    console.error(_err)
    return
  }

  dispatch(
    updateProgress({
      show: true,
      percent: 17,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 17, 34, 50, 67, 84, 100],
      terminated: false,
    })
  )

  await swap
    .execute()
    .once('inputTxBroadcasted', (_hash) => {
      sendEvent('swap_confirmed_by_user', {
        operation: 'pegin-with-wallet',
        asset_from: ptokenFrom.id,
        asset_to: ptokenTo.id,
      })
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
      dispatch(
        updateProgress({
          show: true,
          percent: 34,
          message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
          steps: [0, 17, 34, 50, 67, 84, 100],
          terminated: false,
        })
      )
    })
    .once('inputTxConfirmed', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 50,
          message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
          steps: [0, 17, 34, 50, 67, 84, 100],
          terminated: false,
        })
      )
    })
    .once('inputTxDetected', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 67,
          message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
          steps: [0, 17, 34, 50, 67, 84, 100],
          terminated: false,
        })
      )
    })
    .once('outputTxBroadcasted', (_outputs) => {
      sendEvent('swap_processed', {
        operation: 'pegin-with-wallet',
        asset_from: ptokenFrom.id,
        asset_to: ptokenTo.id,
      })
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _outputs[0].txHash)
      dispatch(
        updateProgress({
          show: true,
          percent: 84,
          message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
          steps: [0, 17, 34, 50, 67, 84, 100],
          terminated: false,
        })
      )
    })
    .then((_) => {
      sendEvent('assets_delivered_tx_confirmed', {
        operation: 'pegin-with-wallet',
        asset_from: ptokenFrom.id,
        asset_to: ptokenTo.id,
      })
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
          steps: [0, 17, 34, 50, 67, 84, 100],
          terminated: true,
        })
      )

      dispatch(updateMigrateButton('Migrate'))
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
    })
    .catch((_err) => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
            showMoreText: _err.message ? _err.message : _err,
            showMoreLabel: 'Show Details',
            icon: 'cancel',
          })
        )
      }
      dispatch(updateMigrateButton('Migrate'))
      dispatch(resetProgress())
    })
}

export default migrationPegin
