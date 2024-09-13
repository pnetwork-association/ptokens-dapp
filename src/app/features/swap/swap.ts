import { pTokensAsset } from "@p.network/ptokens-entities"

import { TProgressContext } from "../../ContextProvider"
import mintPTokens from "./mint-ptoken"
import redeemPTokens from "./redeem-ptokens"

//TODO change string to bigint
export const swap = async (sourceAsset: pTokensAsset, destinationAsset: pTokensAsset, _amount: string, _address: string, _progress?: TProgressContext) => {
  try {
    if (_amount === '0') throw new Error('amount is 0')
    if (sourceAsset.assetInfo.isNative)
      await mintPTokens({
        amount: _amount.toString(),
        recipient: _address,
        userData: '0x',
        ptokenFrom: sourceAsset,
        ptokenTo: destinationAsset,
        progress: _progress
      })
    else
      await redeemPTokens({
        amount: _amount.toString(),
        recipient: _address,
        userData: '0x',
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