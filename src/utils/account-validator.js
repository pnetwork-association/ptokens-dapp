import Web3 from 'web3'
import pTokenUtils from 'ptokens/node_modules/ptokens-utils'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET,
  PTERIA_ON_EOS_MAINNET,
  PUNI_ON_EOS_MAINNET,
  PBAL_ON_EOS_MAINNET,
  PBAND_ON_EOS_MAINNET,
  PCOMP_ON_EOS_MAINNET,
  PSNX_ON_EOS_MAINNET,
  POMG_ON_EOS_MAINNET,
  PDAI_ON_EOS_MAINNET,
  PANT_ON_EOS_MAINNET,
  PLRC_ON_EOS_MAINNET,
  PUOS_ON_EOS_MAINNET,
  PBAT_ON_EOS_MAINNET,
  PREP_ON_EOS_MAINNET,
  PZRX_ON_EOS_MAINNET,
  PPNK_ON_EOS_MAINNET
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
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'issuer'
        ? pTokenUtils.btc.isValidAddress(_account)
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
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    default:
      break
  }
}

export { isValidAccount }
