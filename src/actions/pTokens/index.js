import {
  SET_SELECTED_PTOKEN,
  PTOKENS_BALANCE_LOADED,
  PTOKENS_RESET_ISSUE_SUCCESS,
  PTOKENS_RESET_REDEEM_SUCCESS,
  PTOKENS_RESET_ISSUE_ERROR,
  PTOKENS_RESET_REDEEM_ERROR,
  PTOKENS_CIRCULATING_SUPPLY_LOADED,
  PTOKENS_RESET_DEPOSIT_ADDRESS,
  PTOKENS_SET_PARAMS,
  PTOKENS_RESET_PARAMS,
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PTOKENS_SET_CUSTOM_HOST_RPC,
  PTOKENS_SET_CUSTOM_NATIVE_RPC,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET
} from '../../constants/index'
import pTokens from 'ptokens'
import { perc20LoggedIssue, perc20LoggedRedeem } from './loggers/perc20'
import { pbtcLoggedIssue, pbtcLoggedRedeem } from './loggers/pbtc'
import { pltcLoggedIssue, pltcLoggedRedeem } from './loggers/pltc'
import settings from '../../settings'
import { getEthBalance, getEosBalance } from './balance'
import { getEthTotalSupply, getEosTotalSupply } from './total-supply'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

let ptokens = null

let pTokenCurrent = {
  id: 0
}

let numberOfTotalSupplyRequests = 0
let numberOfBalanceOfRequests = 0

const _selectpToken = (_pToken, _configs) => {
  const configs = _getCorrectConfigs(_pToken, _configs)

  pTokenCurrent.id = _pToken.id

  return new pTokens(configs)
}

const _getSelectedpToken = (_pToken, _configs) => {
  if (!ptokens || _pToken.id !== pTokenCurrent.id) {
    ptokens = _selectpToken(_pToken, _configs)
  }

  return ptokens
}

const setSelectedpToken = (_pToken, _withNodeSelection = true) => {
  return {
    type: SET_SELECTED_PTOKEN,
    payload: {
      pToken: _pToken,
      withNodeSelection: _withNodeSelection
    }
  }
}

