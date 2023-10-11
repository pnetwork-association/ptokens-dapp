import { pTokensAsset } from "ptokens-entities"

import { getSwapBuilder } from "../../../utils/ptokens"
// import { isNative } from "../../../constants/swap-assets"
import peginWithWallet from "./pegin-with-wallet"
import { TProgressContext } from "../../ContextProvider"

//TODO change string to bigint
export const swap = async (sourceAsset: pTokensAsset, destinationAsset: pTokensAsset, _amount: string, _address: string, _progress?: TProgressContext) => {
  try {
    const swapBuilder = getSwapBuilder()
    if (_amount === '0') throw new Error('amount is 0')
    swapBuilder.setAmount(_amount.toString())
    swapBuilder.setNetworkFees(100)
    swapBuilder.setForwardNetworkFees(100)
    swapBuilder.setSourceAsset(sourceAsset)
    swapBuilder.addDestinationAsset(destinationAsset, _address, '0x', destinationAsset.isNative)
    const swap = swapBuilder.build()
    await peginWithWallet({
      swap,
      ptokenFrom: sourceAsset,
      ptokenTo: destinationAsset,
      progress: _progress
    })
  } catch (_err) {
    console.error(_err)
    // const { showModal } = parseError(_err)
    // if (showModal) {
    //   _dispatch(
    //     updateInfoModal({
    //       show: true,
    //       text: 'Error during pegin, try again!',
    //       showMoreText: _err instanceof Error ? _err.message : '',
    //       showMoreLabel: 'Show Details',
    //       icon: 'cancel',
    //     })
    //   )
  }
    // _dispatch(updateSwapButton('Swap'))
    // _dispatch(actions.progressReset())
}