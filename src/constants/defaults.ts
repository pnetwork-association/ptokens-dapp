import { Asset, getAssetById } from "./swap-assets"
import { AssetId } from "."
import { Chain, getChainByBlockchain } from "./swap-chains"
import { Blockchain } from "ptokens-constants"

export const defaults = {
  originAsset: getAssetById(AssetId.PNTV2_ON_POLYGON_MAINNET) as Asset,
  originChain: getChainByBlockchain(Blockchain.Polygon) as Chain,
  destinationAsset: getAssetById(AssetId.PNT_ON_BSC_MAINNET) as Asset,
  destinationChain: getChainByBlockchain(Blockchain.Bsc) as Chain,

}