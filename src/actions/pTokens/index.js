import {
  SET_SELECTED_PTOKEN,
  PTOKENS_BALANCE_LOADED,
  PTOKENS_RESET_ISSUE_SUCCESS,
  PTOKENS_RESET_REDEEM_SUCCESS,
  PTOKENS_RESET_ISSUE_ERROR,
  PTOKENS_RESET_REDEEM_ERROR,
  PTOKENS_MINT_NONCE_LOADED,
  PTOKENS_BURN_NONCE_LOADED,
  PTOKENS_TOTAL_ISSUED_LOADED,
  PTOKENS_TOTAL_REDEEMED_LOADED,
  PTOKENS_CIRCULATING_SUPPLY_LOADED,
  PTOKENS_RESET_DEPOSIT_ADDRESS,
  PTOKENS_SET_PARAMS,
  PTOKENS_RESET_PARAMS
} from '../../constants/index'
import pTokens from 'ptokens'
import { peosLoggedIssue, peosLoggedRedeem } from './loggers/peos'
import { pbtcLoggedIssue, pbtcLoggedRedeem } from './loggers/pbtc'
import settings from '../../settings'

const setSelectedpToken = _type => {
  return {
    type: SET_SELECTED_PTOKEN,
    payload: {
      pToken: _getCorrectpTokenObject(_type)
    }
  }
}

const issue = (_pToken, _params, _configs) => {
  return async _dispatch => {
    const configs = _getCorrectConfigs(_pToken.name, _configs)
    const ptokens = new pTokens(configs)

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedIssue(ptokens, _params, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedIssue(ptokens, _params, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const redeem = (_pToken, _params, _configs) => {
  return _dispatch => {
    const configs = _getCorrectConfigs(_pToken.name, _configs)
    const ptokens = new pTokens(configs)

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedRedeem(ptokens, _params, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedRedeem(ptokens, _params, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const getBalance = (_pTokenName, _account, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const balance = await ptokens[_pTokenName.toLowerCase()].getBalance(
      _account
    )
    dispatch({
      type: PTOKENS_BALANCE_LOADED,
      payload: {
        balance
      }
    })
  }
}

const getMintNonce = (_pTokenName, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const mintNonce = await ptokens[_pTokenName.toLowerCase()].getMintNonce()
    dispatch({
      type: PTOKENS_MINT_NONCE_LOADED,
      payload: {
        mintNonce
      }
    })
  }
}

const getBurnNonce = (_pTokenName, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const burnNonce = await ptokens[_pTokenName.toLowerCase()].getBurnNonce()
    dispatch({
      type: PTOKENS_BURN_NONCE_LOADED,
      payload: {
        burnNonce
      }
    })
  }
}

const getTotalIssued = (_pTokenName, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const totalIssued = await ptokens[
      _pTokenName.toLowerCase()
    ].getTotalIssued()
    dispatch({
      type: PTOKENS_TOTAL_ISSUED_LOADED,
      payload: {
        totalIssued
      }
    })
  }
}

const getTotalRedeemed = (_pTokenName, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const totalRedeemed = await ptokens[
      _pTokenName.toLowerCase()
    ].getTotalRedeemed()
    dispatch({
      type: PTOKENS_TOTAL_REDEEMED_LOADED,
      payload: {
        totalRedeemed
      }
    })
  }
}

const getCirculatingSupply = (_pTokenName, _configs) => {
  return async dispatch => {
    const configs = _getCorrectConfigs(_pTokenName, _configs)
    const ptokens = new pTokens(configs)
    const circulatingSupply = await ptokens[
      _pTokenName.toLowerCase()
    ].getCirculatingSupply()
    dispatch({
      type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
      payload: {
        circulatingSupply
      }
    })
  }
}

const resetDepositAddress = () => {
  return {
    type: PTOKENS_RESET_DEPOSIT_ADDRESS
  }
}

const resetIssueSuccess = () => {
  return {
    type: PTOKENS_RESET_ISSUE_SUCCESS
  }
}

const resetRedeemSuccess = () => {
  return {
    type: PTOKENS_RESET_REDEEM_SUCCESS
  }
}

const resetIssueError = () => {
  return {
    type: PTOKENS_RESET_ISSUE_ERROR
  }
}

const resetParams = () => {
  return {
    type: PTOKENS_RESET_PARAMS
  }
}

const resetRedeemError = () => {
  return {
    type: PTOKENS_RESET_REDEEM_ERROR
  }
}

const setParams = _params => {
  return {
    type: PTOKENS_SET_PARAMS,
    payload: {
      params: _params
    }
  }
}

const setBalance = _balance => {
  return {
    type: PTOKENS_BALANCE_LOADED,
    payload: {
      balance: _balance
    }
  }
}

const _getCorrectConfigs = (_type, _configs) => {
  const { issuer, redeemer } = _configs

  switch (_type) {
    case 'pEOS': {
      return {
        peos: {
          eosRpc: settings.peos.eos.provableEndpoint,
          eosSignatureProvider: issuer,
          ethProvider: redeemer
        }
      }
    }
    case 'pBTC': {
      return {
        pbtc: {
          btcNetwork: 'testnet',
          ethProvider: redeemer
        }
      }
    }
    default:
      return null
  }
}

const _getCorrectpTokenObject = _type => {
  switch (_type) {
    case 'pEOS': {
      return {
        name: 'pEOS',
        decimals: 4,
        issueFrom: 'EOS',
        redeemFrom: 'ETH',
        tokenType: 'ERC-20',
        network: 'kovan'
      }
    }
    case 'pBTC': {
      return {
        name: 'pBTC',
        decimals: 8,
        issueFrom: 'BTC',
        redeemFrom: 'ETH',
        tokenType: 'ERC-20',
        network: 'ropsten'
      }
    }
    default:
      break
  }
}

export {
  setSelectedpToken,
  issue,
  redeem,
  getBalance,
  getMintNonce,
  getBurnNonce,
  getTotalIssued,
  getTotalRedeemed,
  getCirculatingSupply,
  resetDepositAddress,
  resetIssueSuccess,
  resetRedeemSuccess,
  resetIssueError,
  resetParams,
  resetRedeemError,
  setParams,
  setBalance
}
