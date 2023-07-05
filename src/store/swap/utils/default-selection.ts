import { toastr } from 'react-redux-toastr'

import { PTokenId, TokenId } from '../../../constants'
import { Asset } from '../../../settings/swap-assets'
import { blockchainSymbolToName } from '../../../utils/maps'

const getDefaultSelection = (_assets: Asset[], _options: { asset?: string; from?: string; to?: string } = {}) => {
  const { asset, from, to } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to })
}

const getDefaultSelectionV2 = (
  _assets: Asset[],
  { asset, from, to }: { asset?: string; from?: string; to?: string }
) => {
  const tkn = _assets.find(({ id }) => id === TokenId.USDC_ON_XDAI)
  const ptkn = _assets.find(({ id }) => id === PTokenId.PUSDC_ON_ARBITRUM_MAINNET)
  const assetFrom = asset
    ? _assets.find(
        (_asset) =>
          !_asset.isHidden &&
          _asset.symbol.toLowerCase() === asset.toLowerCase() &&
          from &&
          blockchainSymbolToName[_asset.blockchain].toLowerCase() === from.toLowerCase()
      )
    : null

  const assetTo = asset
    ? _assets.find(
        (_asset) =>
          !_asset.isHidden &&
          _asset.symbol.toLowerCase() === asset.toLowerCase() &&
          to &&
          blockchainSymbolToName[_asset.blockchain].toLowerCase() === to.toLowerCase()
      )
    : null

  if ((assetFrom && !assetTo) || (!assetFrom && assetTo)) {
    toastr.error('Error', 'Invalid routing')
  }

  const pTokenDefaultFrom: Asset = Object.assign({}, assetFrom ? assetFrom : tkn)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : ptkn)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return [pTokenDefaultFrom, pTokenDefaultTo]
}

export { getDefaultSelection }
