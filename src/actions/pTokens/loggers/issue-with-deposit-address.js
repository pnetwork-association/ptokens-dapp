import * as LogHandler from '../../log'
import {
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED,
  PTOKENS_SET_DEPOSIT_ADDRESS
} from '../../../constants/index'
import { getBalance } from '../index'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import store from '../../../store'

const loggedIssueWithDepositAddress = async (_ptokens, _params, _pToken, _dispatch) => {
  //[0] should be the value but here there isn't
  let depositAddress = null

  try {
    // prettier-ignore
    depositAddress = await _ptokens[_pToken.name.toLowerCase()].getDepositAddress(_params[1])
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
    .once('nativeTxBroadcasted', tx => {
      const nativeTransactionField = {
        btc: 'txid',
        ltc: 'txid',
        doge: 'tx_hash'
      }

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
          value: `new ${_pToken.issueFrom.toUpperCase()} deposit detected`,
          success: true,
          link: `${getCorrespondingBaseTxExplorerLink(_pToken, 'issuer')}${
            tx[nativeTransactionField[_pToken.issueFrom.toLowerCase()]]
          }`,
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
    .once('nodeReceivedTx', () => {
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
    .once('nodeBroadcastedTx', report => {
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
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'redeemer')}${report.broadcast_tx_hash}`

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

      setTimeout(() => {
        const {
          wallets: { redeemerAccount }
        } = store.getState()
        _dispatch(getBalance(redeemerAccount))
      }, 5000)

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

export default loggedIssueWithDepositAddress
