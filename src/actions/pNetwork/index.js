import {
  PNETWORK_PING_PONG,
  PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED,
  PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
  PNETWORK_REPORT_ISSUE_LOADED,
  PNETWORK_REPORT_REDEEM_LOADED,
  PNETWORK_RESET_DATA,
  PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS,
  PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
  PTOKENS_SET_NODE_INFO,
  PNETWORK_SELECTED_NODE,
  PNETWORK_SELECTED_NODE_MANUALLY,
  PNETWORK_SET_VALIDATORS
} from '../../constants'
import { getBlockHeightStatusComparedWithTheReals } from '../../utils/blocks-sync'
import { NodeSelector } from 'ptokens-node-selector'
import { HttpProvider } from 'ptokens-providers'
import { Node } from 'ptokens-node'
import { Mutex } from 'async-mutex'
import { helpers } from 'ptokens-utils'
import store from '../../store'
import axios from 'axios'
import settings from '../../settings'

const mutex = new Mutex()

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

const getValidators = () => {
  return async _dispatch => {
    try {
      const {
        data: { registered }
      } = await axios.get(settings.pNetworkStats)
      _dispatch({
        type: PNETWORK_SET_VALIDATORS,
        payload: {
          validators: new Array(registered)
        }
      })
    } catch (_err) {
      console.error('Error during getting validators')
    }
  }
}

