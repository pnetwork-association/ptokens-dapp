import settings from '../settings'

const PEOS_ETH_SMART_CONTRACT_ADDRESS = '0x4AEAFc6F72eD16665a70A45297500a0BD9d8c2F0'
const PEOS_EOS_SMART_CONTRACT_ADDRESS = 'provabletokn'

const PBTC_ETH_SMART_CONTRACT_ADDRESS = '0xa44e9294b5dec927518a8381e819ab6749d05fdb'
const PBTC_ENCLAVE_PUBKEY = '02c21940ae750e4c58380d2bd240e2bd1c5c9b5ef299965d0bde88dd07e10ad54b'

const getCorrespondingSmartContractAddress = (_pTokenName, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? PEOS_EOS_SMART_CONTRACT_ADDRESS
        : PEOS_ETH_SMART_CONTRACT_ADDRESS
      case 'pBTC':
        return _role === 'issuer'
          ? PBTC_ENCLAVE_PUBKEY
          : PBTC_ETH_SMART_CONTRACT_ADDRESS
    default: break
  }
}

const getCorrespondingExplorerLink = (_pTokenName, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}account/${PEOS_EOS_SMART_CONTRACT_ADDRESS}`
        : `${settings.peos.eth.etherscanLink}address/${PEOS_ETH_SMART_CONTRACT_ADDRESS}`
      case 'pBTC':
        return _role === 'issuer'
          ? `${settings.pbtc.btc.explorer}`
          : `${settings.pbtc.eth.etherscanLink}address/${PBTC_ETH_SMART_CONTRACT_ADDRESS}`
    default: break
  }
} 

const getCorrespondingBaseTxExplorerLink = (_pTokenName, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}transaction/`
        : `${settings.peos.eth.etherscanLink}tx/`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc.btc.explorer}tx/`
        : `${settings.pbtc.eth.etherscanLink}tx/`
    default: break
  }
} 

export {
  getCorrespondingSmartContractAddress,
  getCorrespondingExplorerLink,
  getCorrespondingBaseTxExplorerLink
}