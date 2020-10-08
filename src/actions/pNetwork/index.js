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
import { NodeSelector } from 'ptokens-node-selector'
import { Node } from 'ptokens-node'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

let selectedNode = null

const selectedManually = {}

// map used for keep track of pending requests for each type
// of request (host/native) since this function is called
// twice for each ptoken
const typeNumberOfGetReport = {
  host: 0,
  native: 0
}

const typeNumberOfGetBlock = {
  host: 0,
  native: 0
}

const setNode = _pToken => {
  return async dispatch => {
    const endpointManuallySelected =
      selectedManually[
        `${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}-${_pToken.network.toLowerCase()}`
      ]

    if (endpointManuallySelected) {
      selectedNode = new Node({
        pToken: {
          name: _pToken.name,
          hostBlockchain: 'eth'
        },
        endpoint: endpointManuallySelected
      })
    } else {
      return
      const nodeSelector = new NodeSelector({
        pToken: {
          name: _pToken.name,
          hostBlockchain: _pToken.redeemFrom
        },
        networkType: _pToken.network
      })

      // TODO: REMOVE
      // prettier-ignore
      if (_pToken.name === 'pLTC' && _pToken.network === 'mainnet' && _pToken.redeemFrom === 'ETH') {
        selectedNode = new Node({
          endpoint: 'https://pltconeth-node-1a.ngrok.io',
          pToken: {
            name: _pToken.name,
            hostBlockchain: _pToken.redeemFrom
          }
        })
      // prettier-ignore
      } else if (_pToken.name === 'pLTC' && _pToken.network === 'testnet' && _pToken.redeemFrom === 'ETH') {
        selectedNode = new Node({
          endpoint: 'https://4f2ac459f0e2.ngrok.io/',
          pToken: {
            name: _pToken.name,
            hostBlockchain: _pToken.redeemFrom
          }
        })
      // prettier-ignore
      } else if (_pToken.name === 'pLTC' && _pToken.network === 'mainnet' && _pToken.redeemFrom === 'EOS') {
        selectedNode = new Node({
          endpoint: 'https://pltconeos-node-1a.ngrok.io/',
          pToken: {
            name: _pToken.name,
            hostBlockchain: _pToken.redeemFrom
          }
        })
      // prettier-ignore
      } else if (_pToken.name === 'pETH' && _pToken.network === 'mainnet') {
        console.log('TODO peth node selection')
      } else {
        try {
          selectedNode = await nodeSelector.select()
        } catch (err) {
          selectedNode = null
        }
      }
    }

    let info = null
    try {
      info = await selectedNode.getInfo()
    } catch (err) {
      dispatch({
        type: PTOKENS_SET_NODE_INFO,
        payload: {
          pToken: Object.assign({}, _pToken, {
            nodeInfo: {
              contractAddress: null,
              publicKey: null,
              endpoint: selectedNode ? selectedNode.endpoint : null,
              isManuallySelected: endpointManuallySelected ? true : false,
              isCompatible: false
            }
          })
        }
      })
      return
    }

    dispatch({
      type: PTOKENS_SET_NODE_INFO,
      payload: {
        pToken: Object.assign({}, _pToken, {
          nodeInfo: {
            contractAddress: info.smart_contract_address,
            publicKey: info.public_key,
            endpoint: selectedNode ? selectedNode.endpoint : null,
            isManuallySelected: endpointManuallySelected ? true : false,
            isCompatible: info.native_network.includes(_pToken.network)
              ? true
              : false
          }
        })
      }
    })
  }
}

const setNodeManually = (_pToken, _endpoint) => {
  return async dispatch => {
    selectedManually[
      `${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}-${_pToken.network.toLowerCase()}`
    ] = _endpoint

    selectedNode = new Node({
      pToken: {
        name: _pToken.name,
        hostBlockchain: 'eth'
      },
      endpoint: _endpoint
    })

    let info = null
    try {
      info = await selectedNode.getInfo()
    } catch (err) {
      dispatch({
        type: PTOKENS_SET_NODE_INFO,
        payload: {
          pToken: Object.assign({}, _pToken, {
            nodeInfo: {
              contractAddress: null,
              publicKey: null,
              endpoint: _endpoint,
              isManuallySelected: true,
              isCompatible: false
            }
          })
        }
      })
      return
    }

    dispatch({
      type: PTOKENS_SET_NODE_INFO,
      payload: {
        pToken: Object.assign({}, _pToken, {
          nodeInfo: {
            contractAddress: '0x' + info.smart_contract_address,
            publicKey: info.public_key,
            endpoint: _endpoint,
            isManuallySelected: true,
            isCompatible: info.native_network.includes(_pToken.network)
              ? true
              : false
          }
        })
      }
    })
  }
}

const ping = _pToken => {
  return async dispatch => {
    if (!selectedNode) return

    try {
      await selectedNode.ping()
      dispatch({
        type: PNETWORK_PING_PONG
      })
    } catch (err) {}
  }
}

const getLastProcessedBlock = (_pToken, _type, _role) => {
  return async dispatch => {
    if (!selectedNode) return

    //provisional
    if (_pToken.redeemFrom === 'EOS' && _type === 'host') return

    // same mechanism used into getReport
    typeNumberOfGetBlock[_type] += 1
    const release = await mutex.acquire()

    const lastProcessedBlock = await selectedNode.getLastProcessedBlock(_type)

    typeNumberOfGetBlock[_type] -= 1

    if (typeNumberOfGetBlock[_type] === 0) {
      const status = await getBlockHeightStatusComparedWithTheReals(
        _pToken,
        _role,
        lastProcessedBlock.block_num,
        _pToken.network
      )

      dispatch({
        type:
          _role === 'issuer'
            ? PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS
            : PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
        payload: {
          status
        }
      })

      dispatch({
        type:
          _role === 'issuer'
            ? PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED
            : PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
        payload: {
          block: lastProcessedBlock.block_num
        }
      })
    }

    release()
  }
}

const getReports = (_pToken, _type, _role) => {
  return async dispatch => {
    if (!selectedNode) return

    // increment the number of request in order to dont
    // dispatch when typeNumberOfGetReport[_type] > 1
    // (avoiding printing reports when user keep changing ptoken)
    typeNumberOfGetReport[_type] += 1

    // start critical reagion
    const release = await mutex.acquire()

    let reports = []
    try {
      reports = await selectedNode.getReports(_type)
    } catch (err) {
      reports = []
    }

    reports = reports.filter(report => report.broadcast_tx_hash)

    typeNumberOfGetReport[_type] -= 1

    //if there is no pending requests can dispatch
    if (typeNumberOfGetReport[_type] === 0) {
      dispatch({
        type:
          _role === 'issuer'
            ? PNETWORK_REPORT_ISSUE_LOADED
            : PNETWORK_REPORT_REDEEM_LOADED,
        payload: {
          reports
        }
      })
    }
    // end critical reagion
    release()
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
  setNode,
  setNodeManually
}
