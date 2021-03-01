import {
  WALLET_ETH_CONNECTED,
  WALLET_ETH_NETWORK_CHANGED,
  WALLET_ETH_ACCOUNT_CHANGED,
  WALLET_EOS_CONNECTED,
  WALLET_BSC_CONNECTED,
  WALLET_BSC_NETWORK_CHANGED,
  WALLET_BSC_ACCOUNT_CHANGED
} from '../../constants/index'

const initialState = {
  eth: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  eos: {
    provider: null,
    account: null,
    network: null
  },
  bsc: {
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
  if (_action.type === WALLET_ETH_NETWORK_CHANGED) {
    const { network, chainId } = _action.payload
    return Object.assign({}, _state, {
      eth: {
        ..._state.eth,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_ETH_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      eth: {
        ..._state.eth,
        account
      }
    })
  }
  if (_action.type === WALLET_EOS_CONNECTED) {
    const { provider, account, network } = _action.payload
    return Object.assign({}, _state, {
      eos: {
        provider,
        account,
        network
      }
    })
  }
  if (_action.type === WALLET_BSC_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      bsc: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_BSC_NETWORK_CHANGED) {
    const { network, chainId } = _action.payload
    return Object.assign({}, _state, {
      bsc: {
        ..._state.bsc,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_BSC_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      bsc: {
        ..._state.bsc,
        account
      }
    })
  }
  return _state
}

export default walletsReducer
