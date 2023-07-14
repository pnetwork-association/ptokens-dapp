import { toastr } from 'react-redux-toastr'

import { AssetId } from '../../../constants'
import { Asset, AssetWithAddress } from '../../../settings/swap-assets'
import { blockchainSymbolToName } from '../../../utils/maps'

type defaultSelectionOpts = {
  asset?: string
  from?: string
  to?: string
}

const getDefaultSelection = (_assets: Record<AssetId, AssetWithAddress>, _options: defaultSelectionOpts = {}) => {
  const { asset, from, to } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to })
}

const getDefaultSelectionV2 = (
  _assets: Record<AssetId, AssetWithAddress>,
  { asset, from, to }: defaultSelectionOpts
) => {
  const tkn = _assets[AssetId.USDC_ON_XDAI]
  const ptkn = _assets[AssetId.PUSDC_ON_ARBITRUM_MAINNET]

  const getAsset = (_asset?: string, blockchain?: string) =>
    asset
      ? Object.values(_assets).find(
          (_asset) =>
            !_asset.isHidden &&
            ('underlyingAsset' in _asset
              ? _asset.nativeSymbol.toLowerCase() === asset.toLowerCase()
              : _asset.symbol.toLowerCase() === asset.toLowerCase()) &&
            blockchain &&
            blockchainSymbolToName[_asset.blockchain].toLowerCase() === blockchain.toLowerCase()
        ) || null
      : null

  const assetFrom = getAsset(asset, from)
  const assetTo = getAsset(asset, to)

  if ((assetFrom && !assetTo) || (!assetFrom && assetTo)) {
    toastr.error('Error', 'Invalid routing')
  }

  const pTokenDefaultFrom = Object.assign({}, assetFrom ? assetFrom : tkn)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : ptkn)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return {
    [pTokenDefaultFrom.id]: pTokenDefaultFrom,
    [pTokenDefaultTo.id]: pTokenDefaultTo,
  }
}

export { getDefaultSelection }
