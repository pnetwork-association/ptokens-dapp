import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET
} from '../constants'

const getCorresponsingVisibleAddressFormat = (_pToken, _role, _account) => {
  if (!_account) return null

  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(
            _account.length - 4,
            _account.length
          )}`
        : `${_account.slice(0, 12)}...${_account.slice(
            _account.length - 9,
            _account.length
          )}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(
            _account.length - 4,
            _account.length
          )}`
        : `${_account.slice(0, 12)}...${_account.slice(
            _account.length - 9,
            _account.length
          )}`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(
            _account.length - 9,
            _account.length
          )}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(
            _account.length - 9,
            _account.length
          )}`
    }
    default:
      break
  }
}

export { getCorresponsingVisibleAddressFormat }
