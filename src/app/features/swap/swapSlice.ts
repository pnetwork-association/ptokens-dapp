import { createSlice } from "@reduxjs/toolkit"
import { Asset } from "../../../constants/swap-assets"

type assetPayloadType = {
  origin: Asset | null
  destination: Asset | null
}

type stateType = {
  selectedAsset: assetPayloadType
  defaultSelection: assetPayloadType
  swapButton: {
    disabled: boolean;
    text: string;
    action: (() => void) | null
  }
}

const initialState: stateType = {
  selectedAsset: {
    origin: null,
    destination: null,
  },
  defaultSelection: {
    origin: null,
    destination: null,
  },
  swapButton: {
    disabled: false,
    text: 'SWAP',
    action: null,
  },
}

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setAssets: (state: stateType, payload: any) => {
      state.selectedAsset.origin = payload.origin
      state.selectedAsset.destination = payload.destination
    },
    setDefaultSelection: (state: stateType, payload: any) => {
      state.defaultSelection.origin = payload.origin
      state.defaultSelection.destination = payload.destination
    },
    setSwapButton: (state: stateType, payload: any) => {
      state.swapButton.disabled = payload.disabled
      state.swapButton.text = payload.text
      state.swapButton.action = payload.action
    },
  }
})

export const { setAssets, setDefaultSelection, setSwapButton} = swapSlice.actions

export default swapSlice.reducer