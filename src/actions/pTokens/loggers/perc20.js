import * as LogHandler from '../../log'
import {
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED,
  PTOKENS_REDEEM_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED
} from '../../../constants/index'
import settings from '../../../settings'

const perc20LoggedIssue = async (_ptokens, _params, _pToken, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'mint-confirmation'
    })
  )

  _ptokens[_pToken.name === 'pETH' ? 'pweth' : _pToken.name.toLowerCase()]
    .issue(..._params)
    .once('nativeTxConfirmed', () => {
      _dispatch(
        LogHandler.updateItem('mint-confirmation', {
          value: `Minting transaction confirmed`,
          success: true,
          link: null, //explorer,
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
    .once('onNodeReceivedTx', () => {
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
    .once('onNodeBroadcastedTx', report => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: `${_pToken.redeemFrom} Transaction broadcasted by the enclave!`,
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )
      // prettier-ignore
      const explorer = `${settings[_pToken.id][_pToken.redeemFrom.toLowerCase()].explorer}tx/${report.broadcast_tx_hash}`

      _dispatch(
        LogHandler.addItem({
          value: `${_pToken.redeemFrom} transaction pending...`,
          success: true,
          link: explorer,
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
      _dispatch(
        LogHandler.updateItem('confirmation-final-mint', {
          value: `${_pToken.redeemFrom} transaction confirmed!`,
          success: true,
          waiting: false,
          link: null
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
          error: message
        }
      })
    })
}

const hostTransactionId = {
  eos: 'transaction_id'
}

const perc20LoggedRedeem = (_ptokens, _params, _pToken, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'burn-confirmation'
    })
  )

  _ptokens[_pToken.name === 'pETH' ? 'pweth' : _pToken.name.toLowerCase()]
    .redeem(..._params)
    .once('hostTxConfirmed', _tx => {
      // prettier-ignore
      const explorer = `${settings[_pToken.id][_pToken.redeemFrom.toLowerCase()].explorer}tx/${_tx[hostTransactionId[_pToken.redeemFrom.toLowerCase()]]}`
      // prettier-ignore
      const message = `Burn Transaction confirmed! ${parseFloat(_params[0]).toFixed(18)} ${_pToken.name} Burnt`

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
    .once('onNodeReceivedTx', () => {
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
    .once('onNodeBroadcastedTx', report => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: 'Transaction broadcasted by the enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      // prettier-ignore
      const explorer = `${settings[_pToken.id].eth.explorer}tx/${report.broadcast_tx_hash}`

      _dispatch(
        LogHandler.addItem({
          value: `ETH transaction pending...`,
          success: true,
          link: explorer,
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
    .once('nativeTxConfirmed', () => {
      _dispatch(
        LogHandler.updateItem('confirmation-final-burn', {
          value: 'ETH transaction confirmed!',
          success: true,
          waiting: false,
          link: null
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

export { perc20LoggedIssue, perc20LoggedRedeem }
