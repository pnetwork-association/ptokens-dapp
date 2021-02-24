import * as LogHandler from '../../log'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import BigNumber from 'bignumber.js'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PDOGE_ON_ETH_MAINNET,
  PTOKENS_REDEEM_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED,
  PEOS_ON_ETH_MAINNET
} from '../../../constants'

const hostTransactionHash = {
  telos: 'transaction_id',
  eos: 'transaction_id',
  eth: 'transactionHash'
}

const loggedRedeem = async (_ptokens, _params, _pToken, _dispatch) => {
  // NOTE: avoids brave metamask gas estimation fails
  _params[_params.length] = { gas: 80000, blocksBehind: 3, expireSeconds: 60, permission: 'active' }

  const burnedAmount = new BigNumber(_params[0])
  let withBroadcast = false
  if (
    _pToken.id === PBTC_ON_ETH_MAINNET ||
    _pToken.id === PBTC_ON_ETH_TESTNET ||
    _pToken.id === PLTC_ON_ETH_MAINNET ||
    _pToken.id === PLTC_ON_ETH_TESTNET ||
    _pToken.id === PDOGE_ON_ETH_MAINNET ||
    _pToken.id === PEOS_ON_ETH_MAINNET
  ) {
    _params[0] = BigNumber(_params[0])
      .multipliedBy(10 ** _pToken.contractDecimals)
      .toFixed()
    withBroadcast = true

    _dispatch(
      LogHandler.addItem({
        value: 'Waiting for broadcasting...',
        success: false,
        waiting: true,
        id: 'burn-broadcasting'
      })
    )
  } else {
    _dispatch(
      LogHandler.addItem({
        value: 'Waiting for confirmation...',
        success: false,
        waiting: true,
        id: 'burn-confirmation'
      })
    )
  }

  _ptokens[_pToken.name.toLowerCase()]
    .redeem(..._params)
    .once('hostTxBroadcasted', _tx => {
      // prettier-ignore
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'redeemer')}${_tx}`
      _dispatch(
        LogHandler.updateItem('burn-broadcasting', {
          value: `Burn transaction broadcasted!`,
          success: true,
          link: explorer,
          id: 'burn-broadcasting'
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
    })
    .once('hostTxConfirmed', _tx => {
      // prettier-ignore
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'redeemer')}${_tx[hostTransactionHash[_pToken.redeemFrom.toLowerCase()]]}`
      // prettier-ignore
      const message = `Burn Transaction confirmed! ${BigNumber(burnedAmount).toFixed()} ${_pToken.name} Burnt`

      _dispatch(
        LogHandler.updateItem('burn-confirmation', {
          value: message,
          success: true,
          waiting: false,
          link: withBroadcast ? null : explorer
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
