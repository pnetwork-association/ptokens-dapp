import { useMemo, useState } from 'react'
import _ from 'lodash'

import { offChainFormat, strip } from '../utils/amount-utils'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'
import { getCorrespondingBaseTokenExplorerLinkByBlockchain } from '../utils/explorer'
import utils from 'ptokens-utils'

const useAssets = _assets => {
  return useMemo(() => {
    const modifiedAssets = _assets.map(_asset => updateAsset(_asset))

    const assetsWithBalance = modifiedAssets
      .filter(({ formattedBalance }) => formattedBalance !== '-')
      .sort((_a, _b) => _b.formattedBalance - _a.formattedBalance)
    const assetsWithoutBalance = modifiedAssets.filter(({ formattedBalance }) => formattedBalance === '-')

    return [[...assetsWithBalance, ...assetsWithoutBalance]]
  }, [_assets])
}

const useAssetsWithouDefault = _assets => {
  return useMemo(() => {
    return [_assets.filter(({ defaultFrom, defaultTo }) => !defaultFrom && !defaultTo)]
  }, [_assets])
}

const usePtoken = _asset => {
  return useMemo(() => {
    return [_asset && _asset.isPtoken ? true : false]
  }, [_asset])
}

const useAssetsGroupedByGivenStrategy = _assets => {
  return useMemo(() => {
    const assetsGroupedByKey = _.groupBy(
      Object.values(_assets)
        .map(_asset => ({
          ..._asset,
          formattedName: _asset.formattedName === _asset.nativeSymbol ? 'NATIVE' : _asset.formattedName
        }))
        .sort((_a, _b) => (_a.nativeSymbol > _b.nativeSymbol ? 1 : -1)),
      'nativeSymbol'
    )
    return [assetsGroupedByKey]
  }, [_assets])
}

const useSearchAssets = _assets => {
  const [searchWord, setSearchWord] = useState('')

  const [assets] = useMemo(() => {
    return [
      _assets.filter(
        ({ name, nativeBlockchain, blockchain, address, symbol, coin }) =>
          name.toLowerCase().includes(searchWord.toLowerCase()) ||
          symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
          (coin && coin.toLowerCase().includes(searchWord.toLowerCase())) ||
          nativeBlockchain.toLowerCase().includes(searchWord.toLowerCase()) ||
          `${name} on ${blockchain}`.toLowerCase().includes(searchWord.toLowerCase()) ||
          (address && address.toLowerCase() === searchWord.toLowerCase())
      )
    ]
  }, [_assets, searchWord])

  return [assets, setSearchWord]
}

const updateAsset = _asset => ({
  ..._asset,
  address:
    _asset.address &&
    _asset.blockchain !== 'EOS' &&
    _asset.blockchain !== 'TELOS' &&
    _asset.blockchain !== 'ULTRA' &&
    _asset.blockchain !== 'ALGORAND'
      ? utils.eth.addHexPrefix(_asset.address)
      : _asset.address,
  explorer: _asset.address
    ? `${getCorrespondingBaseTokenExplorerLinkByBlockchain(_asset.blockchain)}${_asset.address}`
    : null,
  formattedBalance: _asset.balance
    ? _asset.withBalanceDecimalsConversion
      ? strip(offChainFormat(_asset.balance, _asset.decimals))
      : _asset.balance
    : '-',
  balance: _asset.balance
    ? _asset.withBalanceDecimalsConversion
      ? offChainFormat(_asset.balance, _asset.decimals)
      : _asset.balance
    : null,
  coin: blockchainSymbolToCoin[_asset.nativeSymbol],
  formattedName: _asset.formattedName
    ? _asset.formattedName
    : _asset.isBlockchainTokenNative
    ? _asset.symbol
    : _asset.isPtoken
    ? `on ${blockchainSymbolToName[_asset.blockchain].toUpperCase()}`
    : _asset.symbol,
  image: `../assets/svg/${_asset.image}`,
  miniImage: `../assets/svg/${_asset.miniImage || _asset.blockchain}.svg`
})

export { useAssets, useAssetsWithouDefault, usePtoken, useAssetsGroupedByGivenStrategy, useSearchAssets }
