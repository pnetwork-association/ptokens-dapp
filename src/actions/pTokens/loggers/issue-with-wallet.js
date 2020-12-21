import * as LogHandler from '../../log'
import { PTOKENS_ISSUE_SUCCEDEED, PTOKENS_ISSUE_NOT_SUCCEDEED } from '../../../constants/index'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import { eth } from 'ptokens-utils'
import store from '../../../store'
import Web3 from 'web3'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'

const loggedIssueWithWallet = async (_ptokens, _params, _pToken, _dispatch) => {
  // NOTE: peth uses ethers
  if (_pToken.isPerc20 && _pToken.name !== 'pETH') {
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
      const toApprove = new web3.eth.Contract(ERC20Abi, eth.addHexPrefix(info.native_smart_contract_address))

      const allowance = await toApprove.methods
        .allowance(wallets.issuerAccount, eth.addHexPrefix(info.native_vault_address))
        .call()

      if (!BigNumber(allowance).isGreaterThanOrEqualTo(_params[0])) {
        await toApprove.methods
          .approve(eth.addHexPrefix(info.native_vault_address), _params[0])
          .send({ from: wallets.issuerAccount, gas: 150000 })

        _dispatch(
          LogHandler.updateItem('approve', {
            value: `Approve confirmed`,
            waiting: false,
            success: true,
            link: null,
            id: 'approve'
          })
        )
      } else {
        _dispatch(
          LogHandler.updateItem('approve', {
            value: `Amount already approved`,
            waiting: false,
            success: true,
            link: null,
            id: 'approve'
          })
        )
      }
    } catch (_err) {
      _dispatch(LogHandler.clearWaitingItem())
      _dispatch(
        LogHandler.addItem({
          value: _err.message,
          success: false
        })
      )
      return
    }
  }

  _dispatch(
    LogHandler.addItem({
      value: 'Waiting for broadcasting...',
      success: false,
      waiting: true,
      id: 'broadcast-confirmation'
    })
  )

  // NOTE: avoids brave metamask gas estimation fails
  _params[_params.length] = { gas: 200000 }
  _ptokens[_pToken.name.toLowerCase()]
    .issue(..._params)
    .once('nativeTxBroadcasted', _hash => {
      const explorer = `${getCorrespondingBaseTxExplorerLink(_pToken, 'issuer')}${_hash}`

      _dispatch(
        LogHandler.updateItem('broadcast-confirmation', {
          value: `Minting transaction broadcasted`,
          success: true,
          link: explorer,
          id: 'broadcast-confirmation'
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
    .catch(_err => {
      const { message } = _err

      _dispatch(LogHandler.clearWaitingItem())
      _dispatch(
        LogHandler.addItem({
          value: message ? message : _err,
          success: false
        })
      )

      _dispatch({
        type: PTOKENS_ISSUE_NOT_SUCCEDEED,
        payload: {
          error: message ? message : _err
        }
      })
    })
}

export default loggedIssueWithWallet
