import MyAlgoConnect from '@randlabs/myalgo-connect'
import { EventEmitter } from 'eventemitter3'

class Provider extends EventEmitter {
  constructor(myAlgoConnect, accountsSharedByUser) {
    super()
    this.myAlgoConnect = myAlgoConnect
    this.accountsSharedByUser = accountsSharedByUser
    this.type = 'MyAlgo'
  }

  close() {
    return
  }

  signTxn(_txns) {
    return this.myAlgoConnect.signTransaction(_txns.map((_tx) => _tx.toByte()))
  }

  sign(_tx) {
    return this.myAlgoConnect.signTransaction(_tx)
  }

  async getAccounts() {
    return this.accountsSharedByUser.map((_el) => _el.address)
  }
}

const ConnectToMyAlgoWallet = async () => {
  const myAlgoConnect = new MyAlgoConnect()
  try {
    const accountsSharedByUser = await myAlgoConnect.connect()
    const provider = new Provider(myAlgoConnect, accountsSharedByUser)
    return provider
  } catch (err) {
    console.error(err)
  }
}

export default ConnectToMyAlgoWallet
