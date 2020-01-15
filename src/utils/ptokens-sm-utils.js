import settings from '../settings'

const PEOS_ETH_SMART_CONTRACT_ADDRESS = '0x4AEAFc6F72eD16665a70A45297500a0BD9d8c2F0'
const PEOS_EOS_SMART_CONTRACT_ADDRESS = 'provabletokn'

const PBTC_ETH_SMART_CONTRACT_ADDRESS = '0xc361ed03d162a5084741cfb49ab4caccad47cab9'
const PBTC_ENCLAVE_PUBKEY = '02e21d574235545c47f36d3507a2416b2ae06efa182d7795a8ed85551a081038a0'

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