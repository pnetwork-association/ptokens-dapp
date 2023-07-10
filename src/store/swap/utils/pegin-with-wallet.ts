import { SwapResult } from 'ptokens-entities'
import { pTokensSwap } from 'ptokens-swap'
import Web3 from 'web3'

import { AppDispatch, AppThunk } from '../..'
import { Asset } from '../../../settings/swap-assets'
import { parseError } from '../../../utils/errors'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { approveTransaction, getBigNumber } from '../../evm-approve'
import { updateInfoModal } from '../../pages/pages.actions'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'

const peginWithWallet =
  ({ swap, ptokenFrom, ptokenTo }: { swap: pTokensSwap; ptokenFrom: Asset; ptokenTo: Asset }): AppThunk =>
  async (_dispatch: AppDispatch) => {
    let link: string
    // NOTE: peth uses ethers
    if (!ptokenFrom.isPtoken && (ptokenFrom.isPerc20 || ptokenTo.isBep20)) {
      try {
        const wallet = getWalletByBlockchain(ptokenFrom.blockchain)
        const web3 = new Web3(wallet.provider)
        const _amount = getBigNumber(swap.amount, ptokenTo.nativeDecimals)
        const approve_hash = await approveTransaction(
          ptokenFrom.pTokenAddress,
          swap.sourceAsset.assetTokenAddress,
          _amount,
          web3,
          ptokenTo.nativeSymbol === 'USDT'
        )
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, approve_hash)
      } catch (_err) {
        if (_err instanceof Error) {
          _dispatch(
            updateInfoModal({
              show: true,
              text: 'Error during pegin, try again!',
              showMoreText: _err.message ? _err.message : _err.toString(),
              showMoreLabel: 'Show Details',
              icon: 'cancel',
            })
          )
        }
        _dispatch(updateSwapButton('Swap'))
        console.error(_err)
        return
      }
    }

    _dispatch(
      updateProgress({
        show: true,
        percent: 0,
        message: 'Waiting for the transaction to be signed ...',
        steps: [0, 25, 50, 75, 100],
        terminated: false,
      })
    )

    await swap
      .execute()
      .on('inputTxBroadcasted', (_swapResult: SwapResult) => {
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _swapResult.txHash)
        _dispatch(
          updateProgress({
            show: true,
            percent: 25,
            message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
            steps: [0, 25, 50, 75, 100],
            terminated: false,
          })
        )
      })
      .on('inputTxConfirmed', () => {
        _dispatch(
          updateProgress({
            show: true,
            percent: 50,
            message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
            steps: [0, 25, 50, 75, 100],
            terminated: false,
          })
        )
      })
      .on('operationQueued', (_swapResult: SwapResult) => {
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _swapResult.txHash)
        _dispatch(
          updateProgress({
            show: true,
            percent: 75,
            message: `Asset transfer proposal <a href="${link}" target="_blank">transaction</a> broadcasted...`,
            steps: [0, 25, 50, 75, 100],
            terminated: false,
          })
        )
      })
      .on('operationExecuted', (_swapResult: SwapResult) => {
        link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _swapResult.txHash)
        _dispatch(
          updateProgress({
            show: true,
            percent: 100,
            message: `Asset transfer <a href="${link}" target="_blank">transaction</a> executed.`,
            steps: [0, 25, 50, 75, 100],
            terminated: true,
          })
        )
        _dispatch(updateSwapButton('Swap'))
        setTimeout(() => _dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
        setTimeout(() => _dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
      })
      .catch((_err) => {
        console.error(_err)
        const { showModal } = parseError(_err)
        if (showModal) {
          _dispatch(
            updateInfoModal({
              show: true,
              text: 'Error during pegin, try again!',
              showMoreText: _err.message ? _err.message : _err,
              showMoreLabel: 'Show Details',
              icon: 'cancel',
            })
          )
        }
        _dispatch(updateSwapButton('Swap'))
        _dispatch(resetProgress())
      })
  }

export default peginWithWallet
