import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'
import curve from '@curvefi/api'
import polling from 'light-async-polling'
import Web3 from 'web3'
import { PBTC_ON_ETH_POOL, TRANSFER_EVENT_TOPIC } from '../../../constants/index'
import { sendEvent } from '../../../ga4'

function getInputAmount(web3, txReceipt, poolAddress, returnAddress, trLink) {
  poolAddress = poolAddress.toUpperCase()
  returnAddress = returnAddress.toUpperCase()
  const logs = txReceipt.logs
  for (const log of logs) {
    let topic = log.topics
    if (
      topic[0] === TRANSFER_EVENT_TOPIC &&
      web3.eth.abi.decodeParameter('address', topic[1]).toUpperCase() === poolAddress &&
      web3.eth.abi.decodeParameter('address', topic[2]).toUpperCase() === returnAddress
    ) {
      return web3.utils.fromWei(web3.utils.hexToNumber(log.data).toString())
    }
  }
  const err = new Error(
    `It was not possible to detect the amount received. Please check the <a href="${trLink}" target="_blank">Curve transaction</a> ...`
  )
  throw err
}

function monitorCurveTransaction(_txHash, web3) {
  let promi = new Promise((resolve) =>
    (async () => {
      let resp = ''
      await polling(async () => {
        try {
          resp = await web3.eth.getTransactionReceipt(_txHash)
          if (resp) {
            return true
          }
        } catch (err) {
          return false
        }
      }, 1000)
      resolve(resp)
    })()
  )
  return promi
}

function monitorCurveApproval(pool, name, amount) {
  let promi = new Promise((resolve) =>
    (async () => {
      let resp = ''
      await polling(async () => {
        try {
          resp = await pool.swapIsApproved(name, amount)
          if (resp) {
            return true
          }
        } catch (err) {
          return false
        }
      }, 1000)
      resolve(resp)
    })()
  )
  return promi
}

const curvePhase = async (swap, provider, tokenFrom, ptokenFrom, dispatch) => {
  const web3 = new Web3()
  web3.setProvider(provider)
  await curve.init('Web3', { externalProvider: provider }, { chainId: tokenFrom.curveChainId })
  // Fetch factory pools
  await curve.fetchFactoryPools()
  await curve.getCryptoFactoryPoolList()

  const pool = curve.getPool(PBTC_ON_ETH_POOL)

  dispatch(
    updateProgress({
      show: true,
      percent: 10,
      message: 'Waiting for the Curve approval to be signed ...',
      steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
      terminated: false,
    })
  )

  const curveisapproved = await pool.swapIsApproved(tokenFrom.name, swap._amount)
  if (!curveisapproved) {
    await pool.swapApprove(tokenFrom.name, swap._amount)
    await monitorCurveApproval(pool, tokenFrom.name, swap._amount)
    sendEvent('curve pool approval received', {
      operation: 'pegout',
      asset_from: tokenFrom.id,
      asset_to: ptokenFrom.id,
    })
    dispatch(
      updateProgress({
        show: true,
        percent: 20,
        message: 'Curve approval signed, waiting for Curve pool transaction ...',
        steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
        terminated: false,
      })
    )
  } else {
    sendEvent('curve pool approval received', {
      operation: 'pegout',
      asset_from: tokenFrom.id,
      asset_to: ptokenFrom.id,
    })
    dispatch(
      updateProgress({
        show: true,
        percent: 20,
        message: 'Curve approval already signed, waiting for Curve pool transaction ...',
        steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
        terminated: false,
      })
    )
  }

  const swapTx = await pool.swap(tokenFrom.name, ptokenFrom.address, swap._amount, 0.1)
  let link = getCorrespondingTxExplorerLinkByBlockchain(tokenFrom.blockchain, swapTx)
  dispatch(
    updateProgress({
      show: true,
      percent: 30,
      message: `<a href="${link}" target="_blank">Curve transaction</a> broadcasted! Waiting for confirmation ...`,
      steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
      terminated: false,
    })
  )

  let txReceipt = await monitorCurveTransaction(swapTx, provider)
  dispatch(
    updateProgress({
      show: true,
      percent: 40,
      message: `<a href="${link}" target="_blank">Curve transaction</a> confirmed! Starting pNetwork phase ...`,
      steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
      terminated: false,
    })
  )

  // Update amount with the actual pBTCs returned by curve
  try {
    let updatedAmount = getInputAmount(txReceipt, pool.address, provider.selectedAddress, link)
    swap._amount = updatedAmount
  } catch (_err) {
    console.log(_err)
    dispatch(
      updateInfoModal({
        show: true,
        text: 'Error during pegout, try again!',
        showMoreText: _err.message ? _err.message : _err,
        showMoreLabel: 'Show Details',
        icon: 'cancel',
      })
    )
  }
}

const pegoutFromCurve = async ({ swap, provider, tokenFrom, ptokenFrom, ptokenTo, dispatch }) => {
  try {
    let link
    dispatch(
      updateProgress({
        show: true,
        percent: 0,
        message: 'Waiting for Curve initialization ...',
        steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
        terminated: false,
      })
    )

    await curvePhase(swap, provider, tokenFrom, ptokenFrom, dispatch)

    // NOTE: hostTxBroadcasted is not triggered when blockchain is EOS
    await swap
      .execute()
      .once('inputTxBroadcasted', (_hash) => {
        sendEvent('swap_confirmed_by_user', {
          operation: 'pegout',
          asset_from: ptokenFrom.id,
          asset_to: ptokenTo.id,
        })
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
        dispatch(
          updateProgress({
            show: true,
            percent: 60,
            message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
            steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
            terminated: false,
          })
        )
      })
      .once('inputTxConfirmed', (_tx) => {
        dispatch(
          updateProgress({
            show: true,
            percent: 70,
            message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
            steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
            terminated: false,
          })
        )
      })
      .once('inputTxDetected', () => {
        dispatch(
          updateProgress({
            show: true,
            percent: 80,
            message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
            steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
            terminated: false,
          })
        )
      })
      .once('outputTxBroadcasted', (_outputs) => {
        sendEvent('swap_processed', {
          operation: 'pegout',
          asset_from: ptokenFrom.id,
          asset_to: ptokenTo.id,
        })
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _outputs[0].txHash)
        dispatch(
          updateProgress({
            show: true,
            percent: 90,
            message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
            steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
            terminated: false,
          })
        )
      })
      .then((_) => {
        sendEvent('assets_delivered_tx_confirmed', {
          operation: 'pegout',
          asset_from: ptokenFrom.id,
          asset_to: ptokenTo.id,
        })
        dispatch(
          updateProgress({
            show: true,
            percent: 100,
            message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
            steps: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
            terminated: true,
          })
        )

        dispatch(updateSwapButton('Swap'))
        setTimeout(() => dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
        setTimeout(() => dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
      })
  } catch (_err) {
    console.error(_err)
    const { showModal } = parseError(_err)
    if (showModal) {
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during pegout, try again!',
          showMoreText: _err.message ? _err.message : _err,
          showMoreLabel: 'Show Details',
          icon: 'cancel',
        })
      )
    }
    dispatch(updateSwapButton('Swap'))
    dispatch(resetProgress())
  }
}

export default pegoutFromCurve
