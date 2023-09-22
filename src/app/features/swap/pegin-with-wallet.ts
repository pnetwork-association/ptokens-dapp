import { SwapResult } from 'ptokens-entities'
import { pTokensSwap } from 'ptokens-swap'
import { pTokensEvmAsset } from 'ptokens-assets-evm'

// import { parseError } from '../../../utils/errors'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
// import { updateInfoModal } from '../../pages/pages.actions'
// import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { approveTransaction, getBigInt } from './evm-utils'
import { store } from '../../store'
import { resetProgress, updateProgress, updateSwapButton } from './swapSlice'


const peginWithWallet = async ({ swap , ptokenFrom, ptokenTo }: { swap: pTokensSwap; ptokenFrom: pTokensEvmAsset; ptokenTo: pTokensEvmAsset }) => {
  let link: string
  // NOTE: peth uses ethers

  store.dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transfer approval ...',
      steps: [0, 25, 50, 75, 100],
      terminated: false,
    })
  )

  if (swap.sourceAsset.isNative) {
    try {
      const _amount = getBigInt(BigInt(swap.amount), ptokenTo.assetInfo.underlyingAssetDecimals)
      const approve_hash = await approveTransaction(
        ptokenFrom.assetTokenAddress,
        swap.sourceAsset.assetTokenAddress,
        _amount,
        ptokenTo.assetInfo.underlyingAssetSymbol === 'USDT'
      )
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, approve_hash as string)
    } catch (_err) {
      // if (_err instanceof Error) {
      //   _dispatch(
      //     updateInfoModal({
      //       show: true,
      //       text: 'Error during pegin, try again!',
      //       showMoreText: _err.message ? _err.message : _err.toString(),
      //       showMoreLabel: 'Show Details',
      //       icon: 'cancel',
      //     })
      //   )
      // }
      // _dispatch(updateSwapButton('Swap'))
      console.error(_err)
      return
    }
  }

  store.dispatch(
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
      store.dispatch(
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
      store.dispatch(
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
      store.dispatch(
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
      store.dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `Asset transfer <a href="${link}" target="_blank">transaction</a> executed.`,
          steps: [0, 25, 50, 75, 100],
          terminated: true,
        })
      )
      store.dispatch(updateSwapButton({disabled: false, text: 'Swap'}))
      // setTimeout(() => _dispatch(loadBalanceByAssetId(ptokenFrom.id)), 2000)
      // setTimeout(() => _dispatch(loadBalanceByAssetId(ptokenTo.id)), 2000)
    })
    .catch((_err) => {
      console.error(_err)
      // const { showModal } = parseError(_err)
      // if (showModal) {
      //   _dispatch(
      //     updateInfoModal({
      //       show: true,
      //       text: 'Error during pegin, try again!',
      //       showMoreText: _err.message ? _err.message : _err,
      //       showMoreLabel: 'Show Details',
      //       icon: 'cancel',
      //     })
      //   )
      // }
      store.dispatch(updateSwapButton({disabled: false, text: 'Swap'}))
      store.dispatch(resetProgress())
    })
  }

export default peginWithWallet
