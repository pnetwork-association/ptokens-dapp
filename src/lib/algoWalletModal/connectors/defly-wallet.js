import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { EventEmitter } from 'eventemitter3'

class Provider extends EventEmitter {
  constructor(_deflyWallet, _accounts) {
    super()
    this.deflyWallet = _deflyWallet
    this.accounts = _accounts
    this.type = 'DeflyWallet'
  }

  close() {
    this.deflyWallet.disconnect()
    return
  }

  async signTxn(_txns) {
    const a = await this.deflyWallet.signTransaction([_txns.map((_tx) => ({ txn: _tx }))])
    return a.map((_a) => Buffer.from(_a).toString('base64'))
  }

  async getAccounts() {
    return this.accounts
  }
}

const connectToDeflyWallet = async () => {
  const deflyWallet = new DeflyWalletConnect()
  let accounts = []
  try {
    accounts = await deflyWallet.connect()
  } catch (err) {
    if (err.message === 'Session currently connected') accounts = await deflyWallet.reconnectSession()
    else console.error(err)
  }
  const provider = new Provider(deflyWallet, accounts)
  return provider
}

export default connectToDeflyWallet
