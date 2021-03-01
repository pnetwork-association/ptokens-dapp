import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import { connectWithBscWallet, disconnectFromBscWallet } from './bsc'
/*import { connectWithPolygonWallet, disconnectFromPolygonWallet } from './polygon'
import { connectWithXdaiWallet, disconnectFromXdaiWallet } from './xdai'*/

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
      case 'BSC': {
        connectWithBscWallet(_dispatch)
        break
      }
      default:
        break
    }
  }
}

export { connectWithWallet }
