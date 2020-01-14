const pBTCRedeemerNetworks = ['ropsten']
const pEOSRedeemerNetworks = ['kovan']

const getNetworkCorrectness = (_pTokenName, _network, _role) => {
  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return pBTCRedeemerNetworks.includes(_network)
  }

  if (_pTokenName === 'pEOS' && _role === 'redeemer') {
    return pEOSRedeemerNetworks.includes(_network)
  }
}

export {
  getNetworkCorrectness
}