import { Blockchain, FactoryAddress, Network, NetworkId } from 'ptokens-constants'
import { Web3SettingsProvider } from 'react-web3-settings'
import React from 'react'

import settings from '../../settings'


type  SettingsDrawerProps = {
  children: React.ReactNode
}


const SettingsDrawer = ({ children }: SettingsDrawerProps): JSX.Element => {
  const buttonSaveStyle = {
    color: 'white',
    background: 'gray',
    fontSize: '16px',
    borderRadius: '10px',
    border: '0',
    padding: '5px 10px 5px 10px',
  }

  const buttonResetStyle = {
    color: 'white',
    background: 'gray',
    fontSize: '16px',
    borderRadius: '10px',
    border: '0',
    padding: '5px 10px 5px 10px',
    marginLeft: '10px',
  }

  const titleStyle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '500',
  }

  const labelStyle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '500',
  }

  const drawerStyle = {
    background: 'gray',
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
    color: 'blue',
    width: '100%',
    background: 'white',
    borderRadius: '5px',
  }

  const sectionLabelStyle = {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '350',
    marginBottom: '0px',
  }

  const sectionRowStyle = {
    marginTop: '2.5rem',
  }

  const settingRowStyle = {
    color: 'white',
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
      drawerDirection={'left'}
      title={''}
      buttonSaveText={''}
      buttonResetText={''}
      labelStyle={labelStyle}
      headerStylee={labelStyle} 
      bodyStyle={labelStyle}
      settings={{
        factoryAddress: {
          label: 'pTokens Factory Address',
          settings: {
            [Blockchain.Gnosis]: {
              label: 'Gnosis',
              value: FactoryAddress.get(NetworkId.GnosisMainnet) as string, // TODO check type
            },
            [Blockchain.Arbitrum]: {
              label: 'Arbitrum',
              value: FactoryAddress.get(NetworkId.ArbitrumMainnet) as string, // TODO check type
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