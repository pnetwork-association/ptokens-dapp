import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store from './store'
import history from './utils/history'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga'
import settings from './settings'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/custom.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-step-progress-bar/styles.css'

import ThemeProvider, { ThemedGlobalStyle } from './theme/ThemeProvider'

ReactGA.initialize(settings.googleAnalyticsTrackId)

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
