import { toastr } from 'react-redux-toastr'

const getDefaultSelection = (_assets, _options = {}) => {
  const { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol })
}

const getDefaultSelectionV2 = (_assets, { asset, from, to, host_symbol }) => {
  const tkn = _assets.find(({ id }) => id === 'USDC_ON_XDAI')
  const ptkn = _assets.find(({ id }) => id === 'PUSDC_ON_ARBITRUM_MAINNET')
  const assetFrom = asset
    ? _assets.find(
        ({ nativeSymbol, symbol, blockchain, isHidden }) =>
          !isHidden &&
          nativeSymbol.toLowerCase() === asset.toLowerCase() &&
          blockchain.toLowerCase() === from.toLowerCase() &&
          (host_symbol ? symbol.toLowerCase() === host_symbol.toLowerCase() : true)
      )
    : null

  const assetTo = asset
    ? _assets.find(
        ({ nativeSymbol, blockchain, isHidden }) =>
          !isHidden &&
          nativeSymbol.toLowerCase() === asset.toLowerCase() &&
          blockchain.toLowerCase() === to.toLowerCase()
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
