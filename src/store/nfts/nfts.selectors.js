import store from '../index'

const getProviderByBlockchain = (_blockchain) => store.getState().wallets[_blockchain.toLowerCase()].provider
const getAccountByBlockchain = (_blockchain) => store.getState().wallets[_blockchain.toLowerCase()].account

export { getProviderByBlockchain, getAccountByBlockchain }
