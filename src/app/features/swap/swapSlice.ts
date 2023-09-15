import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Asset } from "../../../constants/swap-assets"
import { defaultAssets } from "../../../constants/defaults"

type assetPayloadType = {
  origin: Asset
  destination: Asset
}

type swapButtonControlType = {
  disabled: boolean
  text: string
}

type stateType = {
  selectedAsset: assetPayloadType
  swapButton: swapButtonControlType
}

const initialState: stateType = {
  selectedAsset: {
    origin: defaultAssets.origin,
    destination: defaultAssets.destination,
  },
  swapButton: {
    disabled: false,
    text: 'SWAP',
  },
}

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setGlobalOriginAsset: (state: stateType, action: PayloadAction<Asset>) => {
      state.selectedAsset.origin = action.payload
    },
    setGlobalDestAsset: (state: stateType, action: PayloadAction<Asset>) => {
      state.selectedAsset.destination = action.payload
    },
    updateSwapButton: (state: stateType, action:PayloadAction<swapButtonControlType>) => {
      state.swapButton.disabled = action.payload.disabled
      state.swapButton.text = action.payload.text
    },
  }
})

export const { setGlobalOriginAsset, setGlobalDestAsset, updateSwapButton} = swapSlice.actions

export default swapSlice.reducer