import { configureStore } from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import middleware from '../middleware'

import pagesReducer from './pages/pages.reducer'
import swapReducer from './swap/swap.reducer'
import walletsReducer from './wallets/wallets.reducer'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  swap: swapReducer,
  pages: pagesReducer,
  toastr: toastrReducer,
})

const store = configureStore({ reducer: rootReducer, middleware: [middleware, thunk] })

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
