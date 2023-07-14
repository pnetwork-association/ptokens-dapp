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
import ThemeProvider, {
  ThemedGlobalStyle,
  buttonSaveStyle,
  buttonResetStyle,
  titleStyle,
  headerStyle,
  inputStyle,
  sectionLabelStyle,
  sectionRowStyle,
  settingRowStyle,
  buttonAreaStyle,
} from './theme/ThemeProvider'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-step-progress-bar/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './theme/font.css'
import './theme/bootstrap.css'

initialize()

if (window.ethereum && 'autoRefreshOnNetworkChange' in window.ethereum)
  window.ethereum.autoRefreshOnNetworkChange = false

// NOTE: remove loader
const loader = document.getElementsByClassName('loader')
if (loader[0] && loader[0].parentNode) {
  loader[0].parentNode.removeChild(loader[0])
}

const root = document.getElementById('root')
if (root)
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <ThemeProvider>
        <React.Fragment>
          <ThemedGlobalStyle active={true} />
          <HashRouter>
            <Web3SettingsProvider
              buttonSaveStyle={buttonSaveStyle}
              buttonResetStyle={buttonResetStyle}
              titleStyle={titleStyle}
              headerStyle={headerStyle}
              inputStyle={inputStyle}
              sectionLabelStyle={sectionLabelStyle}
              sectionRowStyle={sectionRowStyle}
              settingRowStyle={settingRowStyle}
              buttonAreaStyle={buttonAreaStyle}
              settings={{
                factoryAddress: {
                  label: 'pTokens Factory Address',
                  settings: {
                    [Blockchain.Gnosis]: {
                      label: 'Gnosis',
                      value: FactoryAddress.get(NetworkId.GnosisMainnet) || '',
                    },
                    [Blockchain.Arbitrum]: {
                      label: 'Arbitrum',
                      value: FactoryAddress.get(NetworkId.ArbitrumMainnet) || '',
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
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  )

serviceWorker.unregister()
