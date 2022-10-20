import { stringUtils } from 'ptokens-helpers'
import Web3 from 'web3'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'

const peginWithWallet = async ({ swap, ptokenFrom, ptokenTo, dispatch }) => {
  let link

  // NOTE: avoids brave metamask gas estimation fails
  const _amount = BigNumber(swap.amount)
    .multipliedBy(10 ** ptokenTo.nativeDecimals)
    .toFixed()

  // NOTE: peth uses ethers
  if ((ptokenTo.isPerc20 && ptokenTo.name !== 'pETH' && ptokenTo.name !== 'pFTM') || ptokenTo.isBep20) {
    try {
      const { account, provider } = getWalletByBlockchain(ptokenFrom.blockchain)
      const web3 = new Web3(provider)

      const toApprove = new web3.eth.Contract(ERC20Abi, stringUtils.addHexPrefix(swap.sourceAsset.tokenAddress))
      const allowance = await toApprove.methods
        .allowance(account, stringUtils.addHexPrefix(swap.sourceAsset.vaultAddress))
        .call()
      if (!BigNumber(allowance).isGreaterThanOrEqualTo(_amount)) {
        const _approve = _amount =>
          toApprove.methods
            .approve(stringUtils.addHexPrefix(swap.sourceAsset.vaultAddress), _amount)
            .send({ from: account, gas: 75000 })
            .once('hash', _hash => {
              link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
            })
        if (ptokenTo.nativeSymbol === 'USDT' && !BigNumber(allowance).isZero()) {
          await _approve(0)
        }
        await _approve(_amount)
      }
    } catch (_err) {
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during pegin, try again!',
          showMoreText: _err.message ? _err.message : _err,
          showMoreLabel: 'Show Details',
          icon: 'cancel'
        })
      )
      dispatch(updateSwapButton('Swap'))
      console.error(_err)
      return
    }
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

  await swap
    .execute()
    .once('inputTxBroadcasted', _hash => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _hash)
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
    .once('inputTxConfirmed', () => {
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
    .once('inputTxDetected', () => {
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
    .once('outputTxBroadcasted', _outputs => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _outputs[0].txHash)
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
    .then(_ => {
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
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
      setTimeout(() => dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
    })
    .catch(_err => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
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

export default peginWithWallet
