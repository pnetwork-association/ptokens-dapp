import { configureStore } from "@reduxjs/toolkit"
import swapReducer from './features/swap/swapSlice'
import walletReducer from './features/wallets/walletsSlice'
import globalSlice from "./features/globals/globalSlice"

export const store = configureStore({
  reducer: {
    swap: swapReducer,
    wallet: walletReducer,
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>