import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { makeContractCall } from '../../utils/eth'
import pTokenAbi from '../../utils/eth-contract-abi'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

const getEthTotalSupply = async (_pToken, _address) => {
  try {
    const provider = getCorrespondingReadOnlyProvider(_pToken)
    const web3 = new Web3(provider)
    const res = await makeContractCall(web3, 'totalSupply', _address, pTokenAbi, [])

    return BigNumber(res)
      .dividedBy(10 ** _pToken.contractDecimals)
      .toFixed()
  } catch (_err) {
    console.error(_err)
  }
}

const getEosTotalSupply = async (_pToken, _address) => {
  try {
    const provider = getCorrespondingReadOnlyProvider(_pToken)
    const resp = await provider.get_table_rows({
      json: true,
      code: _address,
      scope: _pToken.name.toUpperCase(),
      table: 'stat',
      limit: 1
    })
    return resp.rows[0].supply.split(' ')[0]
  } catch (_err) {
    console.error(_err)
  }
}

export { getEthTotalSupply, getEosTotalSupply }
