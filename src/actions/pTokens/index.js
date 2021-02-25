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
  PTERIA_ON_EOS_MAINNET,
  PUNI_ON_EOS_MAINNET,
  PBAL_ON_EOS_MAINNET,
  PBAND_ON_EOS_MAINNET,
  PCOMP_ON_EOS_MAINNET,
  PSNX_ON_EOS_MAINNET,
  POMG_ON_EOS_MAINNET,
  PDAI_ON_EOS_MAINNET,
  PANT_ON_EOS_MAINNET,
  PLRC_ON_EOS_MAINNET,
  PUOS_ON_EOS_MAINNET,
  PBAT_ON_EOS_MAINNET,
  PREP_ON_EOS_MAINNET,
  PZRX_ON_EOS_MAINNET,
  PPNK_ON_EOS_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET
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
import store from '../../store'

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

const issue = (_params, _configs) => {
  return async _dispatch => {
    try {
      const {
        pTokens: { selected: pToken }
      } = store.getState()

      const ptokens = new pTokens(_getCorrectConfigs(pToken, _configs))
      // prettier-ignore
      ptokens[pToken.name.toLowerCase()].setSelectedNode(pToken.nodeInfo.endpoint)

      switch (pToken.name) {
        case 'pETH': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'PNT': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'PTERIA': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pYFI': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pLINK': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pMKR': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pBTC': {
          loggedIssueWithDepositAddress(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pLTC': {
          loggedIssueWithDepositAddress(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pUNI': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pBAND': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pBAL': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pCOMP': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pSNX': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pOMG': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pDAI': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pANT': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pLRC': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pUOS': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pBAT': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pREP': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pZRX': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pPNK': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pDOGE': {
          loggedIssueWithDepositAddress(ptokens, _params, pToken, _dispatch)
          break
        }
        case 'pEOS': {
          loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
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

const redeem = (_params, _configs) => {
  return _dispatch => {
    try {
      const {
        pTokens: { selected: pToken }
      } = store.getState()

      const ptokens = new pTokens(_getCorrectConfigs(pToken, _configs))
      // prettier-ignore
      ptokens[pToken.name.toLowerCase()].setSelectedNode(pToken.nodeInfo.endpoint)
      loggedRedeem(ptokens, _params, pToken, _dispatch)
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const getBalance = _account => {
  return async _dispatch => {
    try {
      const {
        pTokens: { selected: pToken }
      } = store.getState()

      numberOfBalanceOfRequests += 1
      const release = await mutex.acquire()

      let balance = null
      try {
        switch (pToken.redeemFrom) {
          case 'ETH': {
            balance = await getEthBalance(pToken, _account)
            break
          }
          case 'BSC': {
            balance = await getEthBalance(pToken, _account)
            break
          }
          case 'POLYGON': {
            balance = await getEthBalance(pToken, _account)
            break
          }
          case 'EOS': {
            balance = await getEosBalance(pToken, _account)
            break
          }
          case 'TELOS': {
            balance = await getEosBalance(pToken, _account)
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

const getTotalSupply = _address => {
  return async _dispatch => {
    try {
      const {
        pTokens: { selected: pToken }
      } = store.getState()

      numberOfTotalSupplyRequests += 1
      const release = await mutex.acquire()

      let totalSupply = null

      try {
        switch (pToken.redeemFrom) {
          case 'ETH': {
            totalSupply = await getEthTotalSupply(pToken, _address)
            break
          }
          case 'BSC': {
            totalSupply = await getEthTotalSupply(pToken, _address)
            break
          }
          case 'POLYGON': {
            totalSupply = await getEthTotalSupply(pToken, _address)
            break
          }
          case 'EOS': {
            totalSupply = await getEosTotalSupply(pToken, _address)
            break
          }
          case 'TELOS': {
            totalSupply = await getEosTotalSupply(pToken, _address)
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
    type: _type === 'host' ? PTOKENS_SET_CUSTOM_HOST_RPC : PTOKENS_SET_CUSTOM_NATIVE_RPC,
    payload: {
      rpc: _rpc
    }
  }
}

const _getCorrectConfigs = (_pToken, _configs) => {
  const { redeemer, issuer } = _configs
  const { networks, blockchains, pTokens } = constants

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
  if (_pToken.id === PUNI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUNI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PUNI_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBAND_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAND,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PBAND_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBAL_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAL,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PBAL_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PCOMP_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pCOMP,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PCOMP_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PSNX_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pSNX,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PSNX_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === POMG_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pOMG,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[POMG_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PDAI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pDAI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PDAI_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PANT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pANT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PANT_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PLRC_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pLRC,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PLRC_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PUOS_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUOS,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PUOS_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PBAT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PBAT_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PREP_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pREP,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PREP_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PZRX_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pZRX,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PZRX_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PPNK_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pPNK,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider: issuer,
        eosRpc: settings[PPNK_ON_EOS_MAINNET].eos.endpoint,
        eosSignatureProvider: redeemer
      }
    }
  }
  if (_pToken.id === PDOGE_ON_ETH_MAINNET) {
    return {
      pdoge: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PEOS_ON_ETH_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.pEOS,
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider: redeemer,
        eosRpc: settings[PEOS_ON_ETH_MAINNET].eos.endpoint,
        eosSignatureProvider: issuer
      }
    }
  }
  if (_pToken.id === PBTC_ON_BSC_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider: redeemer
      }
    }
  }
  if (_pToken.id === PEOS_ON_POLYGON_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.pEOS,
        network: networks.Mainnet,
        blockchain: blockchains.Polygon,
        ethProvider: redeemer,
        eosRpc: settings[PEOS_ON_POLYGON_MAINNET].eos.endpoint,
        eosSignatureProvider: issuer
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
