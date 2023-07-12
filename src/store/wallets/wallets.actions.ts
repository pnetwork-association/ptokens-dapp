import { Blockchain } from 'ptokens'

import { AppDispatch, AppThunk } from '..'
import { sendEvent } from '../../ga4'

import { connectWithEvmWallet, disconnectFromEvmWallet } from './evm'

const connectWithWallet =
  (_blockchain: Blockchain): AppThunk =>
  (_dispatch: AppDispatch) => {
    switch (_blockchain) {
      case Blockchain.Gnosis:
      case Blockchain.Arbitrum: {
        _dispatch(connectWithEvmWallet(_blockchain))
        break
      }
      default:
        break
    }
    sendEvent('wallet_connection', { blockchain: _blockchain })
  }

const disconnectFromWallet = (_blockchain: Blockchain) => (_dispatch: AppDispatch) => {
  switch (_blockchain) {
    case Blockchain.Gnosis:
    case Blockchain.Arbitrum: {
      _dispatch(disconnectFromEvmWallet())
      break
    }
    default:
      break
  }
  sendEvent('wallet_disconnection', { blockchain: _blockchain })
}

export { connectWithWallet, disconnectFromWallet }
