import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from './store'
import history from './utils/history'
import * as serviceWorker from './serviceWorker'
import ThemeProvider, { ThemedGlobalStyle } from './theme/ThemeProvider'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-step-progress-bar/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './theme/font.css'
import './theme/bootstrap.css'
import { initialize } from './ga4'

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
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
)

serviceWorker.unregister()
