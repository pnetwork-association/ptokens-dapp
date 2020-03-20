import Web3 from 'web3'
import pTokenUtils from 'ptokens/node_modules/ptokens-utils'

const web3 = new Web3()

const isValidAccount = (_pTokenName, _account, _role) => {
  switch (_pTokenName) {
    case 'pEOS': {
      return _role === 'issuer'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case 'pBTC': {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case 'pLTC': {
      return _role === 'issuer'
        ? pTokenUtils.ltc.isValidAddress('testnet', _account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    default:
      break
  }
}

export { isValidAccount }
