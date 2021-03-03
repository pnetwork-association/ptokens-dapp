import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'
import BigNumber from 'bignumber.js'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  PBTC_ON_XDAI_MAINNET
} from '../../constants'
import { updateProgress, loadBalanceByAssetId, resetProgress } from './index'
import { toastr } from 'react-redux-toastr'

const hostTransactionHash = {
  telos: 'transaction_id',
  eos: 'transaction_id',
  eth: 'transactionHash'
}

const pegout = async ({ ptokens, params, ptoken, dispatch }) => {
  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = { gas: 80000, blocksBehind: 3, expireSeconds: 60, permission: 'active' }

  if (
    ptoken.id === PBTC_ON_ETH_MAINNET ||
    ptoken.id === PBTC_ON_BSC_MAINNET ||
    ptoken.id === PBTC_ON_XDAI_MAINNET ||
    ptoken.id === PBTC_ON_ETH_TESTNET ||
    ptoken.id === PLTC_ON_ETH_MAINNET ||
    ptoken.id === PLTC_ON_ETH_TESTNET ||
    ptoken.id === PDOGE_ON_ETH_MAINNET ||
    ptoken.id === PEOS_ON_ETH_MAINNET ||
    ptoken.id === PEOS_ON_POLYGON_MAINNET
  ) {
    params[0] = BigNumber(params[0])
      .multipliedBy(10 ** ptoken.decimals)
      .toFixed()
  }

  let step = 0
  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be broadcasted ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
  ptokens[ptoken.name.toLowerCase()]
    .redeem(...params)
    .once('hostTxBroadcasted', _hash => {
      toastr.success('Transaction broadcasted!', 'Click here to see it', {
        timeOut: 0,
        onToastrClick: () => window.open(`${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_hash}`, '_blank')
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
    .once('hostTxConfirmed', _tx => {
      if (ptoken.blockchain === 'EOS' || ptoken.blockchain === 'TELOS') {
        toastr.success('Transaction broadcasted!', 'Click here to see it', {
          timeOut: 0,
          onToastrClick: () =>
            window.open(
              `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${
                _tx[hostTransactionHash[ptoken.blockchain.toLowerCase()]]
              }`,
              '_blank'
            )
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
          message: 'Transaction Confirmed! Waiting for the enclave to receive the transaction ...',
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
          window.open(
            `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_report.broadcast_tx_hash}`,
            '_blank'
          )
      })

      step = step + 1
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: 'Enclave broadcasted the transaction, Waiting for the confirmation ...',
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nativeTxConfirmed', () => {
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

      // TODO: load balance also for native asset
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(() => {
      dispatch(resetProgress())
    })
}

export default pegout
