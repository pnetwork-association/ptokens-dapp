import { NodeSelector } from 'ptokens-node-selector'
import { helpers } from 'ptokens-utils'
import assets from '../../settings/swap-assets'
import { SWAP_DATA_LOADED, SWAP_BALANCE_LOADED } from '../../constants/index'
import store from '../../store'
import { loadEthBalances, loadEosBalances } from './balances'

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
            return
          }

          const nodeSelector = new NodeSelector({
            pToken: name,
            blockchain: helpers.getBlockchainType(redeemFrom.toLowerCase()),
            network: network
          })

          return nodeSelector.select()
        })
      )

      const addresses = (
        await Promise.all(nodes.map(_node => (_node ? _node.getInfo() : { smart_contract_address: null })))
      ).map(({ smart_contract_address, host_smart_contract_address }) =>
        smart_contract_address
          ? smart_contract_address
          : host_smart_contract_address
          ? host_smart_contract_address
          : null
      )

      const assetsWithAddress = assetsMaybeWithoutTestnetInstances.map((_asset, _index) => {
        return {
          ..._asset,
          address: _asset.address ? _asset.address : addresses[_index]
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
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

export { loadSwapData, loadBalances }