const issue = (_pToken, _params, _configs) => {
  return async _dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)
    ptokens[
      _pToken.name === 'pETH' ? 'pweth' : _pToken.name.toLowerCase()
    ].nodeSelector.setEndpoint(_pToken.nodeInfo.endpoint)

    switch (_pToken.name) {
      case 'pETH': {
        perc20LoggedIssue(ptokens, _params, _pToken, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedIssue(ptokens, _params, _pToken, _dispatch)
        break
      }
      case 'pLTC': {
        pltcLoggedIssue(ptokens, _params, _pToken, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const redeem = (_pToken, _params, _configs) => {
  return _dispatch => {
    const ptokens = _getSelectedpToken(_pToken, _configs)

    ptokens[
      _pToken.name === 'pETH' ? 'pweth' : _pToken.name.toLowerCase()
    ].nodeSelector.setEndpoint(_pToken.nodeInfo.endpoint)

    switch (_pToken.name) {
      case 'pETH': {
        perc20LoggedRedeem(ptokens, _params, _pToken, _dispatch)
        break
      }
      case 'pBTC': {
        pbtcLoggedRedeem(ptokens, _params, _pToken, _dispatch)
        break
      }
      case 'pLTC': {
        pltcLoggedRedeem(ptokens, _params, _pToken, _dispatch)
        break
      }
      default:
        break
    }
  }
}

const getBalance = (_pToken, _account) => {
  return async dispatch => {
    if (!_pToken.nodeInfo.isCompatible) return

    numberOfBalanceOfRequests += 1
    const release = await mutex.acquire()

    let balance = null
    try {
      if (_pToken.redeemFrom === 'ETH') {
        balance = await getEthBalance(_pToken, _account)
      }

      if (_pToken.redeemFrom === 'EOS') {
        balance = await getEosBalance(_pToken, _account)
      }
    } catch (err) {
      balance = null
    }

    numberOfBalanceOfRequests -= 1
    if (numberOfBalanceOfRequests === 0) {
      dispatch({
        type: PTOKENS_BALANCE_LOADED,
        payload: {
          balance
        }
      })
    }

    release()
  }
}

const getTotalSupply = (_pToken, _configs) => {
  return async dispatch => {
    if (!_pToken.nodeInfo.isCompatible) return

    numberOfTotalSupplyRequests += 1
    const release = await mutex.acquire()

    let totalSupply = null

    try {
      if (_pToken.redeemFrom === 'ETH') {
        totalSupply = await getEthTotalSupply(_pToken)
      }

      if (_pToken.redeemFrom === 'EOS') {
        totalSupply = await getEosTotalSupply(_pToken)
      }
    } catch (err) {
      totalSupply = null
    }

    numberOfTotalSupplyRequests -= 1
    if (numberOfTotalSupplyRequests === 0) {
      dispatch({
        type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
        payload: {
          totalSupply
        }
      })
    }
    release()
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

const setCustomRpc = (_rpc, _type) => {
  return {
    type:
      _type === 'host'
        ? PTOKENS_SET_CUSTOM_HOST_RPC
        : PTOKENS_SET_CUSTOM_NATIVE_RPC,
    payload: {
      rpc: _rpc
    }
  }
}

const _getCorrectConfigs = (_pToken, _configs) => {
  const { redeemer, issuer } = _configs

  if (_pToken.id === PBTC_ON_ETH_MAINNET) {
    return {
      pbtc: {
        btcNetwork: 'bitcoin',
        ethProvider: redeemer,
        hostBlockchain: 'eth'
      }
    }
  }

  if (_pToken.id === PBTC_ON_ETH_TESTNET) {
    return {
      pbtc: {
        btcNetwork: 'testnet',
        ethProvider: redeemer,
        hostBlockchain: 'eth'
      }
    }
  }

  if (_pToken.id === PBTC_ON_EOS_TESTNET) {
    return {
      pbtc: {
        btcNetwork: 'testnet',
        eosRpc: settings[PBTC_ON_EOS_TESTNET].eos.provableEndpoint,
        eosSignatureProvider: redeemer,
        hostBlockchain: 'eos'
      }
    }
  }
  if (_pToken.id === PBTC_ON_EOS_MAINNET) {
    return {
      pbtc: {
        btcNetwork: 'bitcoin',
        eosRpc: settings[PBTC_ON_EOS_MAINNET].eos.provableEndpoint,
        eosSignatureProvider: redeemer,
        hostBlockchain: 'eos'
      }
    }
  }
  if (_pToken.id === PLTC_ON_ETH_MAINNET) {
    return {
      pltc: {
        ltcNetwork: 'litecoin',
        ethProvider: redeemer,
        hostBlockchain: 'eth'
      }
    }
  }
  if (_pToken.id === PLTC_ON_EOS_MAINNET) {
    return {
      pltc: {
        ltcNetwork: 'litecoin',
        eosRpc: settings[PLTC_ON_EOS_MAINNET].eos.provableEndpoint,
        eosSignatureProvider: redeemer,
        hostBlockchain: 'eos'
      }
    }
  }
  if (_pToken.id === PLTC_ON_ETH_TESTNET) {
    return {
      pltc: {
        ltcNetwork: 'testnet',
        ethProvider: redeemer,
        hostBlockchain: 'eth'
      }
    }
  }
  if (_pToken.id === PETH_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: 'pweth',
        ethNetwork: 'mainnet',
        ethProvider: issuer,
        eosRpc: settings[PETH_ON_EOS_MAINNET].eos.provableEndpoint,
        eosSignatureProvider: redeemer,
        hostBlockchain: 'eos',
        tokenAddress: '0x0000000000000000000000000000000000000000'
      }
    }
  }
}

export {
  setSelectedpToken,
  issue,
  redeem,
  getBalance,
  getTotalSupply,
  resetDepositAddress,
  resetIssueSuccess,
  resetRedeemSuccess,
  resetIssueError,
  resetParams,
  resetRedeemError,
  setParams,
  setBalance,
  setCustomRpc
}
