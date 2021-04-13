import { useMemo } from 'react'
import { offChainFormat, strip } from '../utils/amount-utils'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'
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
    return [_assets.filter(({ id }) => !id.includes('_DEFAULT'))]
  }, [_assets])
}

const updateAsset = _asset => ({
  ..._asset,
  address:
    _asset.address && _asset.blockchain !== 'EOS' && _asset.blockchain !== 'TELOS'
      ? utils.eth.addHexPrefix(_asset.address)
      : _asset.address,
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
  formattedName: _asset.isBlockchainTokenNative
    ? _asset.symbol
    : _asset.isPtoken
    ? `on ${blockchainSymbolToName[_asset.blockchain].toUpperCase()}`
    : _asset.symbol,
  image: `../assets/svg/${_asset.image}`,
  miniImage: `../assets/svg/${_asset.blockchain}.svg`
})

export { useAssets, useAssetsWithouDefault }
