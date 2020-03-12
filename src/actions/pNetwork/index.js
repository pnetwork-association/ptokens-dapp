import {
  PNETWORK_PING_PONG,
  PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED,
  PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
  PNETWORK_BLOCK_SUBMITTED,
  PNETWORK_RESET_BLOCK_SUBMIT_SUCCESS,
  PNETWORK_REPORT_ISSUE_LOADED,
  PNETWORK_REPORT_REDEEM_LOADED,
  PNETWORK_RESET_DATA,
  PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS,
  PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
  PTOKENS_SET_NODE_INFO
} from '../../constants'
import { getBlockHeightStatusComparedWithTheReals } from '../../utils/blocks-sync'

let selectedNode = null

const setNode = (_pToken, _node) => {
  return async dispatch => {
    const info = await _node.getInfo()

    selectedNode = _node

    dispatch({
      type: PTOKENS_SET_NODE_INFO,
      payload: {
        pToken: Object.assign({}, _pToken, {
          nodeInfo: {
            contractAddress: info.smart_contract_address,
            publicKey: info.public_key,
            endpoint: _node.endpoint
          }
        })
      }
    })
  }
}

const ping = _pToken => {
  return async dispatch => {
    if (!selectedNode) return

    await selectedNode.ping()

    dispatch({
      type: PNETWORK_PING_PONG
    })
  }
}

const getLastProcessedBlock = (_pToken, _type, _role) => {
  return async dispatch => {
    if (!selectedNode) return

    const lastProcessedBlock = await selectedNode.getLastProcessedBlock(_type)

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

    const status = await getBlockHeightStatusComparedWithTheReals(
      _pToken.name,
      _role,
      value,
      _pToken.network
    )

    const actionTypeBlockStatus =
      _role === 'issuer'
        ? PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS
        : PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS

    dispatch({
      type: actionTypeBlockStatus,
      payload: {
        status
      }
    })

    const actionTypeBlockLoaded =
      _role === 'issuer'
        ? PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED
        : PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED
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
    if (!selectedNode) return

    const reports = await selectedNode.getReports(_type)

    const actionType =
      _role === 'issuer'
        ? PNETWORK_REPORT_ISSUE_LOADED
        : PNETWORK_REPORT_REDEEM_LOADED
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
    if (!selectedNode) return

    await selectedNode.submitBlock(_type, _block)

    dispatch({
      type: PNETWORK_BLOCK_SUBMITTED
    })
  }
}

const resetSubmitBlockSuccess = () => {
  return {
    type: PNETWORK_RESET_BLOCK_SUBMIT_SUCCESS
  }
}

const resetData = () => {
  return {
    type: PNETWORK_RESET_DATA
  }
}

const setIssuerBlockHeightStatus = _status => {
  return {
    type: PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS,
    payload: {
      status: _status
    }
  }
}

const setRedeemerBlockHeightStatus = _status => {
  return {
    type: PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
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
  setRedeemerBlockHeightStatus,
  setNode
}
