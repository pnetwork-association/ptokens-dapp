import {
  PNETWORK_PING_PONG,
  PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED,
  PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
  PNETWORK_REPORT_ISSUE_LOADED,
  PNETWORK_REPORT_REDEEM_LOADED,
  PNETWORK_RESET_DATA,
  PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS,
  PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
  PNETWORK_SELECTED_NODE,
  PNETWORK_SELECTED_NODE_MANUALLY
} from '../../constants/index'

const initialState = {
  isActive: false,
  lastIssuerProcessedBlock: null,
  lastRedeemerProcessedBlock: null,
  issueReports: [],
  redeemReports: [],
  issuerBlockHeightStatus: null,
  redeemerBlockHeightStatus: null,
  selectedNode: null,
  selectedManually: {}
}

const pNetworkReducer = (_state = initialState, _action) => {
  if (_action.type === PNETWORK_PING_PONG) {
    return Object.assign({}, _state, {
      isActive: true
    })
  }

  if (_action.type === PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED) {
    return Object.assign({}, _state, {
      lastIssuerProcessedBlock: _action.payload.block
    })
  }

  if (_action.type === PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED) {
    return Object.assign({}, _state, {
      lastRedeemerProcessedBlock: _action.payload.block
    })
  }

  if (_action.type === PNETWORK_REPORT_ISSUE_LOADED) {
    return Object.assign({}, _state, {
      issueReports: _action.payload.reports
    })
  }

  if (_action.type === PNETWORK_REPORT_REDEEM_LOADED) {
    return Object.assign({}, _state, {
      redeemReports: _action.payload.reports
    })
  }

  if (_action.type === PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS) {
    return Object.assign({}, _state, {
      issuerBlockHeightStatus: _action.payload.status
    })
  }

  if (_action.type === PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS) {
    return Object.assign({}, _state, {
      redeemerBlockHeightStatus: _action.payload.status
    })
  }

  if (_action.type === PNETWORK_SELECTED_NODE) {
    return Object.assign({}, _state, {
      selectedNode: _action.payload.node
    })
  }

  if (_action.type === PNETWORK_SELECTED_NODE_MANUALLY) {
    return Object.assign({}, _state, {
      selectedManually: _action.payload.selectedManually
    })
  }

  if (_action.type === PNETWORK_RESET_DATA) {
    return initialState
  }

  return _state
}

export default pNetworkReducer
