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
  PBTC_ON_EOS_TESTNET
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
  id: 0
}

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

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedIssue(ptokens, _params, _pToken, _dispatch)
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

    switch (_pToken.name) {
      case 'pEOS': {
        peosLoggedRedeem(ptokens, _params, _pToken, _dispatch)
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

const getBalance = (_pToken, _account, _configs) => {
  return async dispatch => {
    if (!_pToken.nodeInfo.isCompatible) return

    const provider = getCorrespondingReadOnlyProvider(_pToken)

    const web3 = new Web3(provider)
    const res = await makeContractCall(
      web3,
      'balanceOf',
      _pToken.nodeInfo.contractAddress,
      pTokenAbi,
      [_account]
    )

    dispatch({
      type: PTOKENS_BALANCE_LOADED,
      payload: {
        balance: (res / Math.pow(10, _pToken.contractDecimals)).toFixed(
          _pToken.realDecimals
        )
      }
    })
  }
}

const getCirculatingSupply = (_pToken, _configs) => {
  return async dispatch => {
    if (!_pToken.nodeInfo.isCompatible) return

    const provider = getCorrespondingReadOnlyProvider(_pToken)
    const web3 = new Web3(provider)
    const res = await makeContractCall(
      web3,
      'totalSupply',
      _pToken.nodeInfo.contractAddress,
      pTokenAbi,
      []
    )

    dispatch({
      type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
      payload: {
        circulatingSupply: (
          res / Math.pow(10, _pToken.contractDecimals)
        ).toFixed(_pToken.realDecimals)
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

const _getCorrectConfigs = (_pToken, _configs) => {
  const { issuer, redeemer } = _configs

  if (_pToken.id === PBTC_ON_ETH_MAINNET) {
    return {
      pbtc: {
        btcNetwork: 'mainnet',
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
        eosRpc: settings[2].eos.provableEndpoint,
        hostBlockchain: 'eos'
      }
    }
  }

  /*switch (_type) {
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
          btcNetwork: _network === 'mainnet' ? 'bitcoin' : 'testnet',
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
  }*/
}

export {
  setSelectedpToken,
  issue,
  redeem,
  getBalance,
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
