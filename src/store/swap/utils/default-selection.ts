import { toastr } from 'react-redux-toastr'

import { PTokenId, TokenId } from '../../../constants'
import { Asset } from '../../../settings/swap-assets'
import { blockchainSymbolToName } from '../../../utils/maps'

type defaultSelectionOpts = {
  asset?: string
  from?: string
  to?: string
}

const getDefaultSelection = (_assets: Asset[], _options: defaultSelectionOpts = {}) => {
  const { asset, from, to } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to })
}

const getDefaultSelectionV2 = (_assets: Asset[], { asset, from, to }: defaultSelectionOpts) => {
  const tkn = _assets.find(({ id }) => id === TokenId.USDC_ON_XDAI)
  const ptkn = _assets.find(({ id }) => id === PTokenId.PUSDC_ON_ARBITRUM_MAINNET)

  const getAsset = (_asset?: string, blockchain?: string) =>
    asset
      ? _assets.find(
          (_asset) =>
            !_asset.isHidden &&
            ('underlyingAsset' in _asset
              ? _asset.nativeSymbol.toLowerCase() === asset.toLowerCase()
              : _asset.symbol.toLowerCase() === asset.toLowerCase()) &&
            blockchain &&
            blockchainSymbolToName[_asset.blockchain].toLowerCase() === blockchain.toLowerCase()
        )
      : null

  const assetFrom = getAsset(asset, from)
  const assetTo = getAsset(asset, to)

  if ((assetFrom && !assetTo) || (!assetFrom && assetTo)) {
    toastr.error('Error', 'Invalid routing')
  }

  const pTokenDefaultFrom: Asset = Object.assign({}, assetFrom ? assetFrom : tkn)
  const pTokenDefaultTo: Asset = Object.assign({}, assetTo ? assetTo : ptkn)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return [pTokenDefaultFrom, pTokenDefaultTo]
}

export { getDefaultSelection }
