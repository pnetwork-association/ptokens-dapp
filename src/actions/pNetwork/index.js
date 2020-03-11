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
import { NodeSelector } from 'ptokens-node-selector'
import { getBlockHeightStatusComparedWithTheReals } from '../../utils/blocks-sync'

let selectedNode = null
let pTokenCurrent = {
  name: 'pbtc',
  redeemFrom: 'eth',
  network: 'mainnet'
}

const _selectNode = async (_pToken, _dispatch) => {
  const nodeSelector = new NodeSelector({
    pToken: {
      name: _pToken.name,
      redeemFrom: _pToken.redeemFrom
    },
    networkType: _pToken.network
  })

  pTokenCurrent.name = _pToken.name
  pTokenCurrent.redeemFrom = _pToken.redeemFrom
  pTokenCurrent.network = _pToken.network

  const node = await nodeSelector.select()
  const info = await node.getInfo()

  _dispatch({
    type: PTOKENS_SET_NODE_INFO,
    payload: {
      pToken: Object.assign({}, _pToken, {
        nodeInfo: {
          contractAddress: info.smart_contract_address,
          publicKey: info.public_key
        }
      })
    }
  })

  return node
}

const _getSelectedNode = async (_pToken, _dispatch) => {
  if (
    !selectedNode ||
    _pToken.name.toLowerCase() !== pTokenCurrent.name ||
    _pToken.redeemFrom.toLowerCase() !== pTokenCurrent.redeemFrom ||
    _pToken.network.toLowerCase() !== pTokenCurrent.network
  ) {
    selectedNode = await _selectNode(_pToken, _dispatch)
    //TODO: check if node is null => no nodes available
  }

  return selectedNode
}

const ping = _pToken => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken, dispatch)
    await node.ping()

    dispatch({
      type: PNETWORK_PING_PONG
    })
  }
}

const getLastProcessedBlock = (_pToken, _type, _role) => {
  return async dispatch => {
    const node = await _getSelectedNode(_pToken, dispatch)

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
    const node = await _getSelectedNode(_pToken, dispatch)
    const reports = await node.getReports(_type)

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
    const node = await _getSelectedNode(_pToken, dispatch)
    await node.submitBlock(_type, _block)

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
  setRedeemerBlockHeightStatus
}
