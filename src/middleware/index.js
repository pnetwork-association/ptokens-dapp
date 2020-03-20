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
import {
  SET_SELECTED_PTOKEN,
  PTOKENS_SET_NODE_INFO,
  PNETWORK_REPORT_ISSUE_LOADED,
  PNETWORK_REPORT_REDEEM_LOADED,
  PTOKENS_CIRCULATING_SUPPLY_LOADED
} from '../constants'
import { getCorrespondingReadOnlyProvider } from '../utils/read-only-providers'

let currentContractAddress = null

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      if (_action.type === SET_SELECTED_PTOKEN) {
        if (_action.payload.withNodeSelection)
          dispatch(setNode(_action.payload.pToken))

        //reset dat in order to prevent to populate views with wrong data
        dispatch({
          type: PNETWORK_REPORT_ISSUE_LOADED,
          payload: {
            reports: []
          }
        })
        dispatch({
          type: PNETWORK_REPORT_REDEEM_LOADED,
          payload: {
            reports: []
          }
        })
        dispatch({
          type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
          payload: {
            circulatingSupply: null
          }
        })
      }

      if (_action.type === PTOKENS_SET_NODE_INFO) {
        const readOnlyProvider = getCorrespondingReadOnlyProvider(
          _action.payload.pToken
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
