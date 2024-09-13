import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import wagmiConfig from './app/wallet/evm-chains/wagmiConfig.ts'
import SettingsDrawer from './components/organisms/SettingsDrawer.tsx'
import ContextProvider from './app/ContextProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SettingsDrawer>
            <App />
          </SettingsDrawer>
        </QueryClientProvider>
      </WagmiProvider>
    </ContextProvider>
  </React.StrictMode>,
)
