import { EventEmitter } from 'eventemitter3'
// import { PeraWalletConnect } from '@perawallet/connect'

class Provider extends EventEmitter {
  constructor(_peraWallet, _accounts) {
    super()
    this.peraWallet = _peraWallet
    this.accounts = _accounts
    this.type = 'PeraWallet'
  }

  close() {
    this.peraWallet.disconnect()
    return
  }

  async signTxn(_txns) {
    const a = await this.peraWallet.signTransaction([_txns.map(_tx => ({ txn: _tx }))])
    return a.map(_a => Buffer.from(_a).toString('base64'))
  }

  async getAccounts() {
    return this.accounts
  }
}

const connectToPeraWallet = async () => {
  // const peraWallet = new PeraWalletConnect()
  let accounts = []
  try {
    // accounts = await peraWallet.connect()
  } catch (err) {
    // accounts = await peraWallet.reconnectSession()
  }
  // const provider = new Provider(peraWallet, accounts)
  return provider
}

export default connectToPeraWallet
