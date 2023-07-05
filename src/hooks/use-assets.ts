import _ from 'lodash'
import { useMemo, useState } from 'react'

import { Asset, UpdatedAsset } from '../settings/swap-assets'
import { AssetWithAddress } from '../store/swap/swap.reducer'
import { offChainFormat, strip } from '../utils/amount-utils'
import { getCorrespondingTokenExplorerLinkByBlockchain } from '../utils/explorer'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'

const updateAssets = async (_assets: AssetWithAddress[]) => {
  const modifiedAssets = await Promise.all(
    _assets.filter(({ isHidden }) => !isHidden).map((_asset) => updateAsset(_asset))
  )
  const assetsWithBalance = modifiedAssets
    .filter(({ balance }) => balance !== null && balance !== undefined)
    .sort((_a, _b) => _b.balance - _a.balance)
  const assetsWithoutBalance = modifiedAssets.filter(({ formattedBalance }) => formattedBalance === '-')

  return [...assetsWithBalance, ...assetsWithoutBalance]
}

const useAssetsWithouDefault = (_assets: Asset[]) => {
  return useMemo(() => {
    return [_assets.filter(({ defaultFrom, defaultTo }) => !defaultFrom && !defaultTo)]
  }, [_assets])
}

const usePtoken = (_asset: Asset) => {
  return useMemo(() => {
    return [_asset && !_asset.isNative ? true : false]
  }, [_asset])
}

const useAssetsGroupedByGivenStrategy = (_assets: Asset[]) => {
  return useMemo(() => {
    const assetsGroupedByKey = _.groupBy(
      Object.values(_assets)
        .map((_asset) => ({
          ..._asset,
          formattedName: _asset.formattedName === _asset.nativeSymbol ? 'NATIVE' : _asset.formattedName,
        }))
        .sort((_a, _b) => (_a.nativeSymbol > _b.nativeSymbol ? 1 : -1)),
      'nativeSymbol'
    )
    return assetsGroupedByKey
  }, [_assets])
}

const useSearchAssets = (_assets: UpdatedAsset[]) => {
  const [searchWord, setSearchWord] = useState('')

  const [assets] = useMemo(() => {
    return [
      _assets.filter(
        ({ name, nativeBlockchain, blockchain, symbol, coin }) =>
          name.toLowerCase().includes(searchWord.toLowerCase()) ||
          symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
          (coin && coin.toLowerCase().includes(searchWord.toLowerCase())) ||
          blockchainSymbolToName[nativeBlockchain].toLowerCase().includes(searchWord.toLowerCase()) ||
          `${name} on ${blockchain}`.toLowerCase().includes(searchWord.toLowerCase())
      ),
    ]
  }, [_assets, searchWord])

  return [assets, setSearchWord]
}

const updateAsset = (_asset: AssetWithAddress): UpdatedAsset => {
  return {
    ..._asset,
    explorer: getCorrespondingTokenExplorerLinkByBlockchain(_asset.blockchain, _asset.address),
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
      : !_asset.isNative
      ? `on ${blockchainSymbolToName[_asset.blockchain].toUpperCase()}`
      : _asset.symbol,
    image: `./assets/svg/${_asset.image}`,
    miniImage: `./assets/svg/${_asset.miniImage || blockchainSymbolToName[_asset.blockchain].toUpperCase()}.svg`,
  }
}

export { updateAssets, useAssetsWithouDefault, usePtoken, useAssetsGroupedByGivenStrategy, useSearchAssets }
