import settings from '../settings'

const PEOS_ETH_SMART_CONTRACT_ADDRESS =
  '0x4AEAFc6F72eD16665a70A45297500a0BD9d8c2F0'
const PEOS_EOS_SMART_CONTRACT_ADDRESS = 'provabletokn'

const PBTC_ETH_SMART_CONTRACT_ADDRESS =
  '0xdbc6bef940186d154f023023888b6c173483729d'
const PBTC_ENCLAVE_PUBKEY =
  '02157351e30cfcb2603cfbfaab4c87d795839c907c068c9710b2230e8af72bc9d7'

const PLTC_ETH_SMART_CONTRACT_ADDRESS =
  '0xedf3b98dd7be8ea05c03808c0e80f7fed0215606'
const PLTC_ENCLAVE_PUBKEY =
  '03bb03a76bf323347553a6d4934cf996117470425c2e282f98d8b02de333d67fef'

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
    case 'pLTC':
      return _role === 'issuer'
        ? PLTC_ENCLAVE_PUBKEY
        : PLTC_ETH_SMART_CONTRACT_ADDRESS
    default:
      break
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
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}`
        : `${settings.pltc.eth.etherscanLink}address/${PLTC_ETH_SMART_CONTRACT_ADDRESS}`
    default:
      break
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
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}tx/`
        : `${settings.pltc.eth.etherscanLink}tx/`
    default:
      break
  }
}

export {
  getCorrespondingSmartContractAddress,
  getCorrespondingExplorerLink,
  getCorrespondingBaseTxExplorerLink
}
