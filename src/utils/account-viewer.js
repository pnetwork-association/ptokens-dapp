const getCorresponsingVisibleAddressFormat = (_pTokenName, _role, _account) => {
  if (!_account || !_pTokenName) return null

  switch (_pTokenName) {
    case 'pEOS': {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(
            _account.length - 4,
            _account.length
          )}`
        : _account
    }
    case 'pBTC': {
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
    case 'pLTC': {
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
    default:
      break
  }
}

export { getCorresponsingVisibleAddressFormat }
