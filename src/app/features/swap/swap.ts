
import { pTokensEvmAsset } from "ptokens-assets-evm"

import { getSwapBuilder } from "../../../utils/ptokens"
import { isNative } from "../../../constants/swap-assets"
import peginWithWallet from "./pegin-with-wallet"


export const swap = async (sourceAsset: pTokensEvmAsset, destinationAsset: pTokensEvmAsset, _amount: string, _address: string) => {
  try {
    // _dispatch(actions.progressReset())
    const swapBuilder = getSwapBuilder()
    swapBuilder.setAmount(_amount)
    swapBuilder.setSourceAsset(sourceAsset)
    swapBuilder.addDestinationAsset(destinationAsset, _address, '0x', destinationAsset.isNative)
    const swap = swapBuilder.build()
    await peginWithWallet({
      swap,
      ptokenFrom: sourceAsset,
      ptokenTo: destinationAsset,
    })
  } catch (_err) {
    // console.error(_err)
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