import store from '../index'

const getWallets = () => store.getState().wallets

const getWalletByBlockchain = (_blockchain) => store.getState().wallets[_blockchain]

const getWalletAccountByBlockchain = (_blockchain) => store.getState().wallets[_blockchain].account

const getWalletPermissionByBlockchain = (_blockchain) => store.getState().wallets[_blockchain].permission

const getWalletProviderByBlockchain = (_blockchain) => store.getState().wallets[_blockchain].provider

export {
  getWallets,
  getWalletByBlockchain,
  getWalletAccountByBlockchain,
  getWalletPermissionByBlockchain,
  getWalletProviderByBlockchain,
}
