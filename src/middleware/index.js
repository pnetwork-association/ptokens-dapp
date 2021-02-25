import { getTotalSupply, getBalance } from '../actions/pTokens'
import { getReports, getLastProcessedBlock, ping, setNode } from '../actions/pNetwork'
import * as Log from '../actions/log'
import { connectWithSpecificWallet, resetRedeemer, resetIssuer } from '../actions/wallets'
import {
  SET_SELECTED_PTOKEN,
  PTOKENS_SET_NODE_INFO,
  PNETWORK_RESET_DATA,
  WALLET_REDEEMER_CONNECTED,
  WALLET_ISSUER_CONNECTED,
  PTOKENS_BALANCE_LOADED
} from '../constants'
import store from '../store'
import settings from '../settings'

let intervalIssuerBlockGetter, intervalRedeemerBlockGetter

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      if (_action.type === SET_SELECTED_PTOKEN) {
        const { pToken } = _action.payload

        // NOTE: pnetwork node blocks
        if (intervalIssuerBlockGetter) clearInterval(intervalIssuerBlockGetter)
        if (intervalRedeemerBlockGetter) clearInterval(intervalRedeemerBlockGetter)

        dispatch(getLastProcessedBlock('native', 'issuer'))
        dispatch(getLastProcessedBlock('host', 'redeemer'))

        intervalIssuerBlockGetter = setInterval(() => {
          dispatch(getLastProcessedBlock('native', 'issuer'))
        }, settings[pToken.id][pToken.issueFrom.toLowerCase()].enclaveBlockHeightPollingTime)

        intervalRedeemerBlockGetter = setInterval(() => {
          dispatch(getLastProcessedBlock('host', 'redeemer'))
        }, settings[pToken.id][pToken.redeemFrom.toLowerCase()].enclaveBlockHeightPollingTime)

        // NOTE: handle wallet connections
        const { wallets } = store.getState()
        const { walletsPerType } = wallets
        if (pToken.redeemFrom === 'ETH') {
          if (!walletsPerType['ETH']) {
            dispatch(resetRedeemer())
          } else {
            dispatch({
              type: WALLET_REDEEMER_CONNECTED,
              payload: {
                provider: walletsPerType['ETH'].provider,
                account: walletsPerType['ETH'].account,
                wallet: {
                  type: 'multiWallet'
                },
                pToken,
                type: 'ETH'
              }
            })
          }
        }

        if (pToken.issueFrom === 'EOS') {
          if (!walletsPerType['EOS']) {
            dispatch(resetIssuer())
          } else {
            dispatch({
              type: WALLET_ISSUER_CONNECTED,
              payload: {
                provider: walletsPerType['EOS'].provider,
                account: walletsPerType['EOS'].account,
                wallet: {
                  type: 'multiWallet'
                },
                pToken,
                type: 'EOS'
              }
            })
          }
        }

        if (pToken.issueFrom === 'ETH') {
          if (!walletsPerType['ETH']) {
            dispatch(resetIssuer())
          } else {
            dispatch({
              type: WALLET_ISSUER_CONNECTED,
              payload: {
                provider: walletsPerType['ETH'].provider,
                account: walletsPerType['ETH'].account,
                wallet: {
                  type: 'multiWallet'
                },
                pToken,
                type: 'ETH'
              }
            })
          }
        }

        if (pToken.redeemFrom === 'EOS') {
          if (!walletsPerType['EOS']) {
            dispatch(resetRedeemer())
          } else {
            dispatch({
              type: WALLET_REDEEMER_CONNECTED,
              payload: {
                provider: walletsPerType['EOS'].provider,
                account: walletsPerType['EOS'].account,
                wallet: {
                  type: 'multiWallet'
                },
                pToken,
                type: 'EOS'
              }
            })
          }
        }

        if (pToken.redeemFrom === 'TELOS') {
          if (!walletsPerType['TELOS']) {
            dispatch(resetRedeemer())
          } else {
            dispatch({
              type: WALLET_REDEEMER_CONNECTED,
              payload: {
                provider: walletsPerType['TELOS'].provider,
                account: walletsPerType['TELOS'].account,
                wallet: {
                  type: 'multiWallet'
                },
                pToken,
                type: 'TELOS'
              }
            })
          }
        }

        if (_action.payload.withNodeSelection) dispatch(setNode(pToken))

        //reset data in order to prevent to populate views with wrong data
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
        dispatch(connectWithSpecificWallet('redeemer', false))
        dispatch(connectWithSpecificWallet('issuer', false))
      }

      // load balance of the new account selected when wallet changes.
      // nodeInfo is needeed because one could connect to a wallet before that the node is selected
      // _action.payload.account nedeed because a wallet can be connected but not unlocked
      if (_action.type === WALLET_REDEEMER_CONNECTED && _action.payload.pToken.nodeInfo && _action.payload.account) {
        dispatch(getBalance(_action.payload.account))
      }

      if (_action.type === PTOKENS_SET_NODE_INFO) {
        if (!_action.payload.pToken.nodeInfo.isCompatible) return

        dispatch(getTotalSupply(_action.payload.pToken.nodeInfo.contractAddress))
        dispatch(getReports(_action.payload.pToken.nodeInfo, 'native', 'redeemer'))
        dispatch(getReports(_action.payload.pToken.nodeInfo, 'host', 'issuer'))
        dispatch(getLastProcessedBlock('native', 'issuer'))
        dispatch(getLastProcessedBlock('host', 'redeemer'))
        dispatch(ping(_action.payload.pToken))
        dispatch(Log.clear())
      }

      return _next(_action)
    }
  }
}

export { middleware }
