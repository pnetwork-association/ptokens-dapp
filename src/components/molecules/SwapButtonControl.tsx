
import { useContext, useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import { getWalletClient } from "wagmi/actions"
import { isAddress, WalletClient } from 'viem'
import { pTokensEvmAsset } from "ptokens-assets-evm"

import { swap } from "../../app/features/swap/swap"
import { PTokenAssetsContext, ProgressContext, SwapContext, WalletContext } from "../../app/ContextProvider"
import { getChainByBlockchain } from "../../constants/swap-chains"
import { BlockchainType, NetworkId, networkIdToTypeMap } from "ptokens-constants"


const CONNECT_WALLET = 'Connect Wallet'
const SWITCH_CHAIN = 'Switch chain'
const INVALID_ADDRESS = 'Invalid Address'
const ERROR = 'Error'
const INIT_SWAP = 'Swap'

const isValidAddress = (_networkId: NetworkId, _address: string) => {
  if (networkIdToTypeMap.get(_networkId) === BlockchainType.EVM) {
    return isAddress(_address)
  } else return false
}

const SwapButtonControl = (): JSX.Element => {
  const pTokenAssets = useContext(PTokenAssetsContext)
  const swapData = useContext(SwapContext)
  const walletData = useContext(WalletContext)
  const progressData = useContext(ProgressContext)
  const { isConnected } = useAccount()
  const [assetWalletClient, setAssetWalletClient] = useState<WalletClient>()

  useEffect(() => {
    const waitForWalletClient = async () => {
      if (pTokenAssets?.asset?.origAsset) {
        const chainId = getChainByBlockchain(pTokenAssets?.asset?.origAsset.blockchain).chainId
        const wClient = await getWalletClient({chainId: chainId})
        if (!wClient) throw new Error('walletClient not retreived')
        setAssetWalletClient(wClient)
      }
    } 
    if (isConnected) waitForWalletClient()
  }, [isConnected, pTokenAssets])

  useEffect(() => {
    if (pTokenAssets?.asset?.origAsset && pTokenAssets?.asset?.destAsset && assetWalletClient)
      (pTokenAssets?.asset?.origAsset as pTokensEvmAsset).setWalletClient(assetWalletClient as WalletClient)
  }, [assetWalletClient, pTokenAssets])

  useEffect(() => {
    if (swapData && walletData && pTokenAssets?.asset?.origAsset && pTokenAssets?.asset?.destAsset) {
      if (!walletData?.isWalletConnected) {
        swapData?.setSwapButtonText(CONNECT_WALLET)
      }
      else if (walletData.walletSelChain && pTokenAssets?.asset?.origAsset && walletData.walletSelChain.blockchain != pTokenAssets.asset.origAsset.blockchain) {
        swapData?.setSwapButtonText(SWITCH_CHAIN)
      }
      else if (!isValidAddress(pTokenAssets.asset.destAsset.networkId, swapData.destinationAddress)) {
        swapData?.setSwapButtonText(INVALID_ADDRESS)
      }
      else {
        swapData?.setSwapButtonText(INIT_SWAP)
      }
    } else swapData?.setSwapButtonDisabled(true) || swapData?.setSwapButtonText(ERROR)
      
  }, [swapData, walletData, pTokenAssets])

  const swapButtonAction = () => {
    if (swapData && walletData && pTokenAssets?.asset?.origAsset && pTokenAssets?.asset?.destAsset) {
      switch (swapData.swapButtonText) {
        case CONNECT_WALLET:
          walletData.toggleWalletDrawer()
          break
        case SWITCH_CHAIN:
          walletData.setWalletSelChain(getChainByBlockchain(pTokenAssets.asset.origAsset.blockchain))
          break
        case INIT_SWAP:
          swap(pTokenAssets.asset.origAsset, pTokenAssets.asset.destAsset, swapData.swapAmount, swapData.destinationAddress, progressData)
          break
        default:
          break;
      }
    } else throw new Error('No swap data or wallet data found')
  }

  return(    
    <button
      className="btn btn-lg w-11/12 m-4 bg-sky-900 border-sky-900 hover:bg-sky-800 hover:border-sky-800 hover:scale-[101%]"
      onClick={swapButtonAction}
    >
      {swapData?.swapButtonText}
    </button>
  )
}

export default SwapButtonControl