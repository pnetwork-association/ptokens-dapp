import {
  SWAP_DATA_LOADED,
  SWAP_BALANCE_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
  UPDATE_SWAP_BUTTON
} from '../../constants/index'

const initialState = {
  assets: [],
  depositAddressModal: {
    show: false,
    asset: null,
    value: null
  },
  infoModal: {
    show: false,
    message: null,
    image: null
  },
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false
  },
  swapButton: {
    disabled: false,
    text: ''
  }
}

const swapReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === SWAP_DATA_LOADED) {
    return Object.assign({}, _state, {
      assets: payload.assets
    })
  }
  if (type === SWAP_BALANCE_LOADED) {
    const { id, balance } = payload
    return Object.assign({}, _state, {
      assets: _state.assets.map(_asset => (_asset.id === id ? { ..._asset, balance } : _asset))
    })
  }
  if (type === SHOW_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: payload.depositAddressModal
    })
  }
  if (type === PROGRESS_UPDATED) {
    return Object.assign({}, _state, {
      progress: payload.progress
    })
  }
  if (type === PROGRESS_RESET) {
    return Object.assign({}, _state, {
      progress: {
        show: false,
        percent: 0,
        message: null,
        steps: [],
        terminated: false
      }
    })
  }
  if (type === HIDE_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: {
        show: false,
        asset: null,
        value: null
      }
    })
  }
  if (type === SHOW_INFO_MODAL) {
    return Object.assign({}, _state, {
      infoModal: payload.infoModal
    })
  }
  if (type === HIDE_INFO_MODAL) {
    return Object.assign({}, _state, {
      infoModal: {
        show: false,
        message: null,
        image: null
      }
    })
  }
  if (type === UPDATE_SWAP_BUTTON) {
    return Object.assign({}, _state, {
      swapButton: payload.swapButton
    })
  }
  return _state
}

export default swapReducer
