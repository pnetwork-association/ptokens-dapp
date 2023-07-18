import { createListenerMiddleware } from '@reduxjs/toolkit'

import { loadBalances } from '../store/swap/swap.actions'
import { walletConnected, accountChanged } from '../store/wallets/wallets.reducer'

const middleware = createListenerMiddleware()

middleware.startListening({
  actionCreator: walletConnected,
  effect: (action, listenerApi) => {
    action.payload.account && listenerApi.dispatch(loadBalances(action.payload.account, action.payload.blockchain))
  },
})

middleware.startListening({
  actionCreator: accountChanged,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(loadBalances(action.payload.account, action.payload.blockchain))
  },
})

export default middleware.middleware
