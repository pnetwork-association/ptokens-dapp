import {
  getCirculatingSupply,
  getBurnNonce,
  getMintNonce,
  getTotalIssued,
  getTotalRedeemed
} from '../actions/pTokens'
import { getReports, getLastProcessedBlock, ping } from '../actions/enclave'
import * as Log from '../actions/log'
import { SET_SELECTED_PTOKEN } from '../constants'
import { getCorrespondingReadOnlyProvider } from '../utils/read-only-providers'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      if (_action.type === SET_SELECTED_PTOKEN) {
        const readOnlyProvider = getCorrespondingReadOnlyProvider(
          _action.payload.pToken.name,
          _action.payload.pToken.redeemFrom
        )

        const configs = {
          issuer: null,
          redeemer: readOnlyProvider
        }

        //main page data
        dispatch(getCirculatingSupply(_action.payload.pToken.name, configs))

        dispatch(
          getReports(
            _action.payload.pToken,
            'native',
            'redeemer'
          )
        )

        dispatch(
          getReports(
            _action.payload.pToken,
            'host',
            'issuer'
          )
        )

        //enclave page data
        dispatch(getBurnNonce(_action.payload.pToken.name, configs))

        dispatch(getMintNonce(_action.payload.pToken.name, configs))

        dispatch(getTotalRedeemed(_action.payload.pToken.name, configs))

        dispatch(getTotalIssued(_action.payload.pToken.name, configs))

        dispatch(
          getLastProcessedBlock(
            _action.payload.pToken,
            'native',
            'issuer'
          )
        )

        dispatch(
          getLastProcessedBlock(
            _action.payload.pToken,
            'host',
            'redeemer'
          )
        )

        dispatch(ping(_action.payload.pToken))

        //token page
        dispatch(Log.clear())
      }

      return _next(_action)
    }
  }
}

export { middleware }
