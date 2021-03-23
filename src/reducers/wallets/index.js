import {
  WALLET_ETH_CONNECTED,
  WALLET_ETH_ACCOUNT_CHANGED,
  WALLET_EOS_CONNECTED,
  WALLET_BSC_CONNECTED,
  WALLET_BSC_ACCOUNT_CHANGED,
  WALLET_POLYGON_CONNECTED,
  WALLET_POLYGON_ACCOUNT_CHANGED,
  WALLET_XDAI_ACCOUNT_CHANGED,
  WALLET_XDAI_CONNECTED,
  WALLET_TELOS_CONNECTED
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
  telos: {
    provider: null,
    account: null,
    network: null
  },
  bsc: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  xdai: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  polygon: {
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
  if (_action.type === WALLET_BSC_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      bsc: {
        ..._state.bsc,
        account
      }
    })
  }
  if (_action.type === WALLET_XDAI_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      xdai: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_XDAI_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      xdai: {
        ..._state.xdai,
        account
      }
    })
  }
  if (_action.type === WALLET_POLYGON_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      polygon: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_POLYGON_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      polygon: {
        ..._state.polygon,
        account
      }
    })
  }
  if (_action.type === WALLET_TELOS_CONNECTED) {
    const { provider, account, network } = _action.payload
    return Object.assign({}, _state, {
      eos: {
        provider,
        account,
        network
      }
    })
  }
  return _state
}

export default walletsReducer
