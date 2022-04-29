import { toastr } from 'react-redux-toastr'

const getDefaultSelection = (_assets, _options = {}) => {
  const { pToken, asset, from, to } = _options
  if (!asset && !from && !to) {
    return getDefaultSelectionV1(_assets, { pToken })
  }

  return getDefaultSelectionV2(_assets, { asset, from, to })
}

const getDefaultSelectionV1 = (_assets, { pToken }) => {
  const nativeSymbolDefault = pToken ? pToken.split('-')[0].toLowerCase() : 'none'
  const btc = _assets.find(({ symbol }) => symbol === 'BTC')
  const pbtc = _assets.find(({ symbol }) => symbol === 'PBTC')
  const assetFrom = _assets.find(
    ({ symbol, isPtoken }) =>
      (nativeSymbolDefault === symbol.toLowerCase() || nativeSymbolDefault.slice(1) === symbol.toLowerCase()) &&
      !isPtoken
  )
  const assetTo = _assets.find(({ workingName, blockchain }) =>
    pToken ? pToken.toLowerCase() === `${workingName}-on-${blockchain.toLowerCase()}` : null
  )

  // NOTE: handle token with p and without p as first letter
  const pTokenDefaultFrom = Object.assign({}, assetFrom ? assetFrom : btc)
  const pTokenDefaultTo = Object.assign({}, assetTo ? assetTo : pbtc)

  if (pTokenDefaultFrom && pTokenDefaultTo) {
    pTokenDefaultFrom.defaultFrom = true
    pTokenDefaultTo.defaultTo = true
  }

  return [pTokenDefaultFrom, pTokenDefaultTo]
}

const getDefaultSelectionV2 = (_assets, { asset, from, to }) => {
  const btc = _assets.find(({ symbol }) => symbol === 'BTC')
  const pbtc = _assets.find(({ symbol }) => symbol === 'PBTC')

  const assetFrom = _assets.find(({ nativeSymbol }) => nativeSymbol.toLowerCase() === asset.toLowerCase())

  const assetTo = _assets.find(({ nativeSymbol }) => nativeSymbol.toLowerCase() === asset.toLowerCase())

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
