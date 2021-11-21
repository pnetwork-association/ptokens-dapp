import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'
import { getWalletAccountByBlockchain, getWalletPermissionByBlockchain } from '../../wallets/wallets.selectors'

const hostTransactionHash = {
  telos: 'transaction_id',
  eos: 'transaction_id',
  eth: 'transactionHash'
}

let promiEvent = null

const pegout = async ({ ptokens, params, ptoken, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  let link

  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = {
    gas: ptoken.gasLimitPegout ? ptoken.gasLimitPegout : 80000,
    blocksBehind: 3,
    expireSeconds: 60,
    permission: getWalletPermissionByBlockchain(ptoken.blockchain) || 'active',
    actor: getWalletAccountByBlockchain(ptoken.blockchain)
  }

  if (ptoken.withAmountConversionPegout) {
    params[0] = BigNumber(params[0])
      .multipliedBy(10 ** ptoken.decimals)
      .toFixed()
  }

  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
  promiEvent = ptokens[ptoken.workingName].redeem(...params)
  promiEvent
    .once('hostTxBroadcasted', _hash => {
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_hash}`
      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('hostTxConfirmed', _tx => {
      if (ptoken.blockchain === 'EOS' || ptoken.blockchain === 'TELOS' || ptoken.blockchain === 'ULTRA') {
        // prettier-ignore
        link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_tx[hostTransactionHash[ptoken.blockchain.toLowerCase()]]}`
        dispatch(
          updateProgress({
            show: true,
            percent: 20,
            message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
            steps: [0, 20, 40, 60, 80, 100],
            terminated: false
          })
        )
      }

      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeReceivedTx', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 60,
          message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeBroadcastedTx', _report => {
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_report.broadcast_tx_hash}`
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nativeTxConfirmed', () => {
      dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: true
        })
      )

      dispatch(updateSwapButton('Swap'))
      // TODO: load balance also for native asset
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegout, try again!',
            showMoreText: _err.message ? _err.message : _err,
            showMoreLabel: 'Show Details',
            icon: 'cancel'
          })
        )
      }
      dispatch(updateSwapButton('Swap'))
      dispatch(resetProgress())
    })
}

export default pegout
