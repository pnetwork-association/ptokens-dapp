import Web3 from 'web3'
import pTokenUtils from 'ptokens/node_modules/ptokens-utils'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET
} from '../constants'

const web3 = new Web3()

const isValidAccount = (_pToken, _account, _role) => {
  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? pTokenUtils.ltc.isValidAddress(_account)
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? pTokenUtils.ltc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? pTokenUtils.ltc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    default:
      break
  }
}

export { isValidAccount }
