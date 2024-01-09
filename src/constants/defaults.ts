import { Asset, getAssetById } from "./swap-assets"
import { AssetId } from "."
import { Chain, getChainByBlockchain } from "./swap-chains"
import { Blockchain } from "ptokens-constants"

export const defaults = {
  originAsset: getAssetById(AssetId.PNT_ON_BSC_MAINNET) as Asset,
  originChain: getChainByBlockchain(Blockchain.Bsc) as Chain,
  destinationAsset: getAssetById(AssetId.PPNT_ON_GNOSIS_MAINNET) as Asset,
  destinationChain: getChainByBlockchain(Blockchain.Gnosis) as Chain,
}