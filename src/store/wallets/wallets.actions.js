import { sendEvent } from '../../ga4'

import { connectWithAlgorandWallet, disconnectFromAlgorandWallet } from './algorand'
import { connectWithArbitrumWallet, disconnectFromArbitrumWallet } from './arbitrum'
import { connectWithBscWallet, disconnectFromBscWallet } from './bsc'
import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import { connectWithFtmWallet, disconnectFromFtmWallet } from './ftm'
import { connectWithGnosisWallet, disconnectFromGnosisWallet } from './gnosis'
import { connectWithLibreWallet, disconnectFromLibreWallet } from './libre'
import { connectWithLuxochainWallet, disconnectFromLuxochainWallet } from './luxochain'
import { connectWithOreWallet, disconnectFromOreWallet } from './ore'
import { connectWithPolygonWallet, disconnectFromPolygonWallet } from './polygon'
import { connectWithTelosWallet, disconnectFromTelosWallet } from './telos'
import { connectWithUltraWallet, disconnectFromUltraWallet } from './ultra'

const connectWithWallet = (_blockchain) => {
  return async (_dispatch) => {
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
      case 'LIBRE': {
        connectWithLibreWallet(_dispatch)
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
      case 'GNOSIS': {
        connectWithGnosisWallet(_dispatch)
        break
      }
      case 'ULTRA': {
        connectWithUltraWallet(_dispatch)
        break
      }
      case 'ARBITRUM': {
        connectWithArbitrumWallet(_dispatch)
        break
      }
      case 'LUXOCHAIN': {
        connectWithLuxochainWallet(_dispatch)
        break
      }
      case 'ALGORAND': {
        connectWithAlgorandWallet(_dispatch)
        break
      }
      case 'FTM': {
        connectWithFtmWallet(_dispatch)
        break
      }
      case 'ORE': {
        connectWithOreWallet(_dispatch)
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
      case 'LIBRE': {
        disconnectFromLibreWallet(_dispatch)
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
      case 'GNOSIS': {
        disconnectFromGnosisWallet(_dispatch)
        break
      }
      case 'ULTRA': {
        disconnectFromUltraWallet(_dispatch)
        break
      }
      case 'ARBITRUM': {
        disconnectFromArbitrumWallet(_dispatch)
        break
      }
      case 'LUXOCHAIN': {
        disconnectFromLuxochainWallet(_dispatch)
        break
      }
      case 'ALGORAND': {
        disconnectFromAlgorandWallet(_dispatch)
        break
      }
      case 'FTM': {
        disconnectFromFtmWallet(_dispatch)
        break
      }
      case 'ORE': {
        disconnectFromOreWallet(_dispatch)
        break
      }
      default:
        break
    }
    sendEvent('wallet_disconnection', { blockchain: _blockchain })
  }
}

export { connectWithWallet, disconnectFromWallet }
