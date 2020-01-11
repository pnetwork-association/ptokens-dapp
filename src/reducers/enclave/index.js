import {
  ENCLAVE_PING_PONG,
  ENCLAVE_LAST_ISSUER_PROCESSED_BLOCK_LOADED,
  ENCLAVE_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
  ENCLAVE_BLOCK_SUBMITTED,
  ENCLAVE_RESET_BLOCK_SUBMIT_SUCCESS,
  ENCLAVE_REPORT_ISSUE_LOADED,
  ENCLAVE_REPORT_REDEEM_LOADED,
  ENCLAVE_RESET_DATA,
  ENCLAVE_SET_ISSUER_BLOCK_HEIGHT_STATUS,
  ENCLAVE_SET_REDEEMER_BLOCK_HEIGHT_STATUS
} from '../../constants/index'

const initialState = {
  isActive: false,
  lastIssuerProcessedBlock: null,
  lastRedeemerProcessedBlock: null,
  isBlockSubmissionSucceeded: null,
  issueReports: [],
  redeemReports: [],
  issuerBlockHeightStatus: null,
  redeemerBlockHeightStatus: null
}

const enclaveReducer = (_state = initialState, _action) => {
  
  if (_action.type === ENCLAVE_PING_PONG) {
    return Object.assign({}, _state, {
      isActive: true
    })
  }

  if (_action.type === ENCLAVE_LAST_ISSUER_PROCESSED_BLOCK_LOADED) {
    return Object.assign({}, _state, {
      lastIssuerProcessedBlock: _action.payload.block
    })
  }

  if (_action.type === ENCLAVE_LAST_REDEEMER_PROCESSED_BLOCK_LOADED) {
    return Object.assign({}, _state, {
      lastRedeemerProcessedBlock: _action.payload.block
    })
  }

  if (_action.type === ENCLAVE_BLOCK_SUBMITTED) {
    return Object.assign({}, _state, {
      isBlockSubmissionSucceeded: true
    })
  }

  if (_action.type === ENCLAVE_RESET_BLOCK_SUBMIT_SUCCESS) {
    return Object.assign({}, _state, {
      isBlockSubmissionSucceeded: null
    })
  }

  if (_action.type === ENCLAVE_REPORT_ISSUE_LOADED) {
    return Object.assign({}, _state, {
      issueReports: _action.payload.reports
    })
  }

  if (_action.type === ENCLAVE_REPORT_REDEEM_LOADED) {
    return Object.assign({}, _state, {
      redeemReports: _action.payload.reports
    })
  }

  if (_action.type === ENCLAVE_SET_ISSUER_BLOCK_HEIGHT_STATUS) {
    return Object.assign({}, _state, {
      issuerBlockHeightStatus: _action.payload.status
    })
  }

  if (_action.type === ENCLAVE_SET_REDEEMER_BLOCK_HEIGHT_STATUS) {
    return Object.assign({}, _state, {
      redeemerBlockHeightStatus: _action.payload.status
    })
  }

  if (_action.type === ENCLAVE_RESET_DATA) {
    return initialState
  }

  return _state
}

export default enclaveReducer