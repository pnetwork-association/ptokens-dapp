import { toastr } from 'react-redux-toastr'

const getDefaultSelection = (_assets, _options = {}) => {
  const { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = _options
  if (!asset && !from && !to) {
    return getDefaultSelectionV1(_assets, { pToken })
  }

  return getDefaultSelectionV2(_assets, { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol })
}

const getDefaultSelectionV1 = (_assets, { pToken }) => {
  const nativeSymbolDefault = pToken ? pToken.split('-')[0].toLowerCase() : 'none'
  const btc = _assets.find(({ symbol }) => symbol === 'BTC')
  const pbtc = _assets.find(({ symbol }) => symbol === 'PBTC')
  const assetFrom = _assets.find(
    ({ symbol, isNative }) =>
      (nativeSymbolDefault === symbol.toLowerCase() || nativeSymbolDefault.slice(1) === symbol.toLowerCase()) &&
      isNative
  )
  const assetTo = _assets.find(({ workingName, blockchain }) =>
    pToken ? pToken.toLowerCase() === `${workingName}-on-${blockchain.toLowerCase()}` : null
  )

  // NOTE: handle token with p and without p as first letter
  const pTokenDefaultFrom = Object.assign({}, assetFrom ? assetFrom : pbtc)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : btc)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return [pTokenDefaultFrom, pTokenDefaultTo]
}

const getDefaultSelectionV2 = (
  _assets,
  { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol }
) => {
  const btc = _assets.find(({ symbol }) => symbol === 'BTC')
  const pbtc = _assets.find(({ symbol }) => symbol === 'PBTC')
  const assetFrom = _assets.find(
    ({ nativeSymbol, blockchain, address, symbol }) =>
      nativeSymbol.toLowerCase() === asset.toLowerCase() &&
      from.toLowerCase() === blockchain.toLowerCase() &&
      (algorand_from_assetid && blockchain === 'ALGORAND' ? address === algorand_from_assetid : true) &&
      (host_symbol ? symbol.toLowerCase() === host_symbol.toLowerCase() : true)
  )

  const assetTo = _assets.find(
    ({ nativeSymbol, blockchain, address }) =>
      (asset.toLowerCase() === 'ethpnt'
        ? nativeSymbol.toLowerCase() === 'pnt'
        : nativeSymbol.toLowerCase() === asset.toLowerCase()) &&
      blockchain.toLowerCase() === to.toLowerCase() &&
      (algorand_to_assetid && blockchain === 'ALGORAND' ? address === algorand_to_assetid : true)
  )

  if ((assetFrom && !assetTo) || (!assetFrom && assetTo)) {
    toastr.error('Error', 'Invalid routing')
  }

  if (assetFrom && assetTo) {
    const pTokenDefaultFrom = Object.assign({}, assetFrom)
    const pTokenDefaultTo = Object.assign({}, assetTo)
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
    return [pTokenDefaultFrom, pTokenDefaultTo]
  }

  return [btc, pbtc]
}

export { getDefaultSelection, getDefaultSelectionV1, getDefaultSelectionV2 }
