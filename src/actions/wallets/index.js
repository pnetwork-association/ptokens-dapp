import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import { connectWithBscWallet, disconnectFromBscWallet } from './bsc'
import { connectWithPolygonWallet, disconnectFromPolygonWallet } from './polygon'
import { connectWithXdaiWallet, disconnectFromXdaiWallet } from './xdai'
import { connectWithTelosWallet, disconnectFromTelosWallet } from './telos'

const connectWithWallet = _blockchain => {
  return async _dispatch => {
    switch (_blockchain) {
      case 'ETH': {
        connectWithEthWallet(_dispatch)
        break
      }
      case 'EOS': {
        connectWithEosWallet(_dispatch)
        break
      }
      case 'TELOS': {
        connectWithTelosWallet(_dispatch)
        break
      }
      case 'BSC': {
        connectWithBscWallet(_dispatch)
        break
      }
      case 'POLYGON': {
        connectWithPolygonWallet(_dispatch)
        break
      }
      case 'XDAI': {
        connectWithXdaiWallet(_dispatch)
        break
      }
      default:
        break
    }
  }
}

const disconnectFromWallet = _blockchain => {
  return async _dispatch => {
    switch (_blockchain) {
      case 'ETH': {
        disconnectFromEthWallet(_dispatch)
        break
      }
      case 'EOS': {
        disconnectFromEosWallet(_dispatch)
        break
      }
      case 'TELOS': {
        disconnectFromTelosWallet(_dispatch)
        break
      }
      case 'BSC': {
        disconnectFromBscWallet(_dispatch)
        break
      }
      case 'POLYGON': {
        disconnectFromPolygonWallet(_dispatch)
        break
      }
      case 'XDAI': {
        disconnectFromXdaiWallet(_dispatch)
        break
      }
      default:
        break
    }
  }
}

export { connectWithWallet, disconnectFromWallet }
