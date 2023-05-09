import ERC20Abi from '../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { stringUtils } from 'ptokens-helpers'

// NOTE: avoids brave metamask gas estimation fails
function getBigNumber(amount, decimals) {
  return BigNumber(amount)
    .multipliedBy(10 ** decimals)
    .toFixed()
}

// requiresReset is needed to be true in case of USDT
async function approveTransaction(spender, tokenAddress, amount, web3, requiresReset = false) {
  const account = await web3.eth.getAccounts()
  const toApprove = new web3.eth.Contract(ERC20Abi, stringUtils.addHexPrefix(tokenAddress))
  const allowance = await toApprove.methods.allowance(account[0], stringUtils.addHexPrefix(spender)).call()
  let hash = ''
  if (!BigNumber(allowance).isGreaterThanOrEqualTo(amount)) {
    const _approve = (amount) =>
      toApprove.methods
        .approve(stringUtils.addHexPrefix(spender), amount)
        .send({ from: account[0] })
        .once('hash', (_hash) => {
          hash = _hash
        })
    if (requiresReset && !BigNumber(allowance).isZero()) {
      await _approve(0)
    }
    await _approve(amount)
  }
  return hash
}

export { approveTransaction, getBigNumber }
