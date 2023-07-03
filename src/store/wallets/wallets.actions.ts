import { Blockchain } from 'ptokens'

import { AppDispatch } from '..'
import { sendEvent } from '../../ga4'

import { connectWithEvmWallet, disconnectFromEvmWallet } from './evm'

const connectWithWallet = (_blockchain: Blockchain) => (_dispatch: AppDispatch) => {
  console.info('connectWithWallet', _blockchain, _blockchain === 11, typeof _blockchain)
  switch (_blockchain) {
    case Blockchain.Gnosis:
    case Blockchain.Arbitrum: {
      console.info('fgfff')
      _dispatch(connectWithEvmWallet(_blockchain))
      break
    }
    default:
      console.info('ccccc')
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
