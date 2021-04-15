import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import store from '../../../store'
import { eth } from 'ptokens-utils'
import Web3 from 'web3'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { toastr } from 'react-redux-toastr'

let promiEvent = null

const peginWithWallet = async ({ ptokens, ptoken, params, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  params[params.length] = { blocksBehind: 3, expireSeconds: 60, permission: 'active' }

  // NOTE: peth uses ethers
  if (ptoken.isPerc20 && ptoken.name !== 'pETH') {
    try {
      await ptokens[ptoken.workingName].select()
      const info = await ptokens[ptoken.workingName].selectedNode.getInfo()
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
                    window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_hash}`, '_blank')
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
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = { gas: 200000 }
  params[0] = BigNumber(params[0])
    .multipliedBy(10 ** ptoken.nativeDecimals)
    .toFixed()

  promiEvent = ptokens[ptoken.name.toLowerCase()].issue(...params)
  promiEvent
    .once('nativeTxBroadcasted', _hash => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () => window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_hash}`, '_blank')
      })

      step = step + 1
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
    .once('nativeTxConfirmed', _e => {
      if (ptoken.blockchain === 'EOS' || ptoken.blockchain === 'TELOS') {
        toastr.success('Transaction broadcasted!', 'Click here to see it', {
          timeOut: 0,
          onToastrClick: () =>
            window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_e.transaction_id}`, '_blank')
        })

        step = step + 1
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

      step = step + 1
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
      step = step + 1
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
          window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_report.broadcast_tx_hash}`, '_blank')
      })

      step = step + 1
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
    .then(_result => {
      step = step + 1
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
    .catch(() => {
      dispatch(updateSwapButton('Swap'))
      dispatch(resetProgress())
    })
}

export default peginWithWallet