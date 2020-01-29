import * as LogHandler from '../../log'
import {
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED,
  PTOKENS_REDEEM_NOT_SUCCEDEED
} from '../../../constants/index'
import settings from '../../../settings'

const peosLoggedIssue = (_ptokens, _params, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: 'pEOS mint transaction pending...',
      success: true,
      waiting: false,
      id: 'mint-pending'
    })
  )

  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'mint-confirmation'
    })
  )

  _ptokens.peos
    .issue(..._params)
    .once('onEosTxConfirmed', _tx => {
      const amount = parseFloat(
        _tx.processed.action_traces[0].act.data.quantity
      ).toFixed(4)
      const explorer = `${settings.peos.eos.explorer}transaction/${_tx.transaction_id}`

      _dispatch(
        LogHandler.updateItem('mint-confirmation', {
          value: `Mint transaction confirmed! ${amount} EOS Sent`,
          success: true,
          link: explorer,
          id: 'mint-confirmation'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for enclave to witness mint event ...',
          success: false,
          waiting: true,
          link: null,
          id: 'id-witness-mint-event'
        })
      )
    })
    .once('onEnclaveReceivedTx', () => {
      _dispatch(
        LogHandler.updateItem('id-witness-mint-event', {
          value: 'Mint event witnessed by enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'id-witness-mint-event'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Enclave is broadcasting transaction...',
          success: false,
          waiting: true,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )
    })
    .once('onEnclaveBroadcastedTx', () => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: 'Transaction broadcasted by the enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: `ETH transaction pending...`,
          success: true,
          link: null,
          id: 'transaction-final-pending'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for confirmation',
          success: false,
          waiting: true,
          link: null,
          id: 'confirmation-final-mint'
        })
      )
    })
    .then(_result => {
      const explorer = `${settings.peos.eth.etherscanLink}tx/${_result.tx}`

      _dispatch(
        LogHandler.updateItem('confirmation-final-mint', {
          value: `ETH transaction confirmed!`,
          success: true,
          waiting: false,
          link: explorer
        })
      )

      _dispatch({
        type: PTOKENS_ISSUE_SUCCEDEED
      })
    })
    .catch(err => {
      const { message } = err

      _dispatch(LogHandler.clearWaitingItem())
      _dispatch(
        LogHandler.addItem({
          value: message,
          success: false
        })
      )

      _dispatch({
        type: PTOKENS_ISSUE_NOT_SUCCEDEED,
        payload: {
          error: err
        }
      })
    })
}

const peosLoggedRedeem = (_ptokens, _params, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: `pEOS burn transaction pending...`,
      success: true,
      waiting: false,
      id: 'burn-pending'
    })
  )

  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'burn-confirmation'
    })
  )

  _ptokens.peos
    .redeem(..._params)
    .once('onEthTxConfirmed', _tx => {
      const explorer = `${settings.peos.eth.etherscanLink}tx/${_tx.transactionHash}`

      const message = `Burn Transaction confirmed! ${parseFloat(
        _params[0]
      ).toFixed(4)} pEOS Burnt`

      _dispatch(
        LogHandler.updateItem('burn-confirmation', {
          value: message,
          success: true,
          waiting: false,
          link: explorer
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for enclave to witness burn event ...',
          success: false,
          waiting: true,
          link: null,
          id: 'id-witness-burn-event'
        })
      )
    })
    .once('onEnclaveReceivedTx', () => {
      _dispatch(
        LogHandler.updateItem('id-witness-burn-event', {
          value: 'Burn event witnessed by enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'id-witness-burn-event'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Enclave is broadcasting transaction...',
          success: false,
          waiting: true,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )
    })
    .once('onEnclaveBroadcastedTx', () => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: 'Transaction broadcasted by the enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: `EOS transaction pending...`,
          success: true,
          link: null,
          id: 'transaction-final-pending'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for confirmation',
          success: false,
          waiting: true,
          link: null,
          id: 'confirmation-final-burn'
        })
      )
    })
    .then(result => {
      const explorer = `${settings.peos.eos.explorer}tx/${result.tx}`

      _dispatch(
        LogHandler.updateItem('confirmation-final-burn', {
          value: 'EOS transaction confirmed!',
          success: true,
          waiting: false,
          link: explorer
        })
      )

      _dispatch({
        type: PTOKENS_REDEEM_SUCCEDEED
      })
    })
    .catch(err => {
      const { message } = err

      _dispatch(LogHandler.clearWaitingItem())
      _dispatch(
        LogHandler.addItem({
          value: message,
          success: false
        })
      )

      _dispatch({
        type: PTOKENS_REDEEM_NOT_SUCCEDEED,
        payload: {
          error: message
        }
      })
    })
}

export { peosLoggedIssue, peosLoggedRedeem }
