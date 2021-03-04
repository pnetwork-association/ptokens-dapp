import {
  showDepositAddressModal,
  hideDepositAddressModal,
  updateProgress,
  loadBalanceByAssetId,
  resetProgress
} from './index'
import { toastr } from 'react-redux-toastr'
import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'

const peginWithDepositAddress = async ({ ptokens, address, ptoken, dispatch }) => {
  let depositAddress = null
  try {
    depositAddress = await ptokens[ptoken.name.toLowerCase()].getDepositAddress(address)
  } catch (_err) {
    console.log(_err)
    dispatch(resetProgress())
    return
  }

  let step = 0
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

  depositAddress
    .waitForDeposit()
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
              _tx[nativeTransactionField[ptoken.blockchain.toLowerCase()]]
            }`,
            '_blank'
          )
      })

      step = step + 1
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
      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: 'Transaction Confirmed! Waiting for the enclave to receive the transaction ...',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeReceivedTx', () => {
      step = step + 1
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

      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: 'Enclave broadcasted the transaction, Waiting for the confirmation ...',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .then(_result => {
      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: 'Transaction Confirmed.',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true
        })
      )

      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      dispatch(hideDepositAddressModal())
      // TODO
    })
}

export default peginWithDepositAddress
