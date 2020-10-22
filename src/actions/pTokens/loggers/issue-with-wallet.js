import * as LogHandler from '../../log'
import {
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED
} from '../../../constants/index'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import { eth } from 'ptokens-utils'
import store from '../../../store'
import Web3 from 'web3'

const loggedIssueWithWallet = async (_ptokens, _params, _pToken, _dispatch) => {
  if (
    _pToken.isPerc20 &&
    (_pToken.name === 'pMKR' ||
      _pToken.name === 'PNT' ||
      _pToken.name === 'pLINK' ||
      _pToken.name === 'pYFI')
  ) {
    try {
      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for approving...',
          success: false,
          waiting: true,
          id: 'approve'
        })
      )

      await _ptokens[_pToken.name.toLowerCase()].select()
      // prettier-ignore
      const info = await _ptokens[_pToken.name.toLowerCase()].selectedNode.getInfo()
      const { wallets } = store.getState()

      const web3 = new Web3(wallets.issuerProvider)
      const toApprove = new web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              {
                name: '_spender',
                type: 'address'
              },
              {
                name: '_value',
                type: 'uint256'
              }
            ],
            name: 'approve',
            outputs: [
              {
                name: '',
                type: 'bool'
              }
            ],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        eth.addHexPrefix(info.native_smart_contract_address)
      )

      await toApprove.methods
        .approve(eth.addHexPrefix(info.native_vault_address), _params[0])
        .send({ from: wallets.issuerAccount })

      _dispatch(
        LogHandler.updateItem('approve', {
          value: `Approve confirmed`,
          waiting: false,
          success: true,
          link: null,
          id: 'approve'
        })
      )
    } catch (_err) {
      _dispatch({
        type: PTOKENS_ISSUE_NOT_SUCCEDEED,
        payload: {
          error: _err.message
        }
      })
      return
    }
  }

  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for confirmation...',
      success: false,
      waiting: true,
      id: 'mint-confirmation'
    })
  )

  _ptokens[_pToken.name.toLowerCase()]
    .issue(..._params)
    .once('nativeTxConfirmed', () => {
      _dispatch(
        LogHandler.updateItem('mint-confirmation', {
          value: `Minting transaction confirmed`,
          success: true,
          link: null,
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

export default loggedIssueWithWallet
