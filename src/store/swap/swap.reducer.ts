import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AssetId } from '../../constants'
import { Asset } from '../../settings/swap-assets'

interface IProgress {
  show: boolean
  percent: number
  message: string | null
  steps: number[]
  terminated: boolean
}

interface ISwapButton {
  disabled: boolean
  text: string
  link: string
}

interface ISwapState {
  assets: Asset[]
  progress: IProgress
  swapButton: ISwapButton
  defaultSelection: { from: Asset | null; to: Asset | null }
}

const initialState: ISwapState = {
  assets: [],
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false,
  },
  swapButton: {
    disabled: false,
    text: '',
    link: '',
  },
  defaultSelection: {
    from: null,
    to: null,
  },
}

const swapSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    assetsLoaded: (_state, _action: PayloadAction<Asset[]>) => {
      _state.assets = _action.payload
    },
    swapBalanceLoaded: (_state, _action: PayloadAction<{ id: AssetId; balance: string }>) => {
      _state.assets = _state.assets.map((_asset) =>
        _asset.id === _action.payload.id ? { ..._asset, balance: _action.payload.balance } : _asset
      )
    },
    progressUpdated: (_state, _action: PayloadAction<IProgress>) => {
      _state.progress = _action.payload
    },
    progressReset: (_state, _action: PayloadAction<IProgress>) => {
      _state.progress = {
        show: false,
        percent: 0,
        message: null,
        steps: [],
        terminated: false,
      }
    },
    updateSwapButton: (_state, _action: PayloadAction<ISwapButton>) => {
      _state.swapButton = _action.payload
    },
  },
})

export const { assetsLoaded, swapBalanceLoaded, progressUpdated, progressReset, updateSwapButton } = swapSlice.actions
export default swapSlice.reducer
