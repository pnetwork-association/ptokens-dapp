import {
  WALLET_ARBITRUM_CONNECTED,
  WALLET_ARBITRUM_DISCONNECTED,
  WALLET_ARBITRUM_ACCOUNT_CHANGED,
  WALLET_ETH_CONNECTED,
  WALLET_ETH_ACCOUNT_CHANGED,
  WALLET_EOS_CONNECTED,
  WALLET_BSC_CONNECTED,
  WALLET_BSC_ACCOUNT_CHANGED,
  WALLET_POLYGON_CONNECTED,
  WALLET_POLYGON_ACCOUNT_CHANGED,
  WALLET_XDAI_ACCOUNT_CHANGED,
  WALLET_XDAI_CONNECTED,
  WALLET_TELOS_CONNECTED,
  WALLET_LIBRE_CONNECTED,
  WALLET_ULTRA_CONNECTED,
  WALLET_ETH_DISCONNECTED,
  WALLET_BSC_DISCONNECTED,
  WALLET_POLYGON_DISCONNECTED,
  WALLET_XDAI_DISCONNECTED,
  WALLET_EOS_DISCONNECTED,
  WALLET_ULTRA_DISCONNECTED,
  WALLET_TELOS_DISCONNECTED,
  WALLET_LIBRE_DISCONNECTED,
  WALLET_LUXOCHAIN_CONNECTED,
  WALLET_LUXOCHAIN_DISCONNECTED,
  WALLET_LUXOCHAIN_ACCOUNT_CHANGED,
  WALLET_ALGORAND_ACCOUNT_CHANGED,
  WALLET_ALGORAND_CONNECTED,
  WALLET_ALGORAND_DISCONNECTED,
  WALLET_FTM_CONNECTED,
  WALLET_FTM_ACCOUNT_CHANGED,
  WALLET_FTM_DISCONNECTED,
  WALLET_ORE_CONNECTED,
  WALLET_ORE_DISCONNECTED
} from '../../constants/index'

const initialState = {
  arbitrum: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  eth: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  algorand: {
    provider: null,
    account: null,
    network: null
  },
  eos: {
    provider: null,
    account: null,
    network: null,
    permission: null
  },
  telos: {
    provider: null,
    account: null,
    network: null,
    permission: null
  },
  libre: {
    provider: null,
    account: null,
    network: null,
    permission: null
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
  },
  ultra: {
    provider: null,
    account: null,
    network: null,
    permission: null
  },
  luxochain: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  ftm: {
    provider: null,
    account: null,
    chainId: null,
    network: null
  },
  ore: {
    provider: null,
    account: null,
    network: null,
    permission: null
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
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      eos: {
        provider,
        account,
        network,
        permission
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
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      telos: {
        provider,
        account,
        network,
        permission
      }
    })
  }
  if (_action.type === WALLET_LIBRE_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      libre: {
        provider,
        account,
        network,
        permission
      }
    })
  }
  if (_action.type === WALLET_ORE_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      ore: {
        provider,
        account,
        network,
        permission
      }
    })
  }
  if (_action.type === WALLET_ULTRA_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      ultra: {
        provider,
        account,
        network,
        permission
      }
    })
  }
  if (_action.type === WALLET_ETH_DISCONNECTED) {
    return Object.assign({}, _state, {
      eth: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_BSC_DISCONNECTED) {
    return Object.assign({}, _state, {
      bsc: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_POLYGON_DISCONNECTED) {
    return Object.assign({}, _state, {
      polygon: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_XDAI_DISCONNECTED) {
    return Object.assign({}, _state, {
      xdai: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_EOS_DISCONNECTED) {
    return Object.assign({}, _state, {
      eos: {
        provider: null,
        account: null,
        network: null,
        permission: null
      }
    })
  }
  if (_action.type === WALLET_ORE_DISCONNECTED) {
    return Object.assign({}, _state, {
      ore: {
        provider: null,
        account: null,
        network: null,
        permission: null
      }
    })
  }
  if (_action.type === WALLET_TELOS_DISCONNECTED) {
    return Object.assign({}, _state, {
      telos: {
        provider: null,
        account: null,
        network: null,
        permission: null
      }
    })
  }
  if (_action.type === WALLET_LIBRE_DISCONNECTED) {
    return Object.assign({}, _state, {
      libre: {
        provider: null,
        account: null,
        network: null,
        permission: null
      }
    })
  }
  if (_action.type === WALLET_ULTRA_DISCONNECTED) {
    return Object.assign({}, _state, {
      ultra: {
        provider: null,
        account: null,
        network: null,
        permission: null
      }
    })
  }
  if (_action.type === WALLET_ARBITRUM_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      arbitrum: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_ARBITRUM_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      arbitrum: {
        ..._state.arbitrum,
        account
      }
    })
  }
  if (_action.type === WALLET_ARBITRUM_DISCONNECTED) {
    return Object.assign({}, _state, {
      arbitrum: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      luxochain: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      luxochain: {
        ..._state.luxochain,
        account
      }
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_DISCONNECTED) {
    return Object.assign({}, _state, {
      luxochain: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_ALGORAND_DISCONNECTED) {
    return Object.assign({}, _state, {
      algorand: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_ALGORAND_CONNECTED) {
    const { provider, account, network } = _action.payload
    return Object.assign({}, _state, {
      algorand: {
        provider,
        account,
        network
      }
    })
  }
  if (_action.type === WALLET_ALGORAND_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      algorand: {
        ..._state.algorand,
        account
      }
    })
  }
  if (_action.type === WALLET_ALGORAND_DISCONNECTED) {
    return Object.assign({}, _state, {
      algorand: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  if (_action.type === WALLET_FTM_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      ftm: {
        provider,
        account,
        network,
        chainId
      }
    })
  }
  if (_action.type === WALLET_FTM_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      ftm: {
        ..._state.eth,
        account
      }
    })
  }
  if (_action.type === WALLET_FTM_DISCONNECTED) {
    return Object.assign({}, _state, {
      ftm: {
        provider: null,
        account: null,
        network: null
      }
    })
  }
  return _state
}

export default walletsReducer
