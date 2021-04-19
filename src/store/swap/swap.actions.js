import { NodeSelector } from 'ptokens-node-selector'
import assets from '../../settings/swap-assets'
import {
  SWAP_DATA_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON
} from '../../constants/index'
import { constants, helpers } from 'ptokens-utils'
import pTokens from 'ptokens'
import { getConfigs } from '../../utils/ptokens-configs'
import {
  loadEvmCompatibleBalances,
  loadEosioCompatibleBalances,
  loadEvmCompatibleBalance,
  loadEosioCompatibleBalance
} from './utils/balances'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import peginWithDepositAddress from './utils/pegin-with-deposit-address'
import peginWithWallet from './utils/pegin-with-wallet'
import pegout from './utils/pegout'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'

const loadSwapData = ({ pTokenDefault }) => {
  return async _dispatch => {
    try {
      _dispatch({
        type: SWAP_DATA_LOADED,
        payload: {
          assets: [...assets]
        }
      })

      const nodeSelector = new NodeSelector()
      await nodeSelector.fetchNodes('mainnet')

      const nodes = await Promise.all(
        assets.map(({ workingName, blockchain, network, skipNodeSelection }) => {
          if (skipNodeSelection) {
            return null
          }

          const { hostBlockchain, hostNetwork, nativeBlockchain, nativeNetwork } = helpers.parseParams(
            {
              pToken: workingName,
              blockchain: helpers.getBlockchainType(blockchain.toLowerCase()),
              network
            },
            helpers.getNativeBlockchainFromPtokenName(workingName)
          )

          return new Promise(_resolve =>
            nodeSelector
              .select({
                pToken: workingName,
                nativeBlockchain,
                nativeNetwork,
                hostBlockchain,
                hostNetwork
              })
              .then(_resolve)
              .catch(() => _resolve(null))
          )
        })
      )

      const pTokensAddresses = await Promise.all(
        nodes.map(
          _node =>
            new Promise(_resolve =>
              _node
                ? _node
                    .getInfo()
                    .then(({ smart_contract_address, host_smart_contract_address }) => {
                      _resolve(
                        smart_contract_address
                          ? smart_contract_address
                          : host_smart_contract_address
                          ? host_smart_contract_address
                          : null
                      )
                    })
                    .catch(null)
                : _resolve(null)
            )
        )
      )

      const assetsWithAddress = assets.map((_asset, _index) => {
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
          assets: [...assetsWithAddress]
        }
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

/*const getDefaultSelection = (_assets, _pTokenDefault) => {
  const nativeSymbolDefault = _pTokenDefault ? _pTokenDefault.split('-')[0].toLowerCase() : 'none'

  const btc = _assets.find(({ symbol }) => symbol === 'BTC')
  const pbtc = _assets.find(({ symbol }) => symbol === 'PBTC')
  const assetFrom = _assets.find(
    ({ symbol, isPtoken }) =>
      (nativeSymbolDefault === symbol.toLowerCase() || nativeSymbolDefault.slice(1) === symbol.toLowerCase()) &&
      !isPtoken
  )
  const assetTo = _assets.find(({ workingName, blockchain }) =>
    _pTokenDefault ? _pTokenDefault.toLowerCase() === `${workingName}-on-${blockchain.toLowerCase()}` : null
  )

  // NOTE: handle token with p and without p as first letter
  const pTokenDefaultFrom = Object.assign({}, assetFrom ? assetFrom : btc)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : pbtc)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultFrom.id = pTokenDefaultFrom.id + '_DEFAULT'
    pTokenDefaultTo.defaultTo = true
    pTokenDefaultTo.id = pTokenDefaultTo.id + '_DEFAULT'
  }

  return {
    from: pTokenDefaultFrom,
    to: pTokenDefaultTo
  }
}*/

const loadBalances = (_account, _blockchain) => {
  return async _dispatch => {
    try {
      switch (_blockchain) {
        case 'ETH': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('ETH'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('EOS'),
            account: _account,
            dispatch: _dispatch
          })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('TELOS'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'TELOS'
          })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('BSC'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'BSC'
          })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('XDAI'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'XDAI'
          })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('POLYGON'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'POLYGON'
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
      const asset = getAssetById(_id)
      const wallet = getWalletByBlockchain(asset.blockchain)
      if (!wallet || !wallet.account) {
        return
      }
      const account = wallet.account

      switch (asset.blockchain) {
        case 'ETH': {
          loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'BSC', dispatch: _dispatch })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'POLYGON', dispatch: _dispatch })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'XDAI', dispatch: _dispatch })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'TELOS', dispatch: _dispatch })
          break
        }
        default: {
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
      const wallets = getWallets()

      // NOTE: pegin
      if (!_from.isPtoken && _to.isPtoken) {
        const ptokenId = _to.id
        const ptoken = getAssetById(ptokenId)

        const ptokens = new pTokens(
          getConfigs(ptokenId, {
            ethProvider: wallets.eth.provider || getCorrespondingReadOnlyProvider('ETH'),
            eosSignatureProvider: wallets.eos.provider || getCorrespondingReadOnlyProvider('EOS'),
            telosSignatureProvider: wallets.telos.provider || getCorrespondingReadOnlyProvider('TELOS'),
            polygonProvider: wallets.polygon.provider || getCorrespondingReadOnlyProvider('POLYGON'),
            xdaiProvider: wallets.xdai.provider || getCorrespondingReadOnlyProvider('XDAI'),
            bscProvider: wallets.bsc.provider || getCorrespondingReadOnlyProvider('BSC')
          })
        )

        switch (ptoken.name) {
          case 'pBTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pLTC': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pDOGE': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          case 'pRVN': {
            peginWithDepositAddress({ ptokens, address: _address, ptoken, dispatch: _dispatch })
            break
          }
          default: {
            peginWithWallet({
              ptokens,
              ptoken,
              dispatch: _dispatch,
              params: [_amount, _address]
            })
            break
          }
        }
      }

      // NOTE: pegout
      else if (_from.isPtoken && !_to.isPtoken) {
        const ptokenId = _from.id
        const ptoken = getAssetById(ptokenId)

        const ptokens = new pTokens(
          getConfigs(ptokenId, {
            ethProvider: wallets.eth.provider || getCorrespondingReadOnlyProvider('ETH'),
            eosSignatureProvider: wallets.eos.provider || getCorrespondingReadOnlyProvider('EOS'),
            telosSignatureProvider: wallets.telos.provider || getCorrespondingReadOnlyProvider('TELOS'),
            polygonProvider: wallets.polygon.provider || getCorrespondingReadOnlyProvider('POLYGON'),
            xdaiProvider: wallets.xdai.provider || getCorrespondingReadOnlyProvider('XDAI'),
            bscProvider: wallets.bsc.provider || getCorrespondingReadOnlyProvider('BSC')
          })
        )

        pegout({ ptokens, address: _address, ptoken, dispatch: _dispatch, params: [_amount, _address] })
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const showDepositAddressModal = (_asset, _depositAddress) => {
  return {
    type: SHOW_DEPOSIT_ADDRESS_MODAL,
    payload: {
      depositAddressModal: {
        asset: _asset,
        show: true,
        value: _depositAddress
      }
    }
  }
}

const hideDepositAddressModal = () => {
  return _dispatch => {
    _dispatch(resetProgress())
    _dispatch({
      type: HIDE_DEPOSIT_ADDRESS_MODAL
    })
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

const updateSwapButton = (_text, _disabled = false) => {
  return {
    type: UPDATE_SWAP_BUTTON,
    payload: {
      swapButton: {
        text: _text,
        disabled: _disabled
      }
    }
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
  resetProgress,
  updateSwapButton
}
