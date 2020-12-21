const getContract = (_web3, _abi, _contractAddress, _account) => {
  const contract = new _web3.eth.Contract(_abi, _contractAddress, {
    defaultAccount: _account
  })
  return contract
}

const getAccount = _web3 =>
  new Promise((resolve, reject) => {
    _web3.eth
      .getAccounts()
      .then(accounts => resolve(accounts[0]))
      .catch(err => reject(err))
  })

const makeContractCall = async (_web3, _method, _contractAddress, _abi, _params = []) => {
  try {
    const account = await getAccount(_web3)
    const contract = getContract(_web3, _abi, _contractAddress, account)
    const res = await contract.methods[_method](..._params).call()
    return res
  } catch (err) {
    throw new Error(err.message)
  }
}

export { makeContractCall }
