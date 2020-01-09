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
} from '../../constants'
import Enclave from 'ptokens-enclave'
import { getEnclaveBlockHeightStatusComparedWithTheReals } from '../../utils/blocks-sync'

let enclave = null

const ping = _pTokenName => {
  return async dispatch => {

    enclave = new Enclave({
      pToken: _pTokenName
    })

    await enclave.ping()
    dispatch({
      type: ENCLAVE_PING_PONG
    })
  }
}

const getLastProcessedBlock = (_pTokenName, _type, _role) => {
  return async dispatch => {

    enclave = new Enclave({
      pToken: _pTokenName
    })

    const lastProcessedBlock = await enclave.getLastProcessedBlock(_type)
    
    let value = null
    switch (_pTokenName) {
      case 'pEOS': {
        value = lastProcessedBlock.latestBlockNum
        break
      }
      case 'pBTC': {
        value = lastProcessedBlock.block_num
        break
      }
      default: value = null
    }

    const status = await getEnclaveBlockHeightStatusComparedWithTheReals(
      _pTokenName,
      _role,
      value
    )

    const actionTypeBlockStatus = _role === 'issuer'
      ? ENCLAVE_SET_ISSUER_BLOCK_HEIGHT_STATUS
      : ENCLAVE_SET_REDEEMER_BLOCK_HEIGHT_STATUS

    dispatch({
      type: actionTypeBlockStatus,
      payload: {
        status
      }
    }) 

    const actionTypeBlockLoaded = _role === 'issuer'
      ? ENCLAVE_LAST_ISSUER_PROCESSED_BLOCK_LOADED
      : ENCLAVE_LAST_REDEEMER_PROCESSED_BLOCK_LOADED
    dispatch({
      type: actionTypeBlockLoaded,
      payload: {
        block: value
      }
    })
  }
}

const getReports = (_pTokenName, _type, _role) => {
  return async dispatch => {

    enclave = new Enclave({
      pToken: _pTokenName
    })

    const report = await enclave.getReports(_type)

    const actionType = _role === 'issuer'
      ? ENCLAVE_REPORT_ISSUE_LOADED
      : ENCLAVE_REPORT_REDEEM_LOADED
    dispatch({
      type: actionType,
      payload: {
        report
      }
    })
  }
}

const submitBlock = (_pTokenName, _type, _block) => {
  return async dispatch => {

    enclave = new Enclave({
      pToken: _pTokenName
    })

    await enclave.submitBlock(_type, _block)
    dispatch({
      type: ENCLAVE_BLOCK_SUBMITTED
    })
  }
}

const resetSubmitBlockSuccess = () => {
  return {
    type: ENCLAVE_RESET_BLOCK_SUBMIT_SUCCESS
  }
}

const resetData = () => {
  return {
    type: ENCLAVE_RESET_DATA
  }
}

const setIssuerBlockHeightStatus = _status => {
  return {
    type: ENCLAVE_SET_ISSUER_BLOCK_HEIGHT_STATUS,
    payload: {
      status: _status
    }
  }
}

const setRedeemerBlockHeightStatus = _status => {
  return {
    type: ENCLAVE_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
    payload: {
      status: _status
    }
  }
}

export {
  getLastProcessedBlock,
  getReports,
  submitBlock,
  ping,
  resetSubmitBlockSuccess,
  resetData,
  setIssuerBlockHeightStatus,
  setRedeemerBlockHeightStatus
}