import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { toastr } from 'react-redux-toastr'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'

const hostTransactionHash = {
  telos: 'transaction_id',
  eos: 'transaction_id',
  eth: 'transactionHash'
}

let promiEvent = null

const pegout = async ({ ptokens, params, ptoken, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = { gas: 80000, blocksBehind: 3, expireSeconds: 60, permission: 'active' }

  if (ptoken.withAmountConversionPegout) {
    params[0] = BigNumber(params[0])
      .multipliedBy(10 ** ptoken.decimals)
      .toFixed()
  }

  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
  promiEvent = ptokens[ptoken.workingName].redeem(...params)
  promiEvent
    .once('hostTxBroadcasted', _hash => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () => window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_hash}`, '_blank')
      })

      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: 'Transaction broadcasted! Waiting for confirmation ...',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('hostTxConfirmed', _tx => {
      if (ptoken.blockchain === 'EOS' || ptoken.blockchain === 'TELOS') {
        toastr.success('Transaction broadcasted!', 'Click here to see it', {
          timeOut: 0,
          onToastrClick: () =>
            window.open(
              `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${
                _tx[hostTransactionHash[ptoken.blockchain.toLowerCase()]]
              }`,
              '_blank'
            )
        })

        dispatch(
          updateProgress({
            show: true,
            percent: 20,
            message: 'Transaction broadcasted! Waiting for confirmation ...',
            steps: [0, 20, 40, 60, 80, 100],
            terminated: false
          })
        )
      }

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
          window.open(
            `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_report.broadcast_tx_hash}`,
            '_blank'
          )
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
    .once('nativeTxConfirmed', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: 'Transaction Confirmed.',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true
        })
      )

      dispatch(updateSwapButton('Swap'))
      // TODO: load balance also for native asset
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegout, try again!',
            icon: 'cancel'
          })
        )
      }
      dispatch(updateSwapButton('Swap'))
      dispatch(resetProgress())
    })
}

export default pegout
