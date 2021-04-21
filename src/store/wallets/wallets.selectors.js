import store from '../index'

const getWallets = () => store.getState().wallets

const getWalletByBlockchain = _blockchain => store.getState().wallets[_blockchain.toLowerCase()]

const getWalletAccountByBlockchain = _blockchain => store.getState().wallets[_blockchain.toLowerCase()].account

const getWalletPermissionByBlockchain = _blockchain => store.getState().wallets[_blockchain.toLowerCase()].permission

export { getWallets, getWalletByBlockchain, getWalletAccountByBlockchain, getWalletPermissionByBlockchain }
