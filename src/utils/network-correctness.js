const pBTCRedeemerNetworks = ['ropsten', 'main', 'eos', 'telos'] //remove eos
const pLTCRedeemerNetworks = ['ropsten', 'main']
const pETHRedeemerNetworks = ['eos']
const PNTRedeemerNetworks = ['eos']
const pLINKRedeemerNetworks = ['eos']
const pMKRRedeemerNetworks = ['eos']
const pYFIRedeemerNetworks = ['eos']
const PTERIAedeemerNetworks = ['eos']

const getNetworkCorrectness = (_pTokenName, _network, _role) => {
  if (_pTokenName === 'pETH' && _role === 'redeemer') {
    return pETHRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pLINK' && _role === 'redeemer') {
    return pLINKRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pYFI' && _role === 'redeemer') {
    return pYFIRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'PNT' && _role === 'redeemer') {
    return PNTRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'PTERIA' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pUNI' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pBAND' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pBAL' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pCOMP' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pSNX' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pOMG' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pDAI' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pANT' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pLRC' && _role === 'redeemer') {
    return PTERIAedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pMKR' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pUOS' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pBAT' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pREP' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pZRX' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pPNK' && _role === 'redeemer') {
    return pMKRRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return pBTCRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pLTC' && _role === 'redeemer') {
    return pLTCRedeemerNetworks.includes(_network)
  }
  if (_pTokenName === 'pDOGE' && _role === 'redeemer') {
    return pBTCRedeemerNetworks.includes(_network)
  }
}

export { getNetworkCorrectness }
