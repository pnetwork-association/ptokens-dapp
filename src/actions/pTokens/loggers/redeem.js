import * as LogHandler from '../../log'
import {
  PTOKENS_REDEEM_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED
} from '../../../constants/index'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'

const hostTransactionHash = {
  eos: 'transaction_id',
  eth: 'transactionHash'
}

const loggedRedeem = (_ptokens, _params, _pToken, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'burn-confirmation'
    })
  )

  _ptokens[_pToken.name.toLowerCase()]
    .redeem(..._params)
    .once('hostTxConfirmed', _tx => {
      // prettier-ignore
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'redeemer')}${_tx[hostTransactionHash[_pToken.redeemFrom.toLowerCase()]]}`
      // prettier-ignore
      const message = `Burn Transaction confirmed! ${parseFloat(_params[0]).toFixed(_pToken.realDecimals)} ${_pToken.name} Burnt`

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
    .once('nodeReceivedTx', () => {
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
    .once('nodeBroadcastedTx', report => {
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
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'issuer')}${report.broadcast_tx_hash}`

      _dispatch(
        LogHandler.addItem({
          value: `${_pToken.issueFrom.toUpperCase()} transaction pending...`,
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
          value: `${_pToken.issueFrom.toUpperCase()} transaction confirmed!`,
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

export default loggedRedeem
