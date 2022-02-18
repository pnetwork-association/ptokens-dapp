import { EventEmitter } from 'eventemitter3'

class Provider extends EventEmitter {
  constructor(_algoSigner) {
    super()
    this.algoSigner = _algoSigner
  }

  close() {
    throw new Error('TODO')
  }

  sign(_txn) {
    return this.algoSigner.signTxn(_txn)
  }

  async getAccounts() {
    return Object.values(
      await this.algoSigner.accounts({
        ledger: 'MainNet'
      })
    ).map(({ address }) => address)
  }
}

const ConnectToAlgoSigner = async () => {
  if (typeof window.AlgoSigner === 'undefined') {
    throw new Error('AlgoSigner not installed')
  }

  await window.AlgoSigner.connect()

  const provider = new Provider(window.AlgoSigner)
  return provider
}

export default ConnectToAlgoSigner
