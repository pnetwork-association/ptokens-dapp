import {
  ASSETS_LOADED,
  SWAP_BALANCE_LOADED,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON,
} from '../../constants/index'

const initialState = {
  assets: [],
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false,
  },
  swapButton: {
    disabled: false,
    text: '',
  },
  defaultSelection: {
    from: null,
    to: null,
  },
}

const swapReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === ASSETS_LOADED) {
    return Object.assign({}, _state, {
      assets: payload.assets,
    })
  }
  if (type === SWAP_BALANCE_LOADED) {
    const { id, balance } = payload
    return Object.assign({}, _state, {
      assets: _state.assets.map((_asset) => (_asset.id === id ? { ..._asset, balance } : _asset)),
    })
  }
  if (type === PROGRESS_UPDATED) {
    return Object.assign({}, _state, {
      progress: payload.progress,
    })
  }
  if (type === PROGRESS_RESET) {
    return Object.assign({}, _state, {
      progress: {
        show: false,
        percent: 0,
        message: null,
        steps: [],
        terminated: false,
      },
    })
  }
  if (type === UPDATE_SWAP_BUTTON) {
    return Object.assign({}, _state, {
      swapButton: payload.swapButton,
    })
  }
  return _state
}

export default swapReducer
