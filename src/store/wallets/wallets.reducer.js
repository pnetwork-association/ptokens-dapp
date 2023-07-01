import { Blockchain } from 'ptokens'

import {
  WALLET_ARBITRUM_CONNECTED,
  WALLET_ARBITRUM_DISCONNECTED,
  WALLET_ARBITRUM_ACCOUNT_CHANGED,
  WALLET_XDAI_CONNECTED,
  WALLET_XDAI_DISCONNECTED,
  WALLET_XDAI_ACCOUNT_CHANGED,
} from '../../constants/index'

const initialState = {
  [Blockchain.Arbitrum]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Gnosis]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
}

const walletsReducer = (_state = initialState, _action) => {
  if (_action.type === WALLET_XDAI_CONNECTED) {
    const { provider, account, network, chainId } = _action.payload
    return Object.assign({}, _state, {
      [Blockchain.Gnosis]: {
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
      [Blockchain.Gnosis]: {
        ..._state[Blockchain.Gnosis],
        account,
      },
    })
  }
  if (_action.type === WALLET_XDAI_DISCONNECTED) {
    return Object.assign({}, _state, {
      [Blockchain.Gnosis]: {
        provider: null,
        account: null,
        network: null,
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
        ..._state[Blockchain.Arbitrum],
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
  return _state
}

export default walletsReducer
