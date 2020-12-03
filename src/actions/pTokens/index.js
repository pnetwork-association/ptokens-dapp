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
  PETH_ON_EOS_MAINNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PTERIA_ON_EOS_MAINNET
} from '../../constants/index'
import pTokens from 'ptokens'
import { constants } from 'ptokens-utils'
import settings from '../../settings'
import { getEthBalance, getEosBalance } from './balance'
import { getEthTotalSupply, getEosTotalSupply } from './total-supply'
import { Mutex } from 'async-mutex'
import loggedRedeem from './loggers/redeem'
import loggedIssueWithDepositAddress from './loggers/issue-with-deposit-address'
import loggedIssueWithWallet from './loggers/issue-with-wallet'

const mutex = new Mutex()

let numberOfTotalSupplyRequests = 0
let numberOfBalanceOfRequests = 0

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
    try {
      const ptokens = new pTokens(_getCorrectConfigs(_pToken, _configs))
      // prettier-ignore
      ptokens[_pToken.name.toLowerCase()].setSelectedNode(_pToken.nodeInfo.endpoint)

      switch (_pToken.name) {
        case 'pETH': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'PNT': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'PTERIA': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'pYFI': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'pLINK': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'pMKR': {
          loggedIssueWithWallet(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'pBTC': {
          loggedIssueWithDepositAddress(ptokens, _params, _pToken, _dispatch)
          break
        }
        case 'pLTC': {
          loggedIssueWithDepositAddress(ptokens, _params, _pToken, _dispatch)
          break
        }
        default:
          break
      }
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const redeem = (_pToken, _params, _configs) => {
  return _dispatch => {
    try {
      const ptokens = new pTokens(_getCorrectConfigs(_pToken, _configs))
      // prettier-ignore
      ptokens[_pToken.name.toLowerCase()].setSelectedNode(_pToken.nodeInfo.endpoint)
      loggedRedeem(ptokens, _params, _pToken, _dispatch)
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const getBalance = (_pToken, _account) => {
  return async _dispatch => {
    try {
      if (!_pToken.nodeInfo.isCompatible) return

      numberOfBalanceOfRequests += 1
      const release = await mutex.acquire()

      let balance = null
      try {
        switch (_pToken.redeemFrom) {
          case 'ETH': {
            balance = await getEthBalance(_pToken, _account)
            break
          }
          case 'EOS': {
            balance = await getEosBalance(_pToken, _account)
            break
          }
          case 'TELOS': {
            balance = await getEosBalance(_pToken, _account)
            break
          }
          default:
            break
        }
      } catch (err) {
        balance = null
      }

      numberOfBalanceOfRequests -= 1
      if (numberOfBalanceOfRequests === 0) {
        _dispatch({
          type: PTOKENS_BALANCE_LOADED,
          payload: {
            balance
          }
        })
      }

      release()
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const getTotalSupply = (_pToken, _configs) => {
  return async _dispatch => {
    try {
      if (!_pToken.nodeInfo.isCompatible) return

      numberOfTotalSupplyRequests += 1
      const release = await mutex.acquire()

      let totalSupply = null

      try {
        switch (_pToken.redeemFrom) {
          case 'ETH': {
            totalSupply = await getEthTotalSupply(_pToken)
            break
          }
          case 'EOS': {
            totalSupply = await getEosTotalSupply(_pToken)
            break
          }
          case 'TELOS': {
            totalSupply = await getEosTotalSupply(_pToken)
            break
          }
          default:
            break
        }
      } catch (err) {
        totalSupply = null
      }

      numberOfTotalSupplyRequests -= 1
      if (numberOfTotalSupplyRequests === 0) {
        _dispatch({
          type: PTOKENS_CIRCULATING_SUPPLY_LOADED,
          payload: {
            totalSupply
          }
        })
      }
      release()
    } catch (_err) {}
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
  const { networks, blockchains, pTokens } = constants

  console.log(redeemer)

  if (_pToken.id === PBTC_ON_ETH_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBTC_ON_ETH_TESTNET) {
    return {
      pbtc: {
        network: networks.Testnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBTC_ON_EOS_TESTNET) {
    return {
      pbtc: {
        network: networks.Testnet,
        blockchain: blockchains.Eosio,
        eosRpc: settings[PBTC_ON_EOS_TESTNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBTC_ON_EOS_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        eosRpc: settings[PBTC_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBTC_ON_TELOS_MAINNET) {
    return {
      pbtc: {
        nativeNetwork: networks.BitcoinMainnet,
        nativeBlockchain: blockchains.Bitcoin,
        hostNetwork: networks.TelosMainnet,
        hostBlockchain: blockchains.Telos,
        eosRpc: settings[PBTC_ON_TELOS_MAINNET].telos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PLTC_ON_ETH_MAINNET) {
    return {
      pltc: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PLTC_ON_EOS_MAINNET) {
    return {
      pltc: {
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: redeemer,
        eosRpc: settings[PLTC_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PLTC_ON_ETH_TESTNET) {
    return {
      pltc: {
        network: networks.Testnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PETH_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pETH,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PETH_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PNT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PNT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PNT_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PMKR_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pMKR,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PMKR_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PLINK_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pLINK,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PLINK_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PYFI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pYFI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PYFI_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PTERIA_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PTERIA,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PTERIA_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
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
