import { configureStore } from "@reduxjs/toolkit"
import swapReducer from './features/swap/swapSlice'

export const store = configureStore({
  reducer: {
    swap: swapReducer
  }
})