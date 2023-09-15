import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'

import App from './App.tsx'
import wagmiConfig from './wallet/evm-chains/wagmiConfig.tsx'
import { store } from './app/store.ts'
import SettingsDrawer from './components/organisms/SettingsDrawer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <SettingsDrawer>
          <App />
        </SettingsDrawer>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
)
