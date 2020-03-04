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
import { pltcLoggedIssue, pltcLoggedRedeem } from './loggers/pltc'
import settings from '../../settings'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { makeContractCall } from '../../utils/eth'
import pTokenAbi from '../../utils/eth-contract-abi'
import Web3 from 'web3'

let ptokens = null

let pTokenCurrent = {
  name: 'pbtc',
  redeemFrom: 'eth'
}

const _selectpToken = (_pToken, _redeemerNetwork, _configs) => {
  const configs = _getCorrectConfigs(_pToken.name, _redeemerNetwork, _configs)

  pTokenCurrent.name = _pToken.name
  pTokenCurrent.redeemFrom = _pToken.redeemFrom

  return new pTokens(configs)
}

const _getSelectedpToken = (_pToken, _redeemerNetwork, _configs) => {
  if (
    !ptokens ||
    _pToken.name.toLowerCase() !== pTokenCurrent.name ||
    _pToken.redeemFrom.toLowerCase() !== pTokenCurrent.redeemFrom
  ) {
    ptokens = _selectpToken(_pToken, _redeemerNetwork, _configs)
  }

  return ptokens
}

const setSelectedpToken = (_pToken, _redeemerNetwork) => {
  return {
    type: SET_SELECTED_PTOKEN,
    payload: {
      pToken: _pToken,
      redemeerNetwork: _redeemerNetwork
    }
  }
}

const issue = (_pToken, _params, _redeemerNetwork, _configs) => {
  return async _dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _redeemerNetwork, _configs)

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedIssue(ptokens, _params, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedIssue(ptokens, _params, _dispatch)
        break
      }
      case 'pLTC': {
        pltcLoggedIssue(ptokens, _params, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const redeem = (_pToken, _params, _redeemerNetwork, _configs) => {
  return _dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _redeemerNetwork, _configs)

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedRedeem(ptokens, _params, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedRedeem(ptokens, _params, _dispatch)
        break
      }
      case 'pLTC': {
        pltcLoggedRedeem(ptokens, _params, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const getBalance = (_pToken, _account, _redeemerNetwork, _configs) => {
  return async dispatch => {
    const provider = getCorrespondingReadOnlyProvider(
      _pToken.name,
      'ETH',
      _redeemerNetwork
    )
    const web3 = new Web3(provider)
    const res = await makeContractCall(
      web3,
      'balanceOf',
      settings[_pToken.name.toLowerCase()][_redeemerNetwork][
        _pToken.redeemFrom.toLowerCase()
      ].contractAddress,
      pTokenAbi,
      [_account]
    )

    dispatch({
      type: PTOKENS_BALANCE_LOADED,
      payload: {
        balance: res / Math.pow(10, _pToken.decimals)
      }
    })
  }
}

const getMintNonce = (_pToken, _configs) => {
  return {
    type: PTOKENS_MINT_NONCE_LOADED,
    payload: {
      mintNonce: 0
    }
  }
  /*return async dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)
    const mintNonce = await ptokens[_pToken.name.toLowerCase()].getMintNonce()
    dispatch({
      type: PTOKENS_MINT_NONCE_LOADED,
      payload: {
        mintNonce
      }
    })
  }*/
}

const getBurnNonce = (_pToken, _configs) => {
  return {
    type: PTOKENS_BURN_NONCE_LOADED,
    payload: {
      burnNonce: 0
    }
  }
  /*return async dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)
    const burnNonce = await ptokens[_pToken.name.toLowerCase()].getBurnNonce()
    dispatch({
      type: PTOKENS_BURN_NONCE_LOADED,
      payload: {
        burnNonce
      }
    })
  }*/
}

const getTotalIssued = (_pToken, _configs) => {
  return {
    type: PTOKENS_TOTAL_ISSUED_LOADED,
    payload: {
      totalIssued: 0
    }
  }
  /*return async dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)
    const totalIssued = await ptokens[
      _pToken.name.toLowerCase()
    ].getTotalIssued()
    dispatch({
      type: PTOKENS_TOTAL_ISSUED_LOADED,
      payload: {
        totalIssued
      }
    })
  }*/
}

const getTotalRedeemed = (_pToken, _configs) => {
  return {
    type: PTOKENS_TOTAL_REDEEMED_LOADED,
    payload: {
      totalRedeemed: 0
    }
  }
  /*return async dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)
    const totalRedeemed = await ptokens[
      _pToken.name.toLowerCase()
    ].getTotalRedeemed()
    dispatch({
      type: PTOKENS_TOTAL_REDEEMED_LOADED,
      payload: {
        totalRedeemed
      }
    })
  }*/
}

const getCirculatingSupply = (_pToken, _redeemerNetwork, _configs) => {
  return async dispatch => {
    const provider = getCorrespondingReadOnlyProvider(
      _pToken.name,
      'ETH',
      _redeemerNetwork
    )
    const web3 = new Web3(provider)
    const res = await makeContractCall(
      web3,
      'totalSupply',
      settings[_pToken.name.toLowerCase()][_redeemerNetwork][
        _pToken.redeemFrom.toLowerCase()
      ].contractAddress,
      pTokenAbi,
      []
    )

    dispatch({
      type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
      payload: {
        circulatingSupply: res / Math.pow(10, _pToken.decimals)
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

const _getCorrectConfigs = (_type, _redeemerNetwork, _configs) => {
  const { issuer, redeemer } = _configs

  console.log(_redeemerNetwork)

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
          btcNetwork: _redeemerNetwork === 'mainnet' ? 'bitcoin' : 'testnet',
          ethProvider: redeemer
        }
      }
    }
    case 'pLTC': {
      return {
        pltc: {
          ltcNetwork: 'testnet',
          ethProvider: redeemer
        }
      }
    }
    default:
      return null
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
