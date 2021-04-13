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
import store from '../index'
import { constants, helpers } from 'ptokens-utils'
import pTokens from 'ptokens'
import { getConfigs } from '../../utils/ptokens-configs'
import { loadEthBalances, loadEosBalances, loadEthBalance, loadEosBalance } from './utils/balances'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import peginWithDepositAddress from './utils/pegin-with-deposit-address'
import peginWithWallet from './utils/pegin-with-wallet'
import pegout from './utils/pegout'

const loadSwapData = ({ withTestnetInstance = false, pTokenDefault }) => {
  return async _dispatch => {
    try {
      const assetsMaybeWithoutTestnetInstances = assets.filter(({ network }) =>
        withTestnetInstance === true ? true : network === 'mainnet'
      )

      // NOTE: default selection
      const { from, to } = getDefaultSelection(assetsMaybeWithoutTestnetInstances, pTokenDefault)
      _dispatch({
        type: SWAP_DATA_LOADED,
        payload: {
          assets: [...assetsMaybeWithoutTestnetInstances, from, to]
        }
      })

      // NOTE: infos loading
      let nodes
      try {
        nodes = await Promise.all(
          assetsMaybeWithoutTestnetInstances.map(({ workingName, blockchain, network, skipNodeSelection }) => {
            if (skipNodeSelection) {
              Promise.resolve()
              return null
            }

            const nodeSelector = new NodeSelector({
              pToken: workingName,
              blockchain: helpers.getBlockchainType(blockchain.toLowerCase()),
              network: network
            })

            return new Promise(_resolve =>
              nodeSelector
                .select()
                .then(_resolve)
                .catch(() => _resolve(null))
            )
          })
        )
      } catch (_err) {
        console.error(_err)
      }

      let pTokensAddresses
      try {
        pTokensAddresses = (
          await Promise.all(nodes.map(_node => (_node ? _node.getInfo() : { smart_contract_address: null })))
        ).map(({ smart_contract_address, host_smart_contract_address }) =>
          smart_contract_address
            ? smart_contract_address
            : host_smart_contract_address
            ? host_smart_contract_address
            : null
        )
      } catch (_err) {
        console.error(_err)
      }

      const assetsWithAddress = assetsMaybeWithoutTestnetInstances.map((_asset, _index) => {
        const nativeAddress = constants.tokens[helpers.getBlockchainType(_asset.blockchain)]
          ? constants.tokens[helpers.getBlockchainType(_asset.blockchain)][_asset.network][_asset.symbol]
          : null
        return {
          ..._asset,
          address: nativeAddress ? nativeAddress : pTokensAddresses[_index]
        }
      })

      // NOTE: default selection
      const defaultSelection = getDefaultSelection(assetsWithAddress, pTokenDefault)
      _dispatch({
        type: SWAP_DATA_LOADED,
        payload: {
          assets: [...assetsWithAddress, defaultSelection.from, defaultSelection.to]
        }
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const getDefaultSelection = (_assets, _pTokenDefault) => {
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
        case 'TELOS': {
          loadEosBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'TELOS'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'TELOS'
          })
          break
        }
        case 'BSC': {
          loadEthBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'BSC'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'BSC'
          })
          break
        }
        case 'XDAI': {
          loadEthBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'XDAI'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'XDAI'
          })
          break
        }
        case 'POLYGON': {
          loadEthBalances({
            assets: assets.filter(({ blockchain }) => blockchain === 'POLYGON'),
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
        case 'BSC': {
          loadEthBalance({ asset, account, blockchain: 'BSC', dispatch: _dispatch })
          break
        }
        case 'POLYGON': {
          loadEthBalance({ asset, account, blockchain: 'POLYGON', dispatch: _dispatch })
          break
        }
        case 'XDAI': {
          loadEthBalance({ asset, account, blockchain: 'XDAI', dispatch: _dispatch })
          break
        }
        case 'TELOS': {
          loadEosBalance({ asset, account, blockchain: 'TELOS', dispatch: _dispatch })
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
      const {
        wallets,
        swap: { assets }
      } = store.getState()

      // NOTE: pegin
      if (!_from.isPtoken && _to.isPtoken) {
        const ptokenId = _to.id
        const ptoken = assets.find(({ id }) => ptokenId === id)

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
        const ptoken = assets.find(({ id }) => ptokenId === id)

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
