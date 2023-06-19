import store from '../index'

const getProviderByBlockchain = (_blockchain) => store.getState().wallets[_blockchain].provider
const getAccountByBlockchain = (_blockchain) => store.getState().wallets[_blockchain].account

export { getProviderByBlockchain, getAccountByBlockchain }
