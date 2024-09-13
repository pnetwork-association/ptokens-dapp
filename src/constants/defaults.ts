import { Asset, getAssetById } from "./swap-assets"
import { AssetId } from "."
import swapChains from "./swap-chains"
import { Chain } from "@p.network/ptokens-constants"

export const defaults = {
  originAsset: getAssetById(AssetId.USDC_ON_POLYGON_MAINNET) as Asset,
  originChain: swapChains[Chain.PolygonMainnet],
  destinationAsset: getAssetById(AssetId.PUSDC_ON_GNOSIS_MAINNET) as Asset,
  destinationChain: swapChains[Chain.GnosisMainnet],
}