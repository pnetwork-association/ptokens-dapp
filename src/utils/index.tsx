import { Asset } from "../constants/swap-assets"
import swapChains, { Chain } from "../constants/swap-chains"

export const getBlockchain = (asset: Asset) => swapChains.find((chain: Chain) => chain.blockchain === asset.blockchain) as Chain

export const getPrettierAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`