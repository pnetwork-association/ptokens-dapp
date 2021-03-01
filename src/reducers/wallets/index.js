import { WALLET_ETH_CONNECTED, WALLET_ETH_NETWORK_CHANGED, WALLET_ETH_ACCOUNT_CHANGED } from '../../constants/index'

const initialState = {
  eth: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  }
}

const walletsReducer = (_state = initialState, _action) => {
  if (_action.type === WALLET_ETH_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      eth: {
        provider,
        account,
        network,
        chainId
      }
    })
  }

  return _state
}

export default walletsReducer
