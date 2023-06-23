import { toastr } from 'react-redux-toastr'

const getDefaultSelection = (_assets, _options = {}) => {
  const { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = _options
  return getDefaultSelectionV2(_assets, { asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol })
}

const getDefaultSelectionV2 = (_assets, { asset, from, to, host_symbol }) => {
  const tkn = _assets.find(({ id }) => id === 'TKN')
  const ptkn = _assets.find(({ id }) => id === 'PTKN_ON_GOERLI_TESTNET')
  const assetFrom = asset
    ? _assets.find(
        ({ isPtoken, nativeSymbol, blockchain, symbol }) =>
          !isPtoken &&
          nativeSymbol.toLowerCase() === asset.toLowerCase() &&
          from.toLowerCase() === blockchain.toLowerCase() &&
          (host_symbol ? symbol.toLowerCase() === host_symbol.toLowerCase() : true)
      )
    : null

  const assetTo = asset
    ? _assets.find(
        ({ nativeSymbol, blockchain }) =>
          nativeSymbol.toLowerCase() === asset.toLowerCase() && blockchain.toLowerCase() === to.toLowerCase()
      )
    : null

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

  return [tkn, ptkn]
}

export { getDefaultSelection, getDefaultSelectionV2 }
