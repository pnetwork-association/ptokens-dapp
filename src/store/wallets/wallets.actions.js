import { connectWithArbitrumWallet, disconnectFromArbitrumWallet } from './arbitrum'
import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import { connectWithBscWallet, disconnectFromBscWallet } from './bsc'
import { connectWithPolygonWallet, disconnectFromPolygonWallet } from './polygon'
import { connectWithXdaiWallet, disconnectFromXdaiWallet } from './xdai'
import { connectWithTelosWallet, disconnectFromTelosWallet } from './telos'
import { connectWithLibreWallet, disconnectFromLibreWallet } from './libre'
import { connectWithUltraWallet, disconnectFromUltraWallet } from './ultra'
import { connectWithLuxochainWallet, disconnectFromLuxochainWallet } from './luxochain'
import { connectWithAlgorandWallet, disconnectFromAlgorandWallet } from './algorand'
import { connectWithFtmWallet, disconnectFromFtmWallet } from './ftm'
import { connectWithOreWallet, disconnectFromOreWallet } from './ore'
import { sendEvent } from '../../ga4'
import { Blockchain } from '../../constants'

const connectWithWallet = (_blockchain) => {
  return async (_dispatch) => {
    switch (_blockchain) {
      case Blockchain.Ethereum: {
        connectWithEthWallet(_dispatch)
        break
      }
      case Blockchain.EOS: {
        connectWithEosWallet(_dispatch)
        break
      }
      case Blockchain.Telos: {
        connectWithTelosWallet(_dispatch)
        break
      }
      case Blockchain.Libre: {
        connectWithLibreWallet(_dispatch)
        break
      }
      case Blockchain.BSC: {
        connectWithBscWallet(_dispatch)
        break
      }
      case Blockchain.Polygon: {
        connectWithPolygonWallet(_dispatch)
        break
      }
      case Blockchain.XDAI: {
        connectWithXdaiWallet(_dispatch)
        break
      }
      case Blockchain.Ultra: {
        connectWithUltraWallet(_dispatch)
        break
      }
      case Blockchain.Arbitrum: {
        connectWithArbitrumWallet(_dispatch)
        break
      }
      case Blockchain.Luxochain: {
        connectWithLuxochainWallet(_dispatch)
        break
      }
      case Blockchain.Algorand: {
        connectWithAlgorandWallet(_dispatch)
        break
      }
      case Blockchain.Fantom: {
        connectWithFtmWallet(_dispatch)
        break
      }
      case Blockchain.Ore: {
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
      case Blockchain.Ethereum: {
        disconnectFromEthWallet(_dispatch)
        break
      }
      case Blockchain.EOS: {
        disconnectFromEosWallet(_dispatch)
        break
      }
      case Blockchain.Telos: {
        disconnectFromTelosWallet(_dispatch)
        break
      }
      case Blockchain.Libre: {
        disconnectFromLibreWallet(_dispatch)
        break
      }
      case Blockchain.BSC: {
        disconnectFromBscWallet(_dispatch)
        break
      }
      case Blockchain.Polygon: {
        disconnectFromPolygonWallet(_dispatch)
        break
      }
      case Blockchain.XDAI: {
        disconnectFromXdaiWallet(_dispatch)
        break
      }
      case Blockchain.Ultra: {
        disconnectFromUltraWallet(_dispatch)
        break
      }
      case Blockchain.Arbitrum: {
        disconnectFromArbitrumWallet(_dispatch)
        break
      }
      case Blockchain.Luxochain: {
        disconnectFromLuxochainWallet(_dispatch)
        break
      }
      case Blockchain.Algorand: {
        disconnectFromAlgorandWallet(_dispatch)
        break
      }
      case Blockchain.Fantom: {
        disconnectFromFtmWallet(_dispatch)
        break
      }
      case Blockchain.Ore: {
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
