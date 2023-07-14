import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { useMemo, useState } from 'react'

import { AssetId } from '../constants'
import { Asset, AssetWithAddress, UpdatedAsset, isNative } from '../settings/swap-assets'
import { offChainFormat, strip } from '../utils/amount-utils'
import { getCorrespondingTokenExplorerLinkByBlockchain } from '../utils/explorer'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'

const updateAssets = async (_assets: Partial<Record<AssetId, AssetWithAddress>>) => {
  const modifiedAssets = await Promise.all(
    Object.values(_assets)
      .filter(({ isHidden }) => !isHidden)
      .map((_asset) => updateAsset(_asset))
  )
  const assetsWithBalance = Object.fromEntries(
    modifiedAssets
      .filter(({ balance }) => balance !== null && balance !== undefined)
      .sort((_a, _b) => _b.balance.minus(_a.balance).toNumber())
      .map((_el) => [_el.id, _el])
  )
  const assetsWithoutBalance = Object.fromEntries(
    modifiedAssets.filter(({ formattedBalance }) => formattedBalance === '-').map((_el) => [_el.id, _el])
  )
  return Object.assign({}, assetsWithBalance, assetsWithoutBalance)
}

const useAssetsWithouDefault = (_assets: UpdatedAsset[]) => {
  return useMemo(() => {
    return _assets.filter(({ defaultFrom, defaultTo }) => !defaultFrom && !defaultTo)
  }, [_assets])
}

const usePtoken = (_asset: Asset) => {
  return useMemo(() => {
    return [_asset && !isNative(_asset) ? true : false]
  }, [_asset])
}

const useAssetsGroupedByGivenStrategy = (_assets: Asset[]) => {
  return useMemo(() => {
    const assetsGroupedByKey = _.groupBy(
      Object.values(_assets)
        .map((_asset) => ({
          ..._asset,
          formattedName: isNative(_asset) ? 'NATIVE' : _asset.formattedName,
          group: 'nativeSymbol' in _asset ? _asset.nativeSymbol : _asset.symbol,
        }))
        .sort((_a, _b) => (_a.group > _b.group ? 1 : -1)),
      'group'
    )
    return assetsGroupedByKey
  }, [_assets])
}

const useSearchAssets = (_assets: UpdatedAsset[]): [UpdatedAsset[], React.Dispatch<React.SetStateAction<string>>] => {
  const [searchWord, setSearchWord] = useState<string>('')

  const assets = useMemo(() => {
    return _assets.filter(
      (_asset) =>
        _asset.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        _asset.symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
        (_asset.coin && _asset.coin.toLowerCase().includes(searchWord.toLowerCase())) ||
        ('nativeBlockchain' in _asset
          ? blockchainSymbolToName[_asset.nativeBlockchain].toLowerCase().includes(searchWord.toLowerCase())
          : false) ||
        `${_asset.name} on ${_asset.blockchain}`.toLowerCase().includes(searchWord.toLowerCase())
    )
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
        : _asset.balance.toString()
      : '-',
    balance: _asset.balance
      ? _asset.withBalanceDecimalsConversion
        ? offChainFormat(_asset.balance, _asset.decimals)
        : _asset.balance
      : BigNumber(0),
    coin: blockchainSymbolToCoin['nativeSymbol' in _asset ? _asset.nativeSymbol : _asset.symbol],
    formattedName: _asset.formattedName
      ? _asset.formattedName
      : !isNative(_asset)
      ? `on ${blockchainSymbolToName[_asset.blockchain].toUpperCase()}`
      : _asset.symbol,
    image: `./assets/svg/${_asset.image}`,
    miniImage: `./assets/svg/${_asset.miniImage || blockchainSymbolToName[_asset.blockchain].toUpperCase()}.svg`,
  }
}

export { updateAssets, useAssetsWithouDefault, usePtoken, useAssetsGroupedByGivenStrategy, useSearchAssets }
