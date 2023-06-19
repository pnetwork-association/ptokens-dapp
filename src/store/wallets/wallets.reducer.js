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
  WALLET_ORE_DISCONNECTED,
  Blockchain,
} from '../../constants/index'

const initialState = {
  [Blockchain.Arbitrum]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Ethereum]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Algorand]: {
    provider: null,
    account: null,
    network: null,
  },
  [Blockchain.EOS]: {
    provider: null,
    account: null,
    network: null,
    permission: null,
  },
  [Blockchain.Telos]: {
    provider: null,
    account: null,
    network: null,
    permission: null,
  },
  [Blockchain.Libre]: {
    provider: null,
    account: null,
    network: null,
    permission: null,
  },
  [Blockchain.BSC]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.XDAI]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Polygon]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Ultra]: {
    provider: null,
    account: null,
    network: null,
    permission: null,
  },
  [Blockchain.Luxochain]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Fantom]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Ore]: {
    provider: null,
    account: null,
    network: null,
    permission: null,
  },
}

const walletsReducer = (_state = initialState, _action) => {
  if (_action.type === WALLET_ETH_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Ethereum]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_ETH_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Ethereum]: {
        ..._state[Blockchain.Ethereum],
        account,
      },
    })
  }
  if (_action.type === WALLET_EOS_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.EOS]: {
        provider,
        account,
        network,
        permission,
      },
    })
  }
  if (_action.type === WALLET_BSC_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.BSC]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_BSC_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      bsc: {
        ..._state[Blockchain.BSC],
        account,
      },
    })
  }
  if (_action.type === WALLET_XDAI_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.XDAI]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_XDAI_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.XDAI]: {
        ..._state[Blockchain.XDAI],
        account,
      },
    })
  }
  if (_action.type === WALLET_POLYGON_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Polygon]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_POLYGON_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Polygon]: {
        ..._state[Blockchain.Polygon],
        account,
      },
    })
  }
  if (_action.type === WALLET_TELOS_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Telos]: {
        provider,
        account,
        network,
        permission,
      },
    })
  }
  if (_action.type === WALLET_LIBRE_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Libre]: {
        provider,
        account,
        network,
        permission,
      },
    })
  }
  if (_action.type === WALLET_ORE_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Ore]: {
        provider,
        account,
        network,
        permission,
      },
    })
  }
  if (_action.type === WALLET_ULTRA_CONNECTED) {
    const { provider, account, network, permission } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Ultra]: {
        provider,
        account,
        network,
        permission,
      },
    })
  }
  if (_action.type === WALLET_ETH_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Ethereum]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_BSC_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.BSC]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_POLYGON_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Polygon]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_XDAI_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.XDAI]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_EOS_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.EOS]: {
        provider: null,
        account: null,
        network: null,
        permission: null,
      },
    })
  }
  if (_action.type === WALLET_ORE_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Ore]: {
        provider: null,
        account: null,
        network: null,
        permission: null,
      },
    })
  }
  if (_action.type === WALLET_TELOS_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Telos]: {
        provider: null,
        account: null,
        network: null,
        permission: null,
      },
    })
  }
  if (_action.type === WALLET_LIBRE_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Libre]: {
        provider: null,
        account: null,
        network: null,
        permission: null,
      },
    })
  }
  if (_action.type === WALLET_ULTRA_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Ultra]: {
        provider: null,
        account: null,
        network: null,
        permission: null,
      },
    })
  }
  if (_action.type === WALLET_ARBITRUM_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Arbitrum]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_ARBITRUM_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Arbitrum]: {
        ..._state[[Blockchain.Arbitrum]],
        account,
      },
    })
  }
  if (_action.type === WALLET_ARBITRUM_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Arbitrum]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Luxochain]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Luxochain]: {
        ..._state[[Blockchain.Luxochain]],
        account,
      },
    })
  }
  if (_action.type === WALLET_LUXOCHAIN_DISCONNECTED) {
    return Object.assign({}, _state, {
      luxochain: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_ALGORAND_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Algorand]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_ALGORAND_CONNECTED) {
    const { provider, account, network } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Algorand]: {
        provider,
        account,
        network,
      },
    })
  }
  if (_action.type === WALLET_ALGORAND_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Algorand]: {
        ..._state[Blockchain.Algorand],
        account,
      },
    })
  }
  if (_action.type === WALLET_ALGORAND_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Algorand]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  if (_action.type === WALLET_FTM_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Fantom]: {
        provider,
        account,
        network,
        chainId,
      },
    })
  }
  if (_action.type === WALLET_FTM_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Fantom]: {
        ..._state[Blockchain.Fantom],
        account,
      },
    })
  }
  if (_action.type === WALLET_FTM_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Fantom]: {
        provider: null,
        account: null,
        network: null,
      },
    })
  }
  return _state
}

export default walletsReducer
