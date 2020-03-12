import {
  getCirculatingSupply
  /*getBurnNonce,
  getMintNonce,
  getTotalIssued,
  getTotalRedeemed*/
} from '../actions/pTokens'
import {
  getReports,
  getLastProcessedBlock,
  ping,
  setNode
} from '../actions/pNetwork'
import * as Log from '../actions/log'
import { SET_SELECTED_PTOKEN, PTOKENS_SET_NODE_INFO } from '../constants'
import { getCorrespondingReadOnlyProvider } from '../utils/read-only-providers'
import { NodeSelector } from 'ptokens-node-selector'

let currentContractAddress = null

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      if (_action.type === SET_SELECTED_PTOKEN) {
        const nodeSelector = new NodeSelector({
          pToken: {
            name: _action.payload.pToken.name,
            redeemFrom: _action.payload.pToken.redeemFrom
          },
          networkType: _action.payload.pToken.network
        })

        await nodeSelector.select()

        dispatch(setNode(_action.payload.pToken, nodeSelector.selectedNode))
      }

      if (_action.type === PTOKENS_SET_NODE_INFO) {
        const readOnlyProvider = getCorrespondingReadOnlyProvider(
          _action.payload.pToken.name,
          _action.payload.pToken.redeemFrom,
          _action.payload.pToken.network
        )

        const configs = {
          issuer: null,
          redeemer: readOnlyProvider
        }

        //main page data
        if (
          currentContractAddress !==
          _action.payload.pToken.nodeInfo.contractAddress
        ) {
          dispatch(getCirculatingSupply(_action.payload.pToken, configs))
          currentContractAddress =
            _action.payload.pToken.nodeInfo.contractAddress
        }

        //enclave page data
        /*dispatch(getBurnNonce(_action.payload.pToken, configs))

        dispatch(getMintNonce(_action.payload.pToken, configs))

        dispatch(getTotalRedeemed(_action.payload.pToken, configs))

        dispatch(getTotalIssued(_action.payload.pToken, configs))*/

        dispatch(setNode)

        dispatch(getReports(_action.payload.pToken, 'native', 'redeemer'))

        dispatch(getReports(_action.payload.pToken, 'host', 'issuer'))

        dispatch(
          getLastProcessedBlock(_action.payload.pToken, 'native', 'issuer')
        )

        dispatch(
          getLastProcessedBlock(_action.payload.pToken, 'host', 'redeemer')
        )

        dispatch(ping(_action.payload.pToken))

        dispatch(Log.clear())
      }

      return _next(_action)
    }
  }
}

export { middleware }
