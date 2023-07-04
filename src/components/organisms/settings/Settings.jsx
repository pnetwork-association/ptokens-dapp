import { Blockchain, FactoryAddress, Network, NetworkId } from 'ptokens-constants'
import React, { useContext } from 'react'
import { Web3SettingsProvider } from 'react-web3-settings'
import { ThemeContext } from 'styled-components'

import settings from '../../../settings'

const SettingsDrawer = ({ children }) => {
  const theme = useContext(ThemeContext)

  const buttonSaveStyle = {
    color: 'white',
    background: `${theme.primary1}`,
    fontSize: '16px',
    borderRadius: '10px',
    border: '0',
    padding: '5px 10px 5px 10px',
  }

  const buttonResetStyle = {
    color: 'white',
    background: `${theme.secondary2}`,
    fontSize: '16px',
    borderRadius: '10px',
    border: '0',
    padding: '5px 10px 5px 10px',
    marginLeft: '10px',
  }

  const titleStyle = {
    color: `${theme.text1}`,
    fontSize: '1.5rem',
    fontWeight: '500',
  }

  const drawerStyle = {
    background: `${theme.bg1}`,
  }

  const headerStyle = {
    paddingBottom: '0px',
  }

  const inputStyle = {
    border: '0',
    outline: '0px !important',
    WebkitAppearance: 'none',
    boxShadow: 'none !important',
    textAlign: 'left',
    fontSize: '16px',
    color: `${theme.secondary1}`,
    width: '100%',
    background: `${theme.secondary4}`,
    borderRadius: '5px',
  }

  const sectionLabelStyle = {
    color: `${theme.text1}`,
    fontSize: '1.25rem',
    fontWeight: '350',
    marginBottom: '0px',
  }

  const sectionRowStyle = {
    marginTop: '2.5rem',
  }

  const settingRowStyle = {
    color: `${theme.text2}`,
    marginTop: '1rem',
  }

  const buttonAreaStyle = {
    position: 'absolute',
    bottom: '0px',
    right: '1rem',
    marginBottom: '1rem',
  }

  return (
    <Web3SettingsProvider
      drawerStyle={drawerStyle}
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
      {children}
    </Web3SettingsProvider>
  )
}

export default SettingsDrawer
