import { Asset } from "../constants/swap-assets"
import swapChains, { Chain } from "../constants/swap-chains"

export const getBlockchain = (asset: Asset) => Object.values(swapChains).find((chain: Chain) => chain.blockchain === asset.blockchain) as Chain

export const getPrettierAddress = (address: string, slice: number) => `${address.slice(0, slice)}...${address.slice(-slice)}`

export const retryPromise = async <T>(operation: Promise<T>, maxAttempts: number, delayMs: number) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await operation
      return result; // If successful, return the result
    } catch (error) {
      if (attempt < maxAttempts) {
        // If there are more attempts remaining, wait for a delay before retrying
        console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms.`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        // If all attempts have failed, re-throw the error
        throw error
      }
    }
  }
}