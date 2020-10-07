import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { makeContractCall } from '../../utils/eth'
import pTokenAbi from '../../utils/eth-contract-abi'
import Web3 from 'web3'

const getEthTotalSupply = async _pToken => {
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

const getEosTotalSupply = async _pToken => {
  const provider = getCorrespondingReadOnlyProvider(_pToken)
  const resp = await provider.get_table_rows({
    json: true,
    code: _pToken.nodeInfo.contractAddress,
    scope: _pToken.name.toUpperCase(),
    table: 'stat',
    limit: 1
  })
  return resp.rows[0].supply.split(' ')[0]
}

export { getEthTotalSupply, getEosTotalSupply }
