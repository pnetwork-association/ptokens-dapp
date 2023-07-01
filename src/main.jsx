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
          buttonSaveStyle={{
            color: 'white',
            background: 'rgb(255, 102, 102)',
            fontSize: '16px',
            borderRadius: '10px',
            border: '0',
            padding: '5px 10px 5px 10px',
          }}
          buttonResetStyle={{
            color: 'white',
            background: 'rgb(213, 217, 220)',
            fontSize: '16px',
            borderRadius: '10px',
            border: '0',
            padding: '5px 10px 5px 10px',
            marginLeft: '10px',
          }}
          titleStyle={{
            color: 'rgb(71, 89, 101)',
            fontSize: '1.5rem',
            fontWeight: '500',
          }}
          headerStyle={{
            paddingBottom: '0px',
          }}
          inputStyle={{
            border: '0',
            background: 'transparent',
            outline: '0px !important',
            WebkitAppearance: 'none',
            boxShadow: 'none !important',
            textAlign: 'left',
            fontSize: '16px',
            color: '#475965',
            width: '100%',
            background: '#eaeaea',
            borderRadius: '5px',
          }}
          labelStyle={{
            marginTop: 'rem',
          }}
          sectionLabelStyle={{
            fontSize: '1.25rem',
            fontWeight: '350',
            marginBottom: '0px',
          }}
          sectionRowStyle={{
            marginTop: '2.5rem',
          }}
          settingRowStyle={{
            marginTop: '1rem',
          }}
          buttonAreaStyle={{
            position: 'absolute',
            bottom: '0px',
            right: '1rem',
            marginBottom: '1rem',
          }}
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
