import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { makeContractCall } from '../../utils/eth'
import pTokenAbi from '../../utils/eth-contract-abi'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

const getEthBalance = async (_pToken, _account) => {
  const provider = getCorrespondingReadOnlyProvider(_pToken)
  const web3 = new Web3(provider)
  const onChainBalance = await makeContractCall(web3, 'balanceOf', _pToken.nodeInfo.contractAddress, pTokenAbi, [
    _account
  ])

  return BigNumber(onChainBalance)
    .dividedBy(10 ** _pToken.contractDecimals)
    .toFixed()
}

const getEosBalance = async (_pToken, _account) => {
  if (!_account) return null

  const provider = getCorrespondingReadOnlyProvider(_pToken)
  const balance = await provider.get_currency_balance(
    _pToken.nodeInfo.contractAddress,
    _account,
    _pToken.name.toUpperCase()
  )
  return parseFloat(balance[0].split(' ')[0])
}

export { getEthBalance, getEosBalance }