const setNode = _pToken => {
  return async _dispatch => {
    try {
      let selectedNode = null

      // prettier-ignore
      const { pNetwork } = store.getState()
      const { selectedManually } = pNetwork
      const endpointManuallySelected =
        selectedManually[
          `${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}-${_pToken.network.toLowerCase()}`
        ]

      if (endpointManuallySelected) {
        selectedNode = selectedNode = new Node({
          pToken: _pToken.name,
          blockchain: _pToken.redeemFrom.toLowerCase(),
          provider: new HttpProvider(endpointManuallySelected)
        })

        _dispatch({
          type: PNETWORK_SELECTED_NODE,
          payload: {
            node: selectedNode
          }
        })

        _dispatch({
          type: PNETWORK_SELECTED_NODE_MANUALLY,
          payload: {
            node: selectedManually
          }
        })
      } else {
        const nodeSelector = new NodeSelector({
          pToken: _pToken.name,
          blockchain: helpers.getBlockchainType(_pToken.redeemFrom.toLowerCase()),
          network: _pToken.network
        })

        if (_pToken.redeemFrom === 'TELOS') {
          selectedNode = nodeSelector.setSelectedNode('https://pbtcontelos-node-1a.ngrok.io')
        } else {
          selectedNode = await nodeSelector.select()
        }

        _dispatch({
          type: PNETWORK_SELECTED_NODE,
          payload: {
            node: selectedNode
          }
        })
      }

      // NOTE: node info stored within ptoken obj to facilitate data handling
      let info = null
      try {
        info = await selectedNode.getInfo()
      } catch (err) {
        _dispatch({
          type: PTOKENS_SET_NODE_INFO,
          payload: {
            pToken: Object.assign({}, _pToken, {
              nodeInfo: {
                contractAddress: null,
                publicKey: null,
                endpoint: selectedNode ? selectedNode.provider.endpoint : null,
                isManuallySelected: endpointManuallySelected ? true : false,
                isCompatible: false
              }
            })
          }
        })
        return
      }

      _dispatch({
        type: PTOKENS_SET_NODE_INFO,
        payload: {
          pToken: Object.assign({}, _pToken, {
            nodeInfo: {
              contractAddress:
                _pToken.isPerc20 || _pToken.isPeosioToken
                  ? info.host_smart_contract_address
                  : info.smart_contract_address,
              publicKey: info.public_key,
              endpoint: selectedNode ? selectedNode.provider.endpoint : null,
              isManuallySelected: endpointManuallySelected ? true : false,
              isCompatible: info.native_network.includes(_pToken.network) ? true : false
            }
          })
        }
      })
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const setNodeManually = (_pToken, _endpoint) => {
  return async _dispatch => {
    try {
      let selectedNode = null

      const { pNetwork } = store.getState()
      const { selectedManually } = pNetwork
      // prettier-ignore
      selectedManually[`${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}-${_pToken.network.toLowerCase()}`] = _endpoint

      selectedNode = new Node({
        pToken: _pToken.name,
        blockchain: helpers.getBlockchainType(_pToken.redeemFrom.toLowerCase()),
        provider: new HttpProvider(_endpoint)
      })

      _dispatch({
        type: PNETWORK_SELECTED_NODE,
        payload: {
          node: selectedNode
        }
      })

      _dispatch({
        type: PNETWORK_SELECTED_NODE_MANUALLY,
        payload: {
          node: selectedManually
        }
      })

      let info = null
      try {
        info = await selectedNode.getInfo()
      } catch (err) {
        _dispatch({
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

      _dispatch({
        type: PTOKENS_SET_NODE_INFO,
        payload: {
          pToken: Object.assign({}, _pToken, {
            nodeInfo: {
              contractAddress:
                _pToken.isPerc20 || _pToken.isPeosioToken
                  ? info.host_smart_contract_address
                  : info.smart_contract_address,
              publicKey: info.public_key,
              endpoint: _endpoint,
              isManuallySelected: true,
              isCompatible: info.native_network.includes(_pToken.network) ? true : false
            }
          })
        }
      })
    } catch (_err) {
      console.error(_err.message)
    }
  }
}
const ping = () => {
  return async _dispatch => {
    try {
      const { pNetwork } = store.getState()
      const { selectedNode } = pNetwork
      if (!selectedNode) return

      await selectedNode.ping()
      _dispatch({
        type: PNETWORK_PING_PONG
      })
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const getLastProcessedBlock = (_type, _role) => {
  return async _dispatch => {
    try {
      const {
        pTokens: { selected: pToken }
      } = store.getState()
      const { pNetwork } = store.getState()
      const { selectedNode } = pNetwork
      if (!selectedNode) return

      //provisional
      if (pToken.redeemFrom === 'EOS' && _type === 'host') return

      // same mechanism used into getReport
      typeNumberOfGetBlock[_type] += 1
      const release = await mutex.acquire()

      const lastProcessedBlock =
        _type === 'native'
          ? await selectedNode.getLastProcessedNativeBlock()
          : await selectedNode.getLastProcessedHostBlock()

      typeNumberOfGetBlock[_type] -= 1

      if (typeNumberOfGetBlock[_type] === 0) {
        const status = await getBlockHeightStatusComparedWithTheReals(
          pToken,
          _role,
          lastProcessedBlock.block_num,
          pToken.network
        )

        _dispatch({
          type:
            _role === 'issuer' ? PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS : PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS,
          payload: {
            status
          }
        })

        _dispatch({
          type:
            _role === 'issuer'
              ? PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED
              : PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED,
          payload: {
            block: lastProcessedBlock
          }
        })
      }

      release()
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const getReports = (_nodeInfo, _type, _role) => {
  return async _dispatch => {
    try {
      const { pNetwork } = store.getState()
      const { selectedNode } = pNetwork
      if (!selectedNode) return

      // increment the number of request in order to dont
      // _dispatch when typeNumberOfGetReport[_type] > 1
      // (avoiding printing reports when user keep changing ptoken)
      typeNumberOfGetReport[_type] += 1

      // start critical reagion
      const release = await mutex.acquire()

      let reports = []
      try {
        reports = _type === 'native' ? await selectedNode.getNativeReports() : await selectedNode.getHostReports()
      } catch (err) {
        reports = []
      }

      reports = reports ? reports.filter(report => report.broadcast_tx_hash) : []

      typeNumberOfGetReport[_type] -= 1

      //if there is no pending requests can _dispatch
      if (typeNumberOfGetReport[_type] === 0) {
        _dispatch({
          type: _role === 'issuer' ? PNETWORK_REPORT_ISSUE_LOADED : PNETWORK_REPORT_REDEEM_LOADED,
          payload: {
            reports
          }
        })
      }
      release()
    } catch (_err) {
      console.error(_err.message)
    }
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
  getValidators,
  getLastProcessedBlock,
  getReports,
  ping,
  resetData,
  setIssuerBlockHeightStatus,
  setRedeemerBlockHeightStatus,
  setNode,
  setNodeManually
}
