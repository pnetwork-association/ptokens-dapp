import {
  showDepositAddressModal,
  hideDepositAddressModal,
  updateProgress,
  loadBalanceByAssetId,
  resetProgress,
  updateSwapButton
} from '../swap.actions'
import { toastr } from 'react-redux-toastr'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'

let promiEvent = null

const peginWithDepositAddress = async ({ ptokens, address, ptoken, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  let depositAddress = null
  try {
    depositAddress = await ptokens[ptoken.workingName].getDepositAddress(address)
  } catch (_err) {
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

  promiEvent = depositAddress.waitForDeposit()
  promiEvent
    .once('nativeTxBroadcasted', _tx => {
      const nativeTransactionField = {
        btc: 'txid',
        ltc: 'txid',
        doge: 'tx_hash'
      }

      dispatch(hideDepositAddressModal())

      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () =>
          window.open(
            `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${
              _tx[nativeTransactionField[ptoken.nativeBlockchain.toLowerCase()]]
            }`,
            '_blank'
          )
      })

      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: 'Deposit detected! Waiting for confirmation ...',
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
          message: 'Waiting for the pNetwork to detect your transaction ...',
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
          message: 'Enclave received the transaction, broadcasting ...',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeBroadcastedTx', _report => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () =>
          window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_report.broadcast_tx_hash}`, '_blank')
      })

      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: 'Asset swap transaction completed, waiting for confirmation ...',
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
          message: 'Transaction Confirmed.',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true
        })
      )

      dispatch(updateSwapButton('Get Deposit Address'))
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      dispatch(updateSwapButton('Get Deposit Address'))
      dispatch(hideDepositAddressModal())
      dispatch(resetProgress())
    })
}

export default peginWithDepositAddress
