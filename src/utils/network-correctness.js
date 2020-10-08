const pBTCRedeemerNetworks = ['ropsten', 'main', 'eos'] //remove eos
const pLTCRedeemerNetworks = ['ropsten', 'main']
const pETHRedeemerNetworks = ['eos']

const getNetworkCorrectness = (_pTokenName, _network, _role) => {
  if (_pTokenName === 'pETH' && _role === 'redeemer') {
    return pETHRedeemerNetworks.includes(_network)
  }

  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return pBTCRedeemerNetworks.includes(_network)
  }

  if (_pTokenName === 'pLTC' && _role === 'redeemer') {
    return pLTCRedeemerNetworks.includes(_network)
  }
}

export { getNetworkCorrectness }
