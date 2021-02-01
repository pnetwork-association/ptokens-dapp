import {
  SET_SELECTED_PTOKEN,
  PTOKENS_BALANCE_LOADED,
  PTOKENS_ISSUE_SUCCEDEED,
  PTOKENS_ISSUE_NOT_SUCCEDEED,
  PTOKENS_REDEEM_SUCCEDEED,
  PTOKENS_REDEEM_NOT_SUCCEDEED,
  PTOKENS_RESET_ISSUE_SUCCESS,
  PTOKENS_RESET_REDEEM_SUCCESS,
  PTOKENS_RESET_ISSUE_ERROR,
  PTOKENS_RESET_REDEEM_ERROR,
  PTOKENS_CIRCULATING_SUPPLY_LOADED,
  PTOKENS_SET_DEPOSIT_ADDRESS,
  PTOKENS_RESET_DEPOSIT_ADDRESS,
  PTOKENS_SET_PARAMS,
  PTOKENS_RESET_PARAMS,
  PTOKENS_SET_NODE_INFO,
  PTOKENS_SET_CUSTOM_HOST_RPC,
  PTOKENS_SET_CUSTOM_NATIVE_RPC,
  PBTC_ON_ETH_MAINNET
} from '../../constants/index'
import settings from '../../settings'

const initialState = {
  selected: {
    id: PBTC_ON_ETH_MAINNET,
    name: 'pBTC',
    realDecimals: 8,
    contractDecimals: 18,
    issueFrom: 'BTC',
    redeemFrom: 'ETH',
    totalSupply: null,
    tokenType: 'ERC-20',
    network: 'mainnet',
    //only for pbtc
    depositAddress: {
      value: null,
      waiting: false,
      terminated: false,
      success: false,
      error: null
    },
    nodeInfo: {
      publicKey: null,
      contractAddress: null,
      endpoint: null,
      isManuallySelected: null,
      isCompatible: null
    },
    customHostRpc: null,
    customNativeRpc: null
  },
  balance: null,
  available: settings.pTokensAvailable,
  isIssueSuccedeed: null,
  isRedeemSuccedeed: null,
  issueError: null,
  redeemError: null,

  //var for token issue & redeem page
  params: {
    amountToIssue: '',
    amountToRedeem: '',
    typedIssueAccount: '',
    typedRedeemAccount: ''
  }
}

const pTokensReducer = (_state = initialState, _action) => {
  if (_action.type === SET_SELECTED_PTOKEN) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        name: _action.payload.pToken.name,
        realDecimals: _action.payload.pToken.realDecimals,
        contractDecimals: _action.payload.pToken.contractDecimals,
        issueFrom: _action.payload.pToken.issueFrom,
        redeemFrom: _action.payload.pToken.redeemFrom,
        tokenType: _action.payload.pToken.tokenType,
        network: _action.payload.pToken.network,
        id: _action.payload.pToken.id,
        isPerc20: _action.payload.pToken.isPerc20,
        isPeosioToken: _action.payload.pToken.isPeosioToken,
        isHidden: _action.payload.pToken.isHidden,
        minimumIssuable: _action.payload.pToken.minimumIssuable,
        minimumRedeamable: _action.payload.pToken.minimumRedeamable,
        totalSupply: null,
        depositAddress: {
          value: null,
          waiting: false,
          terminated: false,
          success: false,
          error: null
        },
        nodeInfo: {
          publicKey: null,
          contractAddress: null,
          endpoint: null,
          isManuallySelected: null,
          isCompatible: null
        },
        customHostRpc: null,
        customNativeRpc: null
      }),
      balance: null,
      isIssueSuccedeed: null,
      isRedeemSuccedeed: null,
      issueError: null,
      redeemError: null,
      params: Object.assign({}, _state.selected, {
        amountToIssue: '',
        amountToRedeem: '',
        typedIssueAccount: '',
        typedRedeemAccount: ''
      })
    })
  }

  if (_action.type === PTOKENS_SET_NODE_INFO) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        nodeInfo: _action.payload.pToken.nodeInfo
      })
    })
  }

  if (_action.type === PTOKENS_SET_CUSTOM_HOST_RPC) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        customHostRpc: _action.payload.rpc
      })
    })
  }

  if (_action.type === PTOKENS_SET_CUSTOM_NATIVE_RPC) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        customNativeRpc: _action.payload.rpc
      })
    })
  }

  if (_action.type === PTOKENS_SET_DEPOSIT_ADDRESS) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        depositAddress: _action.payload.pToken.depositAddress
      })
    })
  }

  if (_action.type === PTOKENS_BALANCE_LOADED) {
    return Object.assign({}, _state, {
      balance: _action.payload.balance
    })
  }

  if (_action.type === PTOKENS_ISSUE_SUCCEDEED) {
    return Object.assign({}, _state, {
      isIssueSuccedeed: true,
      issueError: null,
      selected: Object.assign({}, _state.selected, {
        depositAddress: Object.assign({}, _state.selected.depositAddress, {
          waiting: false,
          terminated: true,
          success: true,
          error: null
        })
      })
    })
  }

  if (_action.type === PTOKENS_ISSUE_NOT_SUCCEDEED) {
    return Object.assign({}, _state, {
      issueError: _action.payload.error,
      isIssueSuccedeed: null,
      selected: Object.assign({}, _state.selected, {
        depositAddress: Object.assign({}, _state.selected.depositAddress, {
          waiting: false,
          terminated: true,
          success: false,
          error: _action.payload.error
        })
      })
    })
  }

  if (_action.type === PTOKENS_REDEEM_SUCCEDEED) {
    return Object.assign({}, _state, {
      isRedeemSuccedeed: true,
      redeemError: null
    })
  }

  if (_action.type === PTOKENS_REDEEM_NOT_SUCCEDEED) {
    return Object.assign({}, _state, {
      redeemError: _action.payload.error,
      isRedeemSuccedeed: null
    })
  }

  if (_action.type === PTOKENS_RESET_DEPOSIT_ADDRESS) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        depositAddress: {
          value: null,
          waiting: false,
          terminated: false,
          success: false,
          error: null
        }
      })
    })
  }

  if (_action.type === PTOKENS_RESET_ISSUE_SUCCESS) {
    return Object.assign({}, _state, {
      isIssueSuccedeed: null
    })
  }

  if (_action.type === PTOKENS_RESET_REDEEM_SUCCESS) {
    return Object.assign({}, _state, {
      isRedeemSuccedeed: null
    })
  }

  if (_action.type === PTOKENS_RESET_ISSUE_ERROR) {
    return Object.assign({}, _state, {
      issueError: null,
      isRedeemSuccedeed: null
    })
  }

  if (_action.type === PTOKENS_RESET_REDEEM_ERROR) {
    return Object.assign({}, _state, {
      redeemError: null,
      isRedeemSuccedeed: null
    })
  }

  if (_action.type === PTOKENS_CIRCULATING_SUPPLY_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        totalSupply: _action.payload.totalSupply
      })
    })
  }

  if (_action.type === PTOKENS_SET_PARAMS) {
    return Object.assign({}, _state, {
      params: _action.payload.params
    })
  }

  if (_action.type === PTOKENS_RESET_PARAMS) {
    return Object.assign({}, _state, {
      params: Object.assign({}, _state.selected, {
        amountToIssue: '',
        amountToRedeem: '',
        typedIssueAccount: '',
        typedRedeemAccount: ''
      })
    })
  }

  return _state
}

export default pTokensReducer
