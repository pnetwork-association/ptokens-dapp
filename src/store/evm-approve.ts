import BigNumber from 'bignumber.js'
import { stringUtils } from 'ptokens-helpers'
import { Web3 } from 'web3'

import ERC20Abi from '../utils/abi/ERC20'

// NOTE: avoids brave metamask gas estimation fails
function getBigNumber(amount: BigNumber.Value, decimals: number) {
  return BigNumber(amount)
    .multipliedBy(10 ** decimals)
    .toFixed()
}

// requiresReset is needed to be true in case of USDT
async function approveTransaction(
  spender: string,
  tokenAddress: string,
  amount: BigNumber.Value,
  web3: Web3,
  requiresReset = false
) {
  const account = await web3.eth.getAccounts()
  const toApprove = new web3.eth.Contract(ERC20Abi, stringUtils.addHexPrefix(tokenAddress))
  const allowance = await toApprove.methods.allowance(account[0], stringUtils.addHexPrefix(spender)).call()
  let hash = ''
  if (!BigNumber(allowance.toString()).isGreaterThanOrEqualTo(amount)) {
    const _approve = (amount: BigNumber.Value) =>
      toApprove.methods
        .approve(stringUtils.addHexPrefix(spender), amount.toString())
        .send({ from: account[0] })
        .on('transactionHash', (_hash) => {
          hash = _hash
        })
    if (requiresReset && !BigNumber(allowance.toString()).isZero()) {
      await _approve(0)
    }
    await _approve(amount)
  }
  return hash
}

export { approveTransaction, getBigNumber }
