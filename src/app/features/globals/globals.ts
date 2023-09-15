import { AbiItem } from "web3-utils"

import { AssetId } from "../../../constants"
import { Asset, NativeAsset } from "../../../constants/swap-assets"
import { getFactoryAddressByBlockchain } from "../../../settings"
import { getProviderByNetworkId } from "../../../utils/ptokens"
import factoryAbi from './abi/PFactroryAbi.json'

export const computePTokenAddress = async (_asset: Asset, _assets: Record<AssetId, Asset>): Promise<string> => {
  const asset = 'underlyingAsset' in _asset ? (_assets[_asset.underlyingAsset] as NativeAsset) : _asset as NativeAsset
  if (asset) {
    const provider = getProviderByNetworkId(_asset.networkId)
    if (!provider) throw new Error(`Missing provider for network ID ${_asset.networkId}`)
    const factoryAddress = getFactoryAddressByBlockchain(_asset.blockchain)
    const pTokenAddress = await provider.makeContractCall<string>(
      {
        contractAddress: factoryAddress,
        method: 'getPTokenAddress',
        abi: factoryAbi as unknown as AbiItem,
      },
      [asset.name, asset.symbol, asset.decimals, asset.address, asset.networkId]
    )
    return pTokenAddress
  }
  throw new Error('Unable to calculate pToken address')
}

export type LoadSwapDataOpts = { defaultSelection?: { asset?: string; from?: string; to?: string } }