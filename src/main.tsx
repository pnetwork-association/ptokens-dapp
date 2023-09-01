import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import App from './App.tsx'
import wagmiConfig from './wallet/evm-chains/wagmiConfig.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
)
