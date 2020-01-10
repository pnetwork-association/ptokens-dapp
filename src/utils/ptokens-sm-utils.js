import settings from '../settings'

const PEOS_ETH_SMART_CONTRACT_ADDRESS = '0x4AEAFc6F72eD16665a70A45297500a0BD9d8c2F0'
const PEOS_EOS_SMART_CONTRACT_ADDRESS = 'provabletokn'

const PBTC_ETH_SMART_CONTRACT_ADDRESS = '0xb070c3e0e4af9b125880a4a6ab0000ea0ebf06c5'
const PBTC_ENCLAVE_PUBKEY = '02808e5df4f98d1f9eef1b40d90a3854a5c9e54a9d0e0671d89394f6007096bf0e'

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