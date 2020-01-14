import React from 'react'
import ReactDOM from 'react-dom'
import App from './controllers/App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store from './store'
import history from './utils/history'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga'
import settings from './settings'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/custom.css'

ReactGA.initialize(settings.googleAnalyticsTrackId)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
