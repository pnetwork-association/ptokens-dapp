import _ from 'lodash'
import { useMemo, useState } from 'react'

import { getFactoryAddressByBlockchain } from '../settings'
import factoryAbi from '../store/swap/abi/PFactroryAbi.json'
import { getAssetById } from '../store/swap/swap.selectors'
import { offChainFormat, strip } from '../utils/amount-utils'
import { getCorrespondingTokenExplorerLinkByBlockchain } from '../utils/explorer'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'
import { getProviderByNetworkId } from '../utils/ptokens'

const updateAssets = async (_assets) => {
  const modifiedAssets = await Promise.all(
    _assets.filter(({ isHidden }) => !isHidden).map((_asset) => updateAsset(_asset))
  )
  const assetsWithBalance = modifiedAssets
    .filter(({ formattedBalance }) => formattedBalance !== '-')
    .sort((_a, _b) => _b.formattedBalance - _a.formattedBalance)
  const assetsWithoutBalance = modifiedAssets.filter(({ formattedBalance }) => formattedBalance === '-')

  return [...assetsWithBalance, ...assetsWithoutBalance]
}

const useAssetsWithouDefault = (_assets) => {
  return useMemo(() => {
    return [_assets.filter(({ defaultFrom, defaultTo }) => !defaultFrom && !defaultTo)]
  }, [_assets])
}

const usePtoken = (_asset) => {
  return useMemo(() => {
    return [_asset && !_asset.isNative ? true : false]
  }, [_asset])
}

const useAssetsGroupedByGivenStrategy = (_assets) => {
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
    return [assetsGroupedByKey]
  }, [_assets])
}

const useSearchAssets = (_assets) => {
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

const computeAssetAddress = async (_asset) => {
  const asset = _asset.underlyingAsset ? getAssetById(_asset.underlyingAsset) : _asset
  const provider = getProviderByNetworkId(_asset.networkId)
  const factoryAddress = getFactoryAddressByBlockchain(_asset.blockchain)
  const pTokenAddress = await provider.makeContractCall(
    {
      contractAddress: factoryAddress,
      method: 'getPTokenAddress',
      abi: factoryAbi,
    },
    [asset.name, asset.symbol, asset.decimals, asset.address, asset.networkId]
  )
  return pTokenAddress
}

const updateAsset = async (_asset) => {
  const pTokenAddress = await computeAssetAddress(_asset)
  return {
    ..._asset,
    address: _asset.isNative ? _asset.address : pTokenAddress,
    pTokenAddress: _asset.isNative ? pTokenAddress : null,
    explorer: getCorrespondingTokenExplorerLinkByBlockchain(
      _asset.blockchain,
      _asset.isPtoken ? pTokenAddress : _asset.address
    ),
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
      : !_asset.isNative
      ? `on ${blockchainSymbolToName[_asset.blockchain].toUpperCase()}${_asset.isPseudoNative ? ' (NATIVE)' : ''}`
      : _asset.symbol,
    image: `./assets/svg/${_asset.image}`,
    miniImage: `./assets/svg/${_asset.miniImage || blockchainSymbolToName[_asset.blockchain].toUpperCase()}.svg`,
  }
}

export { updateAssets, useAssetsWithouDefault, usePtoken, useAssetsGroupedByGivenStrategy, useSearchAssets }
