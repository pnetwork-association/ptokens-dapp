import { toastr } from 'react-redux-toastr'

import { pTokenId, tokenId } from '../../../constants'
import { blockchainSymbolToName } from '../../../utils/maps'

const getDefaultSelection = (_assets, _options = {}) => {
  const { asset, from, to } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to })
}

const getDefaultSelectionV2 = (_assets, { asset, from, to }) => {
  const tkn = _assets.find(({ id }) => id === tokenId.USDC_ON_XDAI)
  const ptkn = _assets.find(({ id }) => id === pTokenId.PUSDC_ON_ARBITRUM_MAINNET)
  const assetFrom = asset
    ? _assets.find(
        ({ nativeSymbol, blockchain, isHidden }) =>
          !isHidden &&
          nativeSymbol.toLowerCase() === asset.toLowerCase() &&
          blockchainSymbolToName[blockchain].toLowerCase() === from.toLowerCase()
      )
    : null

  const assetTo = asset
    ? _assets.find(
        ({ nativeSymbol, blockchain, isHidden }) =>
          !isHidden &&
          nativeSymbol.toLowerCase() === asset.toLowerCase() &&
          blockchainSymbolToName[blockchain].toLowerCase() === to.toLowerCase()
      )
    : null

  if ((assetFrom && !assetTo) || (!assetFrom && assetTo)) {
    toastr.error('Error', 'Invalid routing')
  }

  const pTokenDefaultFrom = Object.assign({}, assetFrom ? assetFrom : tkn)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : ptkn)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return [pTokenDefaultFrom, pTokenDefaultTo]
}

export { getDefaultSelection, getDefaultSelectionV2 }
