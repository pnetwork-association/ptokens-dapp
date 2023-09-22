import BigNumber from 'bignumber.js'
import { stringUtils } from 'ptokens-helpers'
import { erc20ABI } from 'wagmi'
import { getAccount, getContract, getWalletClient } from 'wagmi/actions'

// NOTE: avoids brave metamask gas estimation fails
function getBigInt(amount: bigint, decimals: number): bigint {
  return amount * BigInt(10) ** BigInt(decimals);
}

// requiresReset is needed to be true in case of USDT
const approveTransaction = async (
  spender: string,
  assetAddress: string,
  amount: bigint,
  requiresReset = false
) => {
  const walletClient = await getWalletClient()
  const account = getAccount()
  if (!account.address || !walletClient)
    return new Error('No account connected')
  const assetContract = getContract({
    address: stringUtils.addHexPrefix(assetAddress),
    abi: erc20ABI,
    walletClient: walletClient
  })
  const allowance = await assetContract.read.allowance([account.address, stringUtils.addHexPrefix(spender)])
  let hash = ''
  if (allowance <= amount) {
    const _approve = async (amount: bigint) =>
      await assetContract.write.approve([stringUtils.addHexPrefix(spender), amount])
    if (requiresReset && !BigNumber(allowance.toString()).isZero()) {
      await _approve(0n)
    }
    await _approve(amount)
  }
  return hash
}

export { approveTransaction, getBigInt }