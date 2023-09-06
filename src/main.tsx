import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'

import App from './App.tsx'
import wagmiConfig from './wallet/evm-chains/wagmiConfig.tsx'
import { store } from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
)
