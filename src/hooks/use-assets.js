import { useMemo } from 'react'
import { offChainFormat, strip } from '../utils/amount-utils'
import { blockchainSymbolToName, blockchainSymbolToCoin } from '../utils/maps'
import utils from 'ptokens-utils'

const useAssets = _assets => {
  return useMemo(() => {
    const assets = _assets.map(_asset => {
      return {
        ..._asset,
        address:
          _asset.address && _asset.blockchain !== 'EOS' ? utils.eth.addHexPrefix(_asset.address) : _asset.address,
        formattedBalance:
          _asset.balance && _asset.blockchain !== 'EOS'
            ? strip(offChainFormat(_asset.balance, _asset.decimals))
            : _asset.blockchain === 'EOS'
            ? _asset.balance
              ? strip(_asset.balance)
              : '-'
            : '-',
        balance:
          _asset.balance && _asset.blockchain !== 'EOS'
            ? offChainFormat(_asset.balance, _asset.decimals).toFixed()
            : _asset.blockchain === 'EOS'
            ? _asset.balance
              ? _asset.balance
              : '-'
            : '-',
        coin: blockchainSymbolToCoin[_asset.nativeSymbol],
        formattedName:
          _asset.symbol === 'BTC' ||
          _asset.symbol === 'EOS' ||
          _asset.symbol === 'LTC' ||
          _asset.symbol === 'ETH' ||
          _asset.symbol === 'DOGE' ||
          _asset.symbol === 'TLOS'
            ? _asset.symbol
            : _asset.isPtoken
            ? `ON ${blockchainSymbolToName[_asset.blockchain]}`
            : _asset.symbol,
        // prettier-ignore
        image: `../assets/svg/${_asset.image}`,
        miniImage: `../assets/svg/${_asset.blockchain}.svg`
      }
    })

    const assetsWithBalance = assets
      .filter(({ formattedBalance }) => formattedBalance !== '-')
      .sort((_a, _b) => _b.formattedBalance - _a.formattedBalance)
    const assetsWithoutBalance = assets.filter(({ formattedBalance }) => formattedBalance === '-')

    return [[...assetsWithBalance, ...assetsWithoutBalance]]
  }, [_assets])
}

export { useAssets }
