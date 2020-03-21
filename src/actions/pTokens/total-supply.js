import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { makeContractCall } from '../../utils/eth'
import pTokenAbi from '../../utils/eth-contract-abi'
import Web3 from 'web3'

const getEthTotalSupply = async (_pToken, _account) => {
  const provider = getCorrespondingReadOnlyProvider(_pToken)
  const web3 = new Web3(provider)
  const res = await makeContractCall(
    web3,
    'totalSupply',
    _pToken.nodeInfo.contractAddress,
    pTokenAbi,
    []
  )

  return (res / Math.pow(10, _pToken.contractDecimals)).toFixed(
    _pToken.realDecimals
  )
}

export { getEthTotalSupply }
