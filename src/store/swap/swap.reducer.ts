import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'

import { AssetId } from '../../constants'
import { Asset, AssetWithAddress } from '../../settings/swap-assets'

export interface IProgress {
  show: boolean
  percent: number
  message: string | null
  steps: number[]
  terminated: boolean
}

export interface ISwapButton {
  disabled: boolean
  text: string
  link: string | null
}

interface ISwapState {
  assets: Partial<Record<AssetId, AssetWithAddress>>
  bpm: IBpm
  progress: IProgress
  swapButton: ISwapButton
  defaultSelection: { from: Asset | null; to: Asset | null }
}

export type IBpm = Partial<Record<Blockchain, number>>

const initialState: ISwapState = {
  assets: {},
  bpm: {},
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
    assetsLoaded: (_state, _action: PayloadAction<Partial<Record<AssetId, AssetWithAddress>>>) => {
      _state.assets = _action.payload
    },
    swapBalanceLoaded: (_state, _action: PayloadAction<{ id: AssetId; balance: string }>) => {
      const id = _action.payload.id
      const asset = _state.assets[id]
      if (asset) asset.balance = BigNumber(_action.payload.balance)
    },
    bpmLoaded: (_state, _action: PayloadAction<IBpm>) => {
      _state.bpm = _action.payload
    },
    progressUpdated: (_state, _action: PayloadAction<IProgress>) => {
      _state.progress = _action.payload
    },
    progressReset: (_state) => {
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

export const { assetsLoaded, swapBalanceLoaded, progressUpdated, progressReset, updateSwapButton, bpmLoaded } =
  swapSlice.actions
export default swapSlice.reducer
