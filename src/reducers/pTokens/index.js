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
  PTOKENS_MINT_NONCE_LOADED,
  PTOKENS_BURN_NONCE_LOADED,
  PTOKENS_TOTAL_ISSUED_LOADED,
  PTOKENS_TOTAL_REDEEMED_LOADED,
  PTOKENS_CIRCULATING_SUPPLY_LOADED,
  PTOKENS_SET_DEPOSIT_ADDRESS,
  PTOKENS_RESET_DEPOSIT_ADDRESS,
  PTOKENS_SET_PARAMS,
  PTOKENS_RESET_PARAMS
} from '../../constants/index'

const initialState = {
  selected: {
    name: 'pBTC',
    decimals: 8,
    issueFrom: 'BTC',
    redeemFrom: 'ETH',
    mintNonce: null,
    burnNonce: null,
    totalIssued: null,
    totalRedeemed: null,
    circulatingSupply: null,
    tokenType: 'ERC-20',
    network: 'ropsten',

    //only for pbtc
    depositAddress: {
      value: null,
      waiting: false,
      terminated: false,
      success: false,
      error: null
    }
  },
  balance: null,
  available: [
    {
      name: 'pEOS',
      tokenType: 'ERC-20',
      issueFrom: 'EOS',
      redeemFrom: 'ETH',
      decimals: 4,
      network: 'kovan'
    },
    {
      name: 'pBTC',
      tokenType: 'ERC-20',
      issueFrom: 'BTC',
      redeemFrom: 'ETH',
      decimals: 8,
      network: 'ropsten'
    },
    {
      name: 'pLTC',
      tokenType: 'ERC-20',
      issueFrom: 'LTC',
      redeemFrom: 'ETH',
      decimals: 8,
      network: 'ropsten'
    }
    /*{
      name: 'pDAI',
      tokenType: 'ERC-20' 
    }*/
  ],
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
        decimals: _action.payload.pToken.decimals,
        issueFrom: _action.payload.pToken.issueFrom,
        redeemFrom: _action.payload.pToken.redeemFrom,
        tokenType: _action.payload.pToken.tokenType,
        network: _action.payload.pToken.network,
        circulatingSupply: null,
        totalIssued: null,
        totalRedeemed: null,
        mintNonce: null,
        burnNonce: null,
        depositAddress: {
          value: null,
          waiting: false,
          terminated: false,
          success: false,
          error: null
        }
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

  if (_action.type === PTOKENS_MINT_NONCE_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        mintNonce: _action.payload.mintNonce
      })
    })
  }

  if (_action.type === PTOKENS_BURN_NONCE_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        burnNonce: _action.payload.burnNonce
      })
    })
  }

  if (_action.type === PTOKENS_TOTAL_ISSUED_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        totalIssued: _action.payload.totalIssued
      })
    })
  }

  if (_action.type === PTOKENS_TOTAL_REDEEMED_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        totalRedeemed: _action.payload.totalRedeemed
      })
    })
  }

  if (_action.type === PTOKENS_CIRCULATING_SUPPLY_LOADED) {
    return Object.assign({}, _state, {
      selected: Object.assign({}, _state.selected, {
        circulatingSupply: _action.payload.circulatingSupply
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
