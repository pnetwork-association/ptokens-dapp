import { configureStore } from "@reduxjs/toolkit"
import swapReducer from './features/swap/swapSlice'
import walletReducer from './features/wallets/walletsSlice'
import globalSlice from "./features/globals/globalSlice"

export const store = configureStore({
  reducer: {
    swap: swapReducer,
    wallet: walletReducer,
    global: globalSlice,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>