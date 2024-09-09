import { SwapResult, pTokensAsset } from '@p.network/ptokens-entities'
import { getPublicClient } from 'wagmi/actions'
import { Blockchain } from '@p.network/ptokens-constants'
import { erc20ABI } from 'wagmi'

import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { approveTransaction } from '../../evm-utils'
import { getChainByBlockchain } from '../../../constants/swap-chains'
import { TProgressContext } from '../../ContextProvider'
import { nativeToWei } from '../../../utils/amount-utils'




const redeemPTokens = async ({ swap , ptokenFrom, ptokenTo, progress }: { swap: pTokensSwap; ptokenFrom: pTokensAsset; ptokenTo: pTokensAsset; progress: TProgressContext;}) => {
  
  const sourceChainId = getChainByBlockchain(ptokenFrom.blockchain).chainId
  const publicClient = getPublicClient({chainId: sourceChainId})
  // let link: string
  // NOTE: peth uses ethers
  progress?.setShow(true)
  progress?.setMessage('Waiting for the approval to be granted to pNetwork contract ...')

  if (swap.sourceAsset.blockchain !== Blockchain.Bsc) {
    try {
      const _amount = nativeToWei(swap.amount, ptokenTo.assetInfo.underlyingAssetDecimals)
      const approve_hash = await approveTransaction(
        swap.sourceAsset.pTokenAddress,
        swap.sourceAsset.assetTokenAddress,
        BigInt(_amount),
        sourceChainId,
        ptokenTo.assetInfo.underlyingAssetSymbol === 'USDT',
        erc20ABI
      )
      if (approve_hash.hashType == true) {
        const approve_tx = await publicClient.waitForTransactionReceipt({confirmations: 3, hash: approve_hash.message as `0x${string}`})
        // const waitForApprovalReceipt = publicClient.waitForTransactionReceipt({confirmations: 5, hash: approve_hash.message as `0x${string}`})
        // const approve_tx = await retryPromise<TransactionReceipt>(waitForApprovalReceipt, 3, 1500) as TransactionReceipt
        progress?.setMessage(getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, approve_tx.transactionHash as string))
      } else {
        progress?.setMessage(approve_hash.message)
      }
      progress?.setStep(1)
    } catch (_err) {
      progress?.setStep(0)
      progress?.setMessage('')
      progress?.setIsComplete(false)
      progress?.setShow(false)
      console.error(_err)
      return
    }
  }

  progress?.setMessage('Waiting for the transaction to be signed ...')
  let link: string
  await swap
    .execute()
    .on('inputTxBroadcasted', (_swapResult: SwapResult) => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenFrom.blockchain, _swapResult.txHash)
      progress?.setStep(2)
      progress?.setMessage(`<a href="${link}" target="_blank" className="text-blue-800" noopener noreferrer>Transaction</a> broadcasted! Waiting for confirmation ...`)
      console.info('link', link)
    })
    .on('inputTxConfirmed', () => {
      progress?.setStep(3)
      progress?.setMessage(`Your <a href="${link}" target="_blank" className="text-blue-800" noopener noreferrer>operation</a> has been initiated. You can monitor it on Activity page.`)
    })
    .on('interimOperationQueued', (_swapResult: SwapResult) => {
      console.info('interimOperationQueued')
    })
    .on('interimOperationExecuted', (_swapResult: SwapResult) => {
      console.info('interimOperationExecuted')
    })
    .on('operationQueued', (_swapResult: SwapResult) => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _swapResult.txHash)
      console.info('operationQueued')
      // progress?.setStep(4)
      progress?.setMessage(`Asset transfer proposal <a href="${link}" target="_blank" className="text-blue-800" noopener noreferrer>transaction</a> broadcasted...`)
    })
    .on('operationExecuted', (_swapResult: SwapResult) => {
      link = getCorrespondingTxExplorerLinkByBlockchain(ptokenTo.blockchain, _swapResult.txHash)
      console.info('operationExecuted')
      // progress?.setStep(5)
      progress?.setMessage(`Asset transfer <a href="${link}" target="_blank" className="text-blue-800" noopener noreferrer>transaction</a> executed.`)
    })
    .catch((_err) => {
      progress?.setStep(0)
      progress?.setMessage('')
      progress?.setIsComplete(false)
      progress?.setShow(false)
      console.error(_err)
    })
  }

export default redeemPTokens
