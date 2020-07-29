const pBTCRedeemerNetworks = ['ropsten', 'main', 'eos'] //remove eos
const pLTCRedeemerNetworks = ['ropsten', 'main']
const pEOSRedeemerNetworks = ['kovan']

const getNetworkCorrectness = (_pTokenName, _network, _role) => {
  if (_pTokenName === 'pEOS' && _role === 'redeemer') {
    return pEOSRedeemerNetworks.includes(_network)
  }

  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return pBTCRedeemerNetworks.includes(_network)
  }

  if (_pTokenName === 'pLTC' && _role === 'redeemer') {
    return pLTCRedeemerNetworks.includes(_network)
  }
}

export { getNetworkCorrectness }
