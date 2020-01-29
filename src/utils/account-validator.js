import Web3 from 'web3'
import settings from '../settings'
import pTokenUtils from 'ptokens/node_modules/ptokens-utils'

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    settings.peos.eth.wsInfuraEndpoint + settings.peos.eth.infuraProjectId
  )
)

const isValidAccount = (_pTokenName, _account, _role) => {
  switch (_pTokenName) {
    case 'pEOS': {
      return _role === 'issuer'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(_account)
    }
    case 'pBTC': {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(_account)
    }
    default:
      break
  }
}

export { isValidAccount }
