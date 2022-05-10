import {
  MIGRATION_ASSETS_LOADED,
  MIGRATION_BALANCE_LOADED,
  UPDATE_MIGRATE_BUTTON,
  MIGRATION_PROGRESS_UPDATED,
  MIGRATION_PROGRESS_RESET,
  APYS_LOADED
} from '../../constants/index'

const initialState = {
  assets: [],
  migrateButton: {
    disabled: false,
    text: ''
  },
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false
  },
  apys: null
}

const swapReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === MIGRATION_ASSETS_LOADED) {
    return Object.assign({}, _state, {
      assets: payload.assets
    })
  }
  if (type === MIGRATION_BALANCE_LOADED) {
    const { id, balance } = payload
    return Object.assign({}, _state, {
      assets: _state.assets.map(_asset => (_asset.id === id ? { ..._asset, balance } : _asset))
    })
  }
  if (type === MIGRATION_PROGRESS_UPDATED) {
    return Object.assign({}, _state, {
      progress: payload.progress
    })
  }
  if (type === MIGRATION_PROGRESS_RESET) {
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
  if (type === UPDATE_MIGRATE_BUTTON) {
    return Object.assign({}, _state, {
      migrateButton: payload.migrateButton
    })
  }
  if (type === APYS_LOADED) {
    return Object.assign({}, _state, {
      apys: payload.apys
    })
  }
  return _state
}

export default swapReducer
