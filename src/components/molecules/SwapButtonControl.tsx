
import { useContext, useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import { getWalletClient } from "wagmi/actions"
import { isAddress, WalletClient } from 'viem'
import { pTokensEvmAsset } from "ptokens-assets-evm"
import cn from "classnames"

import { swap } from "../../app/features/swap/swap"
import { PTokenAssetsContext, ProgressContext, SwapContext, WalletContext } from "../../app/ContextProvider"
import { getChainByBlockchain } from "../../constants/swap-chains"
import { BlockchainType, NetworkId, networkIdToTypeMap } from "ptokens-constants"


const CONNECT_WALLET = 'Connect Wallet'
const SWITCH_CHAIN = 'Switch chain'
const INVALID_ADDRESS = 'Invalid Address'
const SET_AMOUNT = 'Set Amount'
const INIT_SWAP = 'Swap'
const LOADING = 'Loading'
const ERROR = 'Error'

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
    if (pTokenAssets?.asset?.origAsset && pTokenAssets?.asset?.destAsset && assetWalletClient) {
      // @ts-ignore
      (pTokenAssets?.asset?.origAsset as pTokensEvmAsset).setWalletClient(assetWalletClient)
    }
  }, [assetWalletClient, pTokenAssets])

  useEffect(() => {
    if (swapData && walletData && pTokenAssets?.asset?.origAsset && pTokenAssets?.asset?.destAsset) {
      if (!walletData.isWalletConnected) {
        swapData.setSwapButtonDisabled(false)
        swapData.setSwapButtonText(CONNECT_WALLET)
      }
      else if (walletData.walletSelChain && pTokenAssets.asset.origAsset && walletData.walletSelChain.blockchain != pTokenAssets.asset.origAsset.blockchain) {
        swapData.setSwapButtonDisabled(false)
        swapData?.setSwapButtonText(SWITCH_CHAIN)
      }
      else if (!isValidAddress(pTokenAssets.asset.destAsset.networkId, swapData.destinationAddress)) {
        swapData.setSwapButtonDisabled(true)
        swapData.setSwapButtonText(INVALID_ADDRESS)
      }
      else if (swapData.swapAmount === '0') {
        swapData.setSwapButtonDisabled(true)
        swapData.setSwapButtonText(SET_AMOUNT)
      }
      else {
        swapData.setSwapButtonDisabled(false)
        swapData.setSwapButtonText(INIT_SWAP)
      }
    } else if (!isConnected) {
      swapData?.setSwapButtonDisabled(true)
      swapData?.setSwapButtonText(LOADING)
    } else {
      swapData?.setSwapButtonDisabled(true)
      swapData?.setSwapButtonText(ERROR)
    }
      
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

  const swapButtonStyle = cn({
    "btn btn-lg btn-primary text-xl font-bold lg:w-11/12 max-lg:w-[95%] lg:m-4 max-lg:mx-4 max-lg:mt-1 max-lg:mb-2 hover:scale-[101%]": true,
    "btn-disabled": swapData?.swapButtonDisabled,
  })

  return(    
    <button
      className={swapButtonStyle}
      onClick={swapButtonAction}
    >
      {swapData?.swapButtonText}
    </button>
  )
}

export default SwapButtonControl