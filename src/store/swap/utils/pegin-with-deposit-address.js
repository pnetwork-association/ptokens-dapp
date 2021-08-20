import {
  showDepositAddressModal,
  hideDepositAddressModal,
  updateProgress,
  loadBalanceByAssetId,
  resetProgress,
  updateSwapButton
} from '../swap.actions'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import { updateInfoModal } from '../../pages/pages.actions'

let promiEvent = null

const peginWithDepositAddress = async ({ ptokens, address, ptoken, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  let depositAddress = null
  try {
    depositAddress = await ptokens[ptoken.workingName].getDepositAddress(address)
  } catch (_err) {
    console.error(_err)
    dispatch(updateSwapButton('Get Deposit Address'))
    dispatch(
      updateInfoModal({
        show: true,
        text: 'Error during pegin, try again!',
        showMoreText: _err.message ? _err.message : _err,
        icon: 'cancel'
      })
    )
    dispatch(resetProgress())
    return
  }

  dispatch(updateSwapButton('Swapping ...', true))

  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for a deposit ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  dispatch(showDepositAddressModal(ptoken, depositAddress.toString()))

  let link = null
  promiEvent = depositAddress.waitForDeposit()
  promiEvent
    .once('nativeTxBroadcasted', _tx => {
      const nativeTransactionField = {
        btc: 'txid',
        ltc: 'txid',
        doge: 'tx_hash'
      }

      dispatch(hideDepositAddressModal())

      // prettier-ignore
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_tx[nativeTransactionField[ptoken.nativeBlockchain.toLowerCase()]]}`
      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: `<a href="${link}" target="_blank">Deposit</a> detected! Waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nativeTxConfirmed', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeReceivedTx', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 60,
          message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeBroadcastedTx', _report => {
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_report.broadcast_tx_hash}`
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
    .then(_result => {
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true
        })
      )

      dispatch(updateSwapButton('Get Deposit Address'))
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      console.error(_err)
      dispatch(updateSwapButton('Get Deposit Address'))
      dispatch(hideDepositAddressModal())
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during pegin, try again!',
          showMoreText: _err.message ? _err.message : _err,
          icon: 'cancel'
        })
      )
      dispatch(resetProgress())
    })
}

export default peginWithDepositAddress
