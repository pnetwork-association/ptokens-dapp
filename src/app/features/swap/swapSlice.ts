import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Asset } from "../../../constants/swap-assets"
import { defaultAssets } from "../../../constants/defaults"
import { createAsset } from "../../../utils/ptokens"
import { pTokensEvmAsset } from "ptokens-assets-evm"

type AssetPayload = {
  origin: Asset
  destination: Asset
}

type NullableAssetPayload = AssetPayload | null;

type SwapAssets = {
  origin: pTokensEvmAsset
  destination: pTokensEvmAsset
} | null | undefined

type SwapButtonControl = {
  disabled: boolean
  text: string
}

type SwapState = {
  swapAssets: SwapAssets
  selectedAsset: AssetPayload
  progress: IProgress
  swapButton: SwapButtonControl
}

interface IProgress {
  show: boolean
  percent: number
  message: string | null
  steps: number[]
  terminated: boolean
}

const initialState: SwapState = {
  swapAssets: null,
  selectedAsset: {
    origin: defaultAssets.origin,
    destination: defaultAssets.destination,
  },
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false,
  },
  swapButton: {
    disabled: false,
    text: 'Swap',
  },
}

export const createPTokenAssets = createAsyncThunk(
  'swap/createPTokenAssets',
  async (swapAssets: NullableAssetPayload) => {
    try{
      if (!swapAssets)
        return null
      const sourceAsset = await createAsset(swapAssets.origin) as pTokensEvmAsset
      const destinationAsset = await createAsset(swapAssets.destination) as pTokensEvmAsset
      return {origin: sourceAsset, destination: destinationAsset}
    } catch (err) {
      console.log(err)
    }
})

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setGlobalOriginAsset: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset.origin = action.payload
    },
    setGlobalDestAsset: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset.destination = action.payload
    },
    updateSwapButton: (state, action: PayloadAction<SwapButtonControl>) => {
      state.swapButton.disabled = action.payload.disabled
      state.swapButton.text = action.payload.text
    },
    updateProgress: (_state, _action: PayloadAction<IProgress>) => {
      _state.progress = _action.payload
    },
    resetProgress: (_state) => {
      _state.progress = {
        show: false,
        percent: 0,
        message: null,
        steps: [],
        terminated: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPTokenAssets.fulfilled, (state, action) => {
      state.swapAssets = action.payload
    })
  },
})

export const { setGlobalOriginAsset, setGlobalDestAsset, updateSwapButton, updateProgress, resetProgress} = swapSlice.actions

export default swapSlice.reducer