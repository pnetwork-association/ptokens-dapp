import { SwapResult, pTokensAsset } from '@p.network/ptokens-entities'
import { getPublicClient } from 'wagmi/actions'
import { erc20Abi } from 'viem'

import { getCorrespondingTxExplorerLinkByChain } from '../../../utils/explorer'
import { approveTransaction } from '../../evm-utils'
import { TProgressContext } from '../../ContextProvider'
import { nativeToWei } from '../../../utils/amount-utils'
import wagmiConfig from '../../wallet/evm-chains/wagmiConfig'


const mintPTokens = async ({ amount, recipient, userData, ptokenFrom, ptokenTo, progress }: { amount: string; recipient: string; userData: string; ptokenFrom: pTokensAsset; ptokenTo: pTokensAsset; progress: TProgressContext;}) => {
  
  const publicClient = getPublicClient(wagmiConfig)
  // let link: string
  // NOTE: peth uses ethers
  progress?.setShow(true)
  progress?.setMessage('Waiting for the approval to be granted to pNetwork contract ...')

  const _amount = BigInt(nativeToWei(amount, ptokenTo.assetInfo.decimals))
  if (ptokenFrom.assetInfo.isNative) {
    try {
      const approve_hash = await approveTransaction(
        ptokenFrom.assetInfo.pTokenAddress,
        ptokenFrom.assetInfo.address,
        _amount,
        ptokenFrom.chainId,
        ptokenTo.assetInfo.symbol === 'USDT',
        erc20Abi,
      )
      if (approve_hash.hashType == true) {
        const approve_tx = await publicClient.waitForTransactionReceipt({confirmations: 3, hash: approve_hash.message as `0x${string}`})
        // const waitForApprovalReceipt = publicClient.waitForTransactionReceipt({confirmations: 5, hash: approve_hash.message as `0x${string}`})
        // const approve_tx = await retryPromise<TransactionReceipt>(waitForApprovalReceipt, 3, 1500) as TransactionReceipt
        progress?.setMessage(getCorrespondingTxExplorerLinkByChain(ptokenFrom.assetInfo.chain, approve_tx.transactionHash as string))
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
  await ptokenFrom.swap(_amount, ptokenTo.assetInfo.chain, recipient, userData)
    .on('txBroadcasted', (_swapResult: SwapResult) => {
      link = getCorrespondingTxExplorerLinkByChain(ptokenFrom.assetInfo.chain, _swapResult.txHash)
      progress?.setStep(2)
      progress?.setMessage(`<a href="${link}" target="_blank" className="text-blue-800" noopener noreferrer>Transaction</a> broadcasted! Waiting for confirmation ...`)
      console.info('link', link)
    })
    .catch((_err) => {
      progress?.setStep(0)
      progress?.setMessage('')
      progress?.setIsComplete(false)
      progress?.setShow(false)
      console.error(_err)
    })
  }

export default mintPTokens
