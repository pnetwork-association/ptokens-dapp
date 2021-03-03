import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'
import store from '../../store'
import { eth } from 'ptokens-utils'
import Web3 from 'web3'
import ERC20Abi from '../../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId } from './index'
import { toastr } from 'react-redux-toastr'

const peginWithWallet = async ({ ptokens, ptoken, params, dispatch }) => {
  params[params.length] = { blocksBehind: 3, expireSeconds: 60, permission: 'active' }

  // NOTE: peth uses ethers
  if (ptoken.isPerc20 && ptoken.name !== 'pETH') {
    try {
      await ptokens[ptoken.name.toLowerCase()].select()
      const info = await ptokens[ptoken.name.toLowerCase()].selectedNode.getInfo()

      console.log(params)

      const { wallets } = store.getState()

      const web3 = new Web3(wallets.eth.provider)
      const toApprove = new web3.eth.Contract(ERC20Abi, eth.addHexPrefix(info.native_smart_contract_address))

      const allowance = await toApprove.methods
        .allowance(wallets.eth.account, eth.addHexPrefix(info.native_vault_address))
        .call()

      if (!BigNumber(allowance).isGreaterThanOrEqualTo(params[0])) {
        const _approve = () =>
          new Promise(_resolve =>
            toApprove.methods
              .approve(eth.addHexPrefix(info.native_vault_address), params[0])
              .send({ from: wallets.eth.account, gas: 150000 })
              .once('hash', _hash => {
                toastr.success('Transaction broadcasted!', 'Click here to see it', {
                  timeOut: 0,
                  onToastrClick: () =>
                    window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'pegin')}${_hash}`, '_blank')
                })
              })
              .then(_resolve)
          )

        await _approve()
      }
    } catch (_err) {
      console.error(_err)
      return
    }
  }

  let step = 0
  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for a deposit ...',
      steps: [0, 20, 40, 60, 80, 100]
    })
  )

  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = { gas: 200000 }
  ptokens[ptoken.name.toLowerCase()]
    .issue(...params)
    .once('nativeTxBroadcasted', _hash => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () => window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'pegin')}${_hash}`, '_blank')
      })

      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: 'Transaction broadcasted! Waiting for confirmation ...',
          steps: [0, 20, 40, 60, 80, 100]
        })
      )
    })
    .once('nativeTxConfirmed', _e => {
      if (ptoken.blockchain === 'EOS') {
        toastr.success('Transaction broadcasted!', 'Click here to see it', {
          timeOut: 0,
          onToastrClick: () =>
            window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'pegin')}${_e.transaction_id}`, '_blank')
        })

        step = step + 1
        dispatch(
          updateProgress({
            show: true,
            percent: 20,
            message: 'Transaction broadcasted! Waiting for confirmation ...',
            steps: [0, 20, 40, 60, 80, 100]
          })
        )
      }

      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: 'Transaction Confirmed! Waiting for the enclave to receive the transaction ...',
          steps: [0, 20, 40, 60, 80, 100]
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
          steps: [0, 20, 40, 60, 80, 100]
        })
      )
    })
    .once('nodeBroadcastedTx', _report => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () =>
          window.open(
            `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'pegout')}${_report.broadcast_tx_hash}`,
            '_blank'
          )
      })

      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: 'Enclave broadcasted the transaction, Waiting for the confirmation ...',
          steps: [0, 20, 40, 60, 80, 100]
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
          steps: [0, 20, 40, 60, 80, 100]
        })
      )

      // TODO load balances
    })
    .catch(_err => {
      /*const { message } = _err

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
      })*/
    })
}

export default peginWithWallet
