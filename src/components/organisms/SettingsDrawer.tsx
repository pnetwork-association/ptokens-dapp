import { Blockchain, FactoryAddress, Network, NetworkId } from '@p.network/ptokens-constants'
import { Web3SettingsProvider } from '@p.network/react-web3-settings'
import React from 'react'

import settings from '../../settings'


type  SettingsDrawerProps = {
  children: React.ReactNode
}


const SettingsDrawer = ({ children }: SettingsDrawerProps): JSX.Element => {
  const buttonSaveStyle = {
    color: 'white',
    background: '#075985',
    fontSize: '16px',
    borderRadius: '10px',
    border: '0',
    padding: '5px 10px 5px 10px',
  }

  const buttonResetStyle = {
    color: 'white',
    background: '#1F2937',
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
    color: '#A6ADAE',
    fontSize: '1.5rem',
    fontWeight: '300',
  }

  const bodyStyle = {
    // color: '#A6ADAE',
    height: '80%',
    fontSize: '1.5rem',
    fontWeight: '300',
    overflow: 'hidden',
    overflowY: 'scroll',
  }

  const drawerStyle = {
    background: '#101929',
    borderRadius: '!0px',
    marginRight: '0px',
    marginTop: '0px',
    minHeight: '100%',
    width: '20rem',
    transitionDuration: '300ms',
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
    color: '#A6ADAE',
    width: '100%',
    background: '#1F2937',
    borderRadius: '4px',
    borderColor: '#A6ADAE',
  }

  const sectionLabelStyle = {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '350',
    marginBottom: '0px',
    margintTop: '0px',
  }

  const sectionRowStyle = {
    marginTop: '1rem',
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
      drawerDirection={'right'}
      title={'Settings'}
      buttonSaveText={'Save'}
      buttonResetText={'Reset'}
      labelStyle={labelStyle}
      headerStylee={labelStyle} 
      bodyStyle={bodyStyle}
      settings={{
        factoryAddress: {
          label: 'pTokens Factory Address',
          settings: {
            [Blockchain.Gnosis]: {
              label: 'Gnosis',
              value: FactoryAddress.get(NetworkId.GnosisMainnet) as string, // TODO check type
            },
            [Blockchain.Ethereum]: {
              label: 'Ethereum',
              value: FactoryAddress.get(NetworkId.EthereumMainnet) as string, // TODO check type
            },
            [Blockchain.Bsc]: {
              label: 'Bsc',
              value: FactoryAddress.get(NetworkId.BscMainnet) as string, // TODO check type
            },
            [Blockchain.Polygon]: {
              label: 'Polygon',
              value: FactoryAddress.get(NetworkId.PolygonMainnet) as string, // TODO check type
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
            [Blockchain.Ethereum]: {
              label: 'Ethereum',
              value: settings.rpc[Network.Mainnet][Blockchain.Ethereum].endpoint,
            },
            [Blockchain.Bsc]: {
              label: 'Bsc',
              value: settings.rpc[Network.Mainnet][Blockchain.Bsc].endpoint,
            },
            [Blockchain.Polygon]: {
              label: 'Polygon',
              value: settings.rpc[Network.Mainnet][Blockchain.Polygon].endpoint,
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