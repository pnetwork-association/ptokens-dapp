import { Asset, getAssetById } from "./swap-assets"
import { AssetId } from "."

export const defaultAssets = {
  origin: getAssetById(AssetId.USDC_ON_XDAI) as Asset,
  destination: getAssetById(AssetId.PUSDC_ON_ARBITRUM_MAINNET) as Asset,
}