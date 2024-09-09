import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import wagmiConfig from './app/wallet/evm-chains/wagmiConfig.tsx'
import SettingsDrawer from './components/organisms/SettingsDrawer.tsx'
import ContextProvider from './app/ContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <WagmiProvider config={wagmiConfig}>
        <SettingsDrawer>
          <App />
        </SettingsDrawer>
      </WagmiProvider>
    </ContextProvider>
  </React.StrictMode>,
)
