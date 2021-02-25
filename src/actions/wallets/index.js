import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import { connectWithBscWallet, disconnectFromBscWallet } from './bsc'
import { connectWithPolygonWallet, disconnectFromPolygonWallet } from './polygon'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_EOS_MAINNET,
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
  PPNK_ON_EOS_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  WALLET_RESET_ISSUER,
  WALLET_RESET_REDEEMER
} from '../../constants'
import { Mutex } from 'async-mutex'
import store from '../../store'

const mutex = new Mutex()

const connectWithSpecificWallet = (_role, _force) => {
  return async _dispatch => {
    const release = await mutex.acquire()

    const {
      pTokens: { selected: pToken }
    } = store.getState()

    switch (pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PBTC_ON_TELOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PMKR_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PLINK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PNT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PYFI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PTERIA_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PUNI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PBAND_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PBAL_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PCOMP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PSNX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case POMG_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PDAI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PANT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PLRC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PUOS_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PBAT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PREP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PZRX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PPNK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      case PDOGE_ON_ETH_MAINNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PEOS_ON_ETH_MAINNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEosWallet(pToken, 'issuer', _dispatch, _force)
        }
        break
      }
      case PBTC_ON_BSC_MAINNET: {
        if (_role === 'redeemer') connectWithBscWallet(pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PEOS_ON_POLYGON_MAINNET: {
        if (_role === 'redeemer') connectWithPolygonWallet(pToken, 'redeemer', null, _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEosWallet(pToken, 'issuer', _dispatch, _force)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

const disconnectFromSpecificWallet = _role => {
  return async _dispatch => {
    const release = await mutex.acquire()

    const {
      pTokens: { selected: pToken }
    } = store.getState()

    switch (pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        break
      }
      case PBTC_ON_TELOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PLINK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PYFI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PMKR_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PNT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PTERIA_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PUNI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PBAND_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PBAL_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PCOMP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PSNX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case POMG_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PDAI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PANT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PLRC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PUOS_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PBAT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PREP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PZRX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PPNK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') disconnectFromEosWallet(pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      case PDOGE_ON_ETH_MAINNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PEOS_ON_ETH_MAINNET: {
        if (_role === 'redeemer') disconnectFromEthWallet('redeemer', null, _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEosWallet(pToken, 'issuer', _dispatch)
        }
        break
      }
      case PBTC_ON_BSC_MAINNET: {
        if (_role === 'redeemer') disconnectFromBscWallet('redeemer', null, _dispatch)
        break
      }
      case PEOS_ON_POLYGON_MAINNET: {
        if (_role === 'redeemer') disconnectFromPolygonWallet('redeemer', null, _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEosWallet(pToken, 'issuer', _dispatch)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

const changeSpecificWallet = _role => {
  return async _dispatch => {
    const release = await mutex.acquire()

    const {
      pTokens: { selected: pToken }
    } = store.getState()

    switch (pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        break
      }
      case PBTC_ON_TELOS_MAINNET: {
        connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PNT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PMKR_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PYFI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PLINK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PTERIA_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PUNI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PBAL_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PBAND_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PCOMP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PSNX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case POMG_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PDAI_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PANT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PLRC_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PUOS_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PBAT_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PREP_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PZRX_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PPNK_ON_EOS_MAINNET: {
        if (_role === 'redeemer') connectWithEosWallet(pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      case PDOGE_ON_ETH_MAINNET: {
        connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PEOS_ON_ETH_MAINNET: {
        if (_role === 'redeemer') connectWithEthWallet(pToken, 'redeemer', null, _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEosWallet(pToken, 'issuer', _dispatch, true)
        }
        break
      }
      case PBTC_ON_BSC_MAINNET: {
        connectWithBscWallet(pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PEOS_ON_POLYGON_MAINNET: {
        if (_role === 'redeemer') connectWithPolygonWallet(pToken, 'redeemer', null, _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEosWallet(pToken, 'issuer', _dispatch, true)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

const resetIssuer = () => {
  return {
    type: WALLET_RESET_ISSUER,
    payload: {}
  }
}

const resetRedeemer = () => {
  return {
    type: WALLET_RESET_REDEEMER,
    payload: {}
  }
}

export {
  //connectWithCorrectWallets,
  connectWithSpecificWallet,
  disconnectFromSpecificWallet,
  changeSpecificWallet,
  resetIssuer,
  resetRedeemer
}
