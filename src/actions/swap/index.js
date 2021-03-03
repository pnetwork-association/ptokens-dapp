import { NodeSelector } from 'ptokens-node-selector'
import assets from '../../settings/swap-assets'
import {
  SWAP_DATA_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET
} from '../../constants/index'
import store from '../../store'
import { loadEthBalances, loadEosBalances, loadEthBalance, loadEosBalance } from './balances'
import { constants, helpers } from 'ptokens-utils'
import pTokens from 'ptokens'
import { getConfigs } from '../../utils/ptokens-configs'
import { getCorrespondingReadOnlyProviderV2 } from '../../utils/read-only-providers'
import peginWithDepositAddress from './pegin-with-deposit-address'

const loadSwapData = (_withTestnetInstance = false) => {
  return async _dispatch => {
    try {
      const assetsMaybeWithoutTestnetInstances = assets.filter(({ network }) =>
        _withTestnetInstance === true ? true : network === 'mainnet'
      )

      const nodes = await Promise.all(
        assetsMaybeWithoutTestnetInstances.map(({ name, redeemFrom, network, skipNodeSelection }) => {
          if (skipNodeSelection) {
            Promise.resolve()
            return null
          }

          const nodeSelector = new NodeSelector({
            pToken: name,
            blockchain: helpers.getBlockchainType(redeemFrom.toLowerCase()),
            network: network
          })

          return nodeSelector.select()
        })
      )

      const pTokensAddresses = (
        await Promise.all(nodes.map(_node => (_node ? _node.getInfo() : { smart_contract_address: null })))
      ).map(({ smart_contract_address, host_smart_contract_address }) =>
        smart_contract_address
          ? smart_contract_address
          : host_smart_contract_address
          ? host_smart_contract_address
          : null
      )

      const assetsWithAddress = assetsMaybeWithoutTestnetInstances.map((_asset, _index) => {
        const nativeAddress = constants.tokens[helpers.getBlockchainType(_asset.blockchain)]
          ? constants.tokens[helpers.getBlockchainType(_asset.blockchain)][_asset.network][_asset.symbol]
          : null
        return {
          ..._asset,
          address: nativeAddress ? nativeAddress : pTokensAddresses[_index]
        }
      })

      _dispatch({
        type: SWAP_DATA_LOADED,
        payload: {
          assets: assetsWithAddress
        }
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalances = (_account, _blockchain) => {
  return async _dispatch => {
    try {
      const {
        swap: { assets }
      } = store.getState()

      switch (_blockchain) {
        case 'ETH': {
          loadEthBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'ETH'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        case 'EOS': {
          loadEosBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'EOS'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        default:
          break
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalanceByAssetId = _id => {
  return async _dispatch => {
    try {
      const {
        wallets,
        swap: { assets }
      } = store.getState()

      const asset = assets.find(({ id }) => id === _id)
      if (!wallets[asset.blockchain.toLowerCase()] || !wallets[asset.blockchain.toLowerCase()].account) {
        return
      }

      const account = wallets[asset.blockchain.toLowerCase()].account

      switch (asset.blockchain) {
        case 'ETH': {
          loadEthBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'EOS': {
          loadEosBalance({ asset, account, dispatch: _dispatch })
          break
        }
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const swap = (_from, _to, _amount, _address) => {
  return async _dispatch => {
    try {
      _dispatch(resetProgress())
      const { wallets } = store.getState()
      console.log(_from, _to)

      // NOTE: pegin
      if (!_from.isPtoken && _to.isPtoken) {
        const assetId = `P${_from.symbol.toUpperCase()}_ON_${_to.blockchain.toUpperCase()}_MAINNET`
        const ptokens = new pTokens(
          getConfigs(assetId, {
            ethProvider: wallets.eth.provider || getCorrespondingReadOnlyProviderV2('ETH'),
            eosSignatureProvider: wallets.eos.provider || getCorrespondingReadOnlyProviderV2('EOS'),
            telosSignatureProvider: wallets.telos.provider || getCorrespondingReadOnlyProviderV2('TELOS'),
            polygonProvider: wallets.polygon.provider || getCorrespondingReadOnlyProviderV2('POLYGON'),
            xDaiProvider: wallets.xdai.provider || getCorrespondingReadOnlyProviderV2('XDAI'),
            bscProvider: wallets.bsc.provider || getCorrespondingReadOnlyProviderV2('BSC')
          })
        )

        const ptoken = `p${_from.symbol.toUpperCase()}`
        switch (ptoken) {
          case 'pETH': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'PNT': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'PTERIA': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pYFI': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pLINK': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pMKR': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pBTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, asset: _from, dispatch: _dispatch, assetId })
            break
          }
          case 'pLTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, asset: _from, dispatch: _dispatch, assetId })
            break
          }
          case 'pUNI': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pBAND': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pBAL': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pCOMP': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pSNX': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pOMG': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pDAI': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pANT': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pLRC': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pUOS': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pBAT': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pREP': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pZRX': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pPNK': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          case 'pDOGE': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, asset: _from, dispatch: _dispatch, assetId })
            break
          }
          case 'pEOS': {
            // loggedIssueWithWallet(ptokens, _params, pToken, _dispatch)
            break
          }
          default:
            break
        }
      }

      // NOTE: pegout
      if (_from.isPtoken && !_to.isPtoken) {
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const showDepositAddressModal = _asset => {
  return {
    type: SHOW_DEPOSIT_ADDRESS_MODAL,
    payload: {
      depositAddressModal: {
        asset: _asset,
        show: true
      }
    }
  }
}

const hideDepositAddressModal = () => {
  return {
    type: HIDE_DEPOSIT_ADDRESS_MODAL
  }
}

const updateProgress = _progress => {
  return {
    type: PROGRESS_UPDATED,
    payload: {
      progress: _progress
    }
  }
}

const resetProgress = () => {
  return {
    type: PROGRESS_RESET
  }
}

export {
  loadSwapData,
  loadBalances,
  loadBalanceByAssetId,
  showDepositAddressModal,
  hideDepositAddressModal,
  swap,
  updateProgress,
  resetProgress
}
