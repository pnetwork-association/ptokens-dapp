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
import { NodeSelector } from 'ptokens-node-selector'
import { getEnclaveBlockHeightStatusComparedWithTheReals } from '../../utils/blocks-sync'

let selectedNode = null
let pTokenCurrent = {
  name: 'pbtc',
  redeemFrom: 'eth'
}

const _selectNode = async _pToken => {
  const nodeSelector = new NodeSelector({
    pToken: {
      name: _pToken.name,
      redeemFrom: _pToken.redeemFrom
    },
    networkType: 'mainnet'
  })

  pTokenCurrent.name = _pToken.name
  pTokenCurrent.redeemFrom = _pToken.redeemFrom

  const node = await nodeSelector.select()
  return node
}

const _getSelectedNode = async _pToken => {
  if (
    !selectedNode ||
    _pToken.name.toLowerCase() !== pTokenCurrent.name ||
    _pToken.redeemFrom.toLowerCase() !== pTokenCurrent.redeemFrom
  ) {
    selectedNode = await _selectNode(_pToken)
    //TODO: check if node is null => no nodes available
  }

  return selectedNode
}

const ping = _pToken => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken)
    await node.ping()

    dispatch({
      type: ENCLAVE_PING_PONG
    })
  }
}

const getLastProcessedBlock = (_pToken, _type, _role) => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken)

    const lastProcessedBlock = await node.getLastProcessedBlock(_type)

    let value = null
    switch (_pToken.name) {
      case 'pEOS': {
        value = lastProcessedBlock.latestBlockNum
        break
      }
      case 'pBTC': {
        value = lastProcessedBlock.block_num
        break
      }
      case 'pLTC': {
        value = lastProcessedBlock.block_num
        break
      }
      default:
        value = null
    }

    const status = await getEnclaveBlockHeightStatusComparedWithTheReals(
      _pToken.name,
      _role,
      value
    )

    const actionTypeBlockStatus =
      _role === 'issuer'
        ? ENCLAVE_SET_ISSUER_BLOCK_HEIGHT_STATUS
        : ENCLAVE_SET_REDEEMER_BLOCK_HEIGHT_STATUS

    dispatch({
      type: actionTypeBlockStatus,
      payload: {
        status
      }
    })

    const actionTypeBlockLoaded =
      _role === 'issuer'
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

const getReports = (_pToken, _type, _role) => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken)
    const reports = await node.getReports(_type)

    const actionType =
      _role === 'issuer'
        ? ENCLAVE_REPORT_ISSUE_LOADED
        : ENCLAVE_REPORT_REDEEM_LOADED
    dispatch({
      type: actionType,
      payload: {
        reports
      }
    })
  }
}

const submitBlock = (_pToken, _type, _block) => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken)
    await node.submitBlock(_type, _block)

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
