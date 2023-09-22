
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../hook"
import { updateSwapButton } from "./swapSlice"
import { setWalletIsDrawerOpened, setWalletConnectedChain } from "../globals/globalSlice"
import swapChains from "../../../constants/swap-chains"
import { swap } from "./swap"
// import { useWeb3Signer } from "../../../wallet/evm-chains/web3-adapter"

const CONNECT_WALLET = 'Connect Wallet'
const SWITCH_CHAIN = 'Switch chain'
const INIT_SWAP = 'Swap'

const SwapButtonControl = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const originAsset = useAppSelector(state => state.swap.selectedAsset.origin)
  const disabled = useAppSelector(state => state.swap.swapButton.disabled)
  const swapButtonText = useAppSelector(state => state.swap.swapButton.text)
  const walletConnectedChain = useAppSelector(state => state.global.walletStatus.chain)
  const walletIsConnected = useAppSelector(state => state.global.walletStatus.isConnected)
  // const web3 = useWeb3Signer()

  useEffect(() => {
    if (!walletIsConnected) {
      dispatch(updateSwapButton({
        disabled: false,
        text: CONNECT_WALLET,
      }))
    }
    else if (walletConnectedChain?.blockchain != originAsset.blockchain) {
      dispatch(updateSwapButton({
        disabled: false,
        text: SWITCH_CHAIN,
      }))
    }
    else {
      dispatch(updateSwapButton({
        disabled: false,
        text: INIT_SWAP,
      }))
    }
  }, [disabled, swapButtonText, walletConnectedChain, walletIsConnected, originAsset])

  // useEffect(() => {
  //   console.log(web3)
  // }, [web3])

  const swapButtonAction = () => {
    switch (swapButtonText) {
      case CONNECT_WALLET:
        dispatch(setWalletIsDrawerOpened())
        break
      case SWITCH_CHAIN:
        dispatch(setWalletConnectedChain(swapChains.find(chain => chain.blockchain === originAsset.blockchain )))
        break
      case INIT_SWAP:
        // swap(web3)
        break
      default:
        break;
    }
  } 

  return(    
    <button
      className="btn btn-lg w-11/12 m-4 bg-sky-900 border-sky-900 hover:bg-sky-800 hover:border-sky-800 hover:scale-[101%]"
      onClick={swapButtonAction}
    >
      {swapButtonText}
    </button>
  )
}

export default SwapButtonControl