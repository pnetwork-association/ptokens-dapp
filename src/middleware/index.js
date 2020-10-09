import { getTotalSupply, getBalance } from '../actions/pTokens'
import {
  getReports,
  getLastProcessedBlock,
  ping,
  setNode
} from '../actions/pNetwork'
import * as Log from '../actions/log'
import { connectWithSpecificWallet } from '../actions/wallets'
import {
  SET_SELECTED_PTOKEN,
  PTOKENS_SET_NODE_INFO,
  PNETWORK_RESET_DATA,
  WALLET_REDEEMER_CONNECTED,
  PTOKENS_BALANCE_LOADED
} from '../constants'
import { getCorrespondingReadOnlyProvider } from '../utils/read-only-providers'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      if (_action.type === SET_SELECTED_PTOKEN) {
        const { pToken } = _action.payload

        if (_action.payload.withNodeSelection) dispatch(setNode(pToken))

        //reset dat in order to prevent to populate views with wrong data
        dispatch({
          type: PNETWORK_RESET_DATA
        })

        dispatch({
          type: PTOKENS_BALANCE_LOADED,
          payload: {
            balance: null
          }
        })

        //in case an user change pToken "on"
        dispatch(connectWithSpecificWallet(pToken, 'redeemer', false))
        dispatch(connectWithSpecificWallet(pToken, 'issuer', false))
      }

      // load balance of the new account selected when wallet changes.
      // nodeInfo is needeed because one could connect to a wallet before that the node is selected
      // _action.payload.account nedeed because a wallet can be connected but not unlocked
      if (
        _action.type === WALLET_REDEEMER_CONNECTED &&
        _action.payload.pToken.nodeInfo &&
        _action.payload.account
      ) {
        dispatch(getBalance(_action.payload.pToken, _action.payload.account))
      }

      if (_action.type === PTOKENS_SET_NODE_INFO) {
        const readOnlyProvider = getCorrespondingReadOnlyProvider(
          _action.payload.pToken
        )

        const configs = {
          issuer: null,
          redeemer: readOnlyProvider
        }

        dispatch(getTotalSupply(_action.payload.pToken, configs))

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
