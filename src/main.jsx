import { Blockchain, FactoryAddress, Network, NetworkId } from 'ptokens-constants'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Web3SettingsProvider } from 'react-web3-settings'

import App from './App'
import { initialize } from './ga4'
import * as serviceWorker from './serviceWorker'
import settings from './settings'
import store from './store'
import ThemeProvider, { ThemedGlobalStyle } from './theme/ThemeProvider'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-step-progress-bar/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './theme/font.css'
import './theme/bootstrap.css'

initialize()

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false

// NOTE: remove loader
const loader = document.getElementsByClassName('loader')
loader[0].parentNode.removeChild(loader[0])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <HashRouter>
        <Web3SettingsProvider
          settings={{
            factoryAddress: {
              label: 'pTokens Factory Address',
              settings: {
                [Blockchain.Gnosis]: {
                  label: 'Gnosis',
                  value: FactoryAddress.get(NetworkId.GnosisMainnet),
                },
                [Blockchain.Arbitrum]: {
                  label: 'Arbitrum',
                  value: FactoryAddress.get(NetworkId.ArbitrumMainnet),
                },
              },
            },
            rpcEndpoints: {
              label: 'RPC Node Endpoints',
              settings: {
                [Blockchain.Gnosis]: {
                  label: 'Gnosis',
                  value: settings.rpc[Network.Mainnet][Blockchain.Gnosis].endpoint,
                },
                [Blockchain.Arbitrum]: {
                  label: 'Arbitrum',
                  value: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint,
                },
              },
            },
          }}
        >
          <App />
        </Web3SettingsProvider>
      </HashRouter>
    </ThemeProvider>
  </Provider>
)

serviceWorker.unregister()
