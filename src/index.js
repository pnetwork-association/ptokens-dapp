import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from './store'
import history from './utils/history'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga4'
import settings from './settings'
import ThemeProvider, { ThemedGlobalStyle } from './theme/ThemeProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-step-progress-bar/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './theme/font.css'
import CJSA from 'core-js/stable/array'

// eslint-disable-next-line no-unused-expressions
CJSA

ReactGA.initialize(settings.googleAnalyticsTrackId)

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false

// NOTE: remove loader
const loader = document.getElementsByClassName('loader')
loader[0].parentNode.removeChild(loader[0])

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <HashRouter history={history}>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
