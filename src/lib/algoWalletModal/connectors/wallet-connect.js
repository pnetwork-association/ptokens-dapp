import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import { EventEmitter } from 'eventemitter3'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'

class Provider extends EventEmitter {
  constructor(_connector) {
    super()
    this.connector = _connector
    this.type = 'WalletConnect'
  }

  close() {
    this.connector.killSession()
  }

  async signTxn(_txns) {
    return this.connector.sendCustomRequest(formatJsonRpcRequest('algo_signTxn', [_txns]))
  }

  getAccounts() {
    return this.connector.accounts
  }
}

const connectToWalletConnect = ({ bridge }) =>
  new Promise((_resolve, _reject) => {
    try {
      const connector = new WalletConnect({
        bridge: bridge,
        qrcodeModal: QRCodeModal
      })

      const provider = new Provider(connector)

      if (!connector.connected) {
        connector.createSession()
      } else {
        _resolve(provider)
      }

      connector.on('connect', (_error, _payload) => {
        if (_error) {
          throw _error
        }

        _resolve(provider)
      })

      connector.on('session_update', (_error, _payload) => {
        if (_error) {
          throw _error
        }

        provider.emit('accountsChanged', _payload)
      })

      connector.on('disconnect', (_error, _payload) => {
        if (_error) {
          throw _error
        }

        provider.emit('disconnect')
      })
    } catch (_err) {
      _reject(_err)
    }
  })

export default connectToWalletConnect
