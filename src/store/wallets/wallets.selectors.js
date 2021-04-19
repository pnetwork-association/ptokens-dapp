import store from '../index'

const getWallets = () => store.getState().wallets

const getWalletByBlockchain = _blockchain => store.getState().wallets[_blockchain.toLowerCase()]

export { getWallets, getWalletByBlockchain }
