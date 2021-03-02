import { NodeSelector } from 'ptokens-node-selector'
import assets from '../../settings/swap-assets'
import { SWAP_DATA_LOADED, SHOW_DEPOSIT_ADDRESS_MODAL, HIDE_DEPOSIT_ADDRESS_MODAL } from '../../constants/index'
import store from '../../store'
import { loadEthBalances, loadEosBalances } from './balances'
import { constants, helpers } from 'ptokens-utils'
import pTokens from 'ptokens'
import { getConfigs } from '../../utils/ptokens-configs'

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
          loadEthBalances(
            assets.filter(({ blockchain }) => blockchain === 'ETH'),
            _account,
            _dispatch
          )
          break
        }
        case 'EOS': {
          loadEosBalances(
            assets.filter(({ blockchain }) => blockchain === 'EOS'),
            _account,
            _dispatch
          )
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

const swap = (_from, _to, _amount, _address) => {
  return async _dispatch => {
    try {
      const { wallets } = store.getState()
      console.log(_from, _to)

      // NOTE: pegin
      if (!_from.isPtoken && _to.isPtoken) {
        console.log(`P${_from.symbol.toUpperCase()}_ON_${_to.blockchain.toUpperCase()}_MAINNET`)
        const ptokens = new pTokens(
          getConfigs(`P${_from.symbol.toUpperCase()}_ON_${_to.blockchain.toUpperCase()}_MAINNET`, {
            ethProvider: wallets.eth.provider,
            eosSignatureProvider: wallets.eos.provider,
            telosSignatureProvider: wallets.telos.provider,
            polygonProvider: wallets.polygon.provider,
            xDaiProvider: wallets.xdai.provider,
            bscProvider: wallets.bsc.provider
          })
        )

        console.log(await ptokens.pbtc.getDepositAddress(_address))
      }

      // NOTE: pegout
      if (_from.isPtoken && !_to.isPtoken) {
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const showDepositAddressModal = (_asset, _show) => {
  return {
    type: SHOW_DEPOSIT_ADDRESS_MODAL,
    payload: {
      depositAddressModal: {
        show: _show,
        asset: _asset
      }
    }
  }
}

const hideDepositAddressModal = () => {
  return {
    type: HIDE_DEPOSIT_ADDRESS_MODAL
  }
}

export { loadSwapData, loadBalances, showDepositAddressModal, hideDepositAddressModal, swap }
