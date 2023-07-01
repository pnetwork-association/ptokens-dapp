import { Blockchain } from 'ptokens'

import { sendEvent } from '../../ga4'

import { connectWithArbitrumWallet, disconnectFromArbitrumWallet } from './arbitrum'
import { connectWithXdaiWallet, disconnectFromXdaiWallet } from './xdai'

const connectWithWallet = (_blockchain) => {
  return async (_dispatch) => {
    switch (_blockchain) {
      case Blockchain.Gnosis: {
        connectWithXdaiWallet(_dispatch)
        break
      }
      case Blockchain.Arbitrum: {
        connectWithArbitrumWallet(_dispatch)
        break
      }
      default:
        break
    }
    sendEvent('wallet_connection', { blockchain: _blockchain })
  }
}

const disconnectFromWallet = (_blockchain) => {
  return async (_dispatch) => {
    switch (_blockchain) {
      case Blockchain.Gnosis: {
        disconnectFromXdaiWallet(_dispatch)
        break
      }
      case Blockchain.Arbitrum: {
        disconnectFromArbitrumWallet(_dispatch)
        break
      }
      default:
        break
    }
    sendEvent('wallet_disconnection', { blockchain: _blockchain })
  }
}

export { connectWithWallet, disconnectFromWallet }
