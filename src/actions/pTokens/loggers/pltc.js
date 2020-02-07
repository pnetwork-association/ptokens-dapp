import * as LogHandler from '../../log'
import {
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED,
  PTOKENS_SET_DEPOSIT_ADDRESS,
  PTOKENS_REDEEM_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED
} from '../../../constants/index'
import settings from '../../../settings'

const pltcLoggedIssue = async (_ptokens, _params, _dispatch) => {
  //[0] should be the value but here there isn't
  let depositAddress = null
  try {
    depositAddress = await _ptokens.pltc.getDepositAddress(_params[1])
  } catch (err) {
    _dispatch({
      type: PTOKENS_ISSUE_NOT_SUCCEDEED,
      payload: {
        error: err.message
      }
    })
    return
  }

  _dispatch({
    type: PTOKENS_SET_DEPOSIT_ADDRESS,
    payload: {
      pToken: {
        depositAddress: {
          value: depositAddress.toString(),
          waiting: false
        }
      }
    }
  })

  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for new deposits...',
      success: false,
      waiting: true,
      id: 'broadcasting-pending'
    })
  )

  depositAddress
    .waitForDeposit()
    .once('onLtcTxBroadcasted', tx => {
      const { txid } = tx

      _dispatch({
        type: PTOKENS_SET_DEPOSIT_ADDRESS,
        payload: {
          pToken: {
            depositAddress: {
              value: depositAddress.toString(),
              waiting: true
            }
          }
        }
      })

      _dispatch(
        LogHandler.updateItem('broadcasting-pending', {
          value: `new LTC deposit detected`,
          success: true,
          link: `${settings.pltc.ltc.explorer}tx/${txid}`,
          id: 'broadcasting-pending'
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
    })
    .once('onLtcTxConfirmed', () => {
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
    .once('onEnclaveBroadcastedTx', tx => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: 'ETH Transaction broadcasted by the enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      const explorer = `${settings.pltc.eth.etherscanLink}tx/${tx}`

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
          id: 'confirmation-final-mint'
        })
      )
    })
    .then(_result => {
      _dispatch(
        LogHandler.updateItem('confirmation-final-mint', {
          value: `ETH transaction confirmed!`,
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
          error: err
        }
      })
    })
}

const pltcLoggedRedeem = (_ptokens, _params, _dispatch) => {
  _dispatch(
    LogHandler.addItem({
      value: `pLTC burn transaction pending...`,
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

  _ptokens.pltc
    .redeem(..._params)
    .once('onEthTxConfirmed', _tx => {
      const explorer = `${settings.pltc.eth.etherscanLink}tx/${_tx.transactionHash}`

      const message = `Burn Transaction confirmed! ${parseFloat(
        _params[0]
      ).toFixed(8)} pLTC Burnt`

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
    .once('onEnclaveBroadcastedTx', tx => {
      _dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: 'Transaction broadcasted by the enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      const explorer = `${settings.pltc.ltc.explorer}tx/${tx}`

      _dispatch(
        LogHandler.addItem({
          value: `LTC transaction pending...`,
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
    .then(result => {
      _dispatch(
        LogHandler.updateItem('confirmation-final-burn', {
          value: 'LTC transaction confirmed!',
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

export { pltcLoggedIssue, pltcLoggedRedeem }
