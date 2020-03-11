import settings from '../settings'

const getCorrespondingExplorerLink = (
  _pTokenName,
  _network,
  _role,
  _address
) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}account/${_address}`
        : `${settings.peos.eth.etherscanLink}address/${_address}`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc[_network].btc.explorer}`
        : `${settings.pbtc[_network].eth.etherscanLink}address/${_address}`
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}`
        : `${settings.pltc.eth.etherscanLink}address/${_address}`
    default:
      break
  }
}

const getCorrespondingBaseTxExplorerLink = (_pTokenName, _network, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}transaction/`
        : `${settings.peos.eth.etherscanLink}tx/`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc[_network].btc.explorer}tx/`
        : `${settings.pbtc[_network].eth.etherscanLink}tx/`
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}tx/`
        : `${settings.pltc.eth.etherscanLink}tx/`
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }
