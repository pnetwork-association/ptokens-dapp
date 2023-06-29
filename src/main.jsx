import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Web3SettingsProvider } from 'react-web3-settings'

import App from './App'
import { initialize } from './ga4'
import * as serviceWorker from './serviceWorker'
import store from './store'
import ThemeProvider, { ThemedGlobalStyle } from './theme/ThemeProvider'
import history from './utils/history'
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
      <HashRouter history={history}>
        <Web3SettingsProvider settings={
          {
            arbitrumStateNabager: {
              label: 'Arbitrum Statemanager',
              value: 'address here',
            },
            arbitrumRouter: {
              label: 'Arbitrum Router',
              value: 'address here'
            },
            gnosisStateNabager: {
              label: 'Gnosis Router',
              value: 'address here'
            },
            gnosisRouter: {
              label: 'Gnosis Statemanager',
              value: 'address here'
            }
          }        
        }>
          <App />
        </Web3SettingsProvider>
      </HashRouter>
    </ThemeProvider>
  </Provider>
)

serviceWorker.unregister()
