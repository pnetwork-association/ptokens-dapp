import {
  showDepositAddressModal,
  hideDepositAddressModal,
  updateProgress,
  loadBalanceByAssetId,
  resetProgress,
  updateSwapButton,
} from '../swap.actions'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { updateInfoModal } from '../../pages/pages.actions'
// import ReactGA from 'react-ga4'

const peginWithDepositAddress = async ({ swap, ptokenFrom, ptokenTo, dispatch }) => {
  let link = null
  let depositAddress = null
  try {
    await swap
      .execute()
      .on('depositAddress', (_address) => {
        depositAddress = _address

        dispatch(updateSwapButton('Swapping ...', true))

        dispatch(
          updateProgress({
            show: true,
            percent: 0,
            message: 'Waiting for a deposit ...',
            steps: [0, 20, 40, 60, 80, 100],
            terminated: false,
          })
        )

        dispatch(showDepositAddressModal(ptokenTo, depositAddress.toString()))
      })
      .once('inputTxBroadcasted', (_tx) => {
        // ReactGA.event('swap_confirmed_by_user', {
        //   operation: 'pegin-with-deposit',
        //   asset_from: ptokenFrom.id,
        //   asset_to: ptokenTo.id
        // })

        dispatch(hideDepositAddressModal())

        // prettier-ignore
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _tx)
        dispatch(
          updateProgress({
            show: true,
            percent: 20,
            message: `<a href="${link}" target="_blank">Deposit</a> detected! Waiting for confirmation ...`,
            steps: [0, 20, 40, 60, 80, 100],
            terminated: false,
          })
        )
      })
      .once('inputTxConfirmed', () => {
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
        // ReactGA.event('swap_processed', {
        //   operation: 'pegin-with-deposit',
        //   asset_from: ptokenFrom.id,
        //   asset_to: ptokenTo.id
        // })
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _outputs[0].txHash)
        // prettier-ignore
        dispatch(
            updateProgress({
              show: true,
              percent: 80,
              message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
              steps: [0, 20, 40, 60, 80, 100],
              terminated: false
            })
          )
      })
      .then((_) => {
        // ReactGA.event('assets_delivered_tx_confirmed', {
        //   operation: 'pegin-with-deposit',
        //   asset_from: ptokenFrom.id,
        //   asset_to: ptokenTo.id
        // })
        dispatch(
          updateProgress({
            show: true,
            percent: 100,
            message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
            steps: [0, 20, 40, 60, 80, 100],
            terminated: true,
          })
        )

        dispatch(updateSwapButton('Get Deposit Address'))
        setTimeout(() => dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
      })
  } catch (_err) {
    console.error(_err)
    dispatch(updateSwapButton('Get Deposit Address'))
    dispatch(hideDepositAddressModal())
    dispatch(
      updateInfoModal({
        show: true,
        text: 'Error during pegin, try again!',
        showMoreText: _err.message ? _err.message : _err,
        showMoreLabel: 'Show Details',
        icon: 'cancel',
      })
    )
    dispatch(resetProgress())
  }
}

export default peginWithDepositAddress
