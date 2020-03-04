import settings from '../settings'

const PEOS_ETH_SMART_CONTRACT_ADDRESS =
  '0x4AEAFc6F72eD16665a70A45297500a0BD9d8c2F0'
const PEOS_EOS_SMART_CONTRACT_ADDRESS = 'provabletokn'

const PLTC_ETH_SMART_CONTRACT_ADDRESS =
  '0xedf3b98dd7be8ea05c03808c0e80f7fed0215606'
const PLTC_ENCLAVE_PUBKEY =
  '03bb03a76bf323347553a6d4934cf996117470425c2e282f98d8b02de333d67fef'

const getCorrespondingSmartContractAddress = (_pTokenName, _network, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? PEOS_EOS_SMART_CONTRACT_ADDRESS
        : PEOS_ETH_SMART_CONTRACT_ADDRESS
    case 'pBTC':
      return _role === 'issuer'
        ? settings[_pTokenName.toLowerCase()][_network].btc.publicKey
        : settings[_pTokenName.toLowerCase()][_network].eth.contractAddress
    case 'pLTC':
      return _role === 'issuer'
        ? PLTC_ENCLAVE_PUBKEY
        : PLTC_ETH_SMART_CONTRACT_ADDRESS
    default:
      break
  }
}

const getCorrespondingExplorerLink = (_pTokenName, _network, _role) => {
  switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}account/${PEOS_EOS_SMART_CONTRACT_ADDRESS}`
        : `${settings.peos.eth.etherscanLink}address/${PEOS_ETH_SMART_CONTRACT_ADDRESS}`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc[_network].btc.explorer}`
        : `${settings.pbtc[_network].eth.etherscanLink}address/${
            settings[_pTokenName.toLowerCase()][_network].eth.contractAddress
          }`
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}`
        : `${settings.pltc.eth.etherscanLink}address/${PLTC_ETH_SMART_CONTRACT_ADDRESS}`
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

export {
  getCorrespondingSmartContractAddress,
  getCorrespondingExplorerLink,
  getCorrespondingBaseTxExplorerLink
}
