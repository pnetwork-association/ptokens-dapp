import BigNumber from 'bignumber.js'
import { stringUtils } from 'ptokens-helpers'
import { erc20ABI } from 'wagmi'
import { getAccount, getContract, getWalletClient } from 'wagmi/actions'

// NOTE: avoids brave metamask gas estimation fails
function getBigInt(amount: string, decimals: number): bigint {
  return BigInt(Number(amount) * 10 ** decimals)
}

type TApproveResult = {
  message: string
  hashType: boolean
}

// requiresReset is needed to be true in case of USDT
const approveTransaction = async (
  spender: string,
  assetAddress: string,
  amount: bigint,
  chainId: number,
  requiresReset: boolean = false,
): Promise<TApproveResult> => {
  console.log('chainId', chainId)
  const walletClient = await getWalletClient({chainId: chainId})
  const account = getAccount()
  if (!account.address || !walletClient)
    throw new Error('No account connected')
  const assetContract = getContract({
    address: stringUtils.addHexPrefix(assetAddress),
    abi: erc20ABI,
    walletClient: walletClient
  })
  console.log(spender)
  const allowance = await assetContract.read.allowance([account.address, stringUtils.addHexPrefix(spender)])
  console.log('allowance', allowance)
  console.log('amount', amount)
  let hash = ''
  if (allowance < amount) {
    const _approve = async (amount: bigint) => await assetContract.write.approve([stringUtils.addHexPrefix(spender), amount])
    if (requiresReset && !BigNumber(allowance.toString()).isZero()) {
      hash = await _approve(0n)
    } else hash = await _approve(amount)
    return {message: hash, hashType: true}
  }
  return {message: `Allowance: ${allowance}`, hashType: false}
}

export { approveTransaction, getBigInt }