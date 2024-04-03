import { Web3SettingsProvider } from '@p.network/react-web3-settings'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import settings from '../../../settings'
import generateSettings from '../../../settings/utils'

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
    display: 'flex',
    flexDirection: 'column',
  }

  const bodyStyle = {
    overflowY: 'auto',
    marginBottom: '4.3rem',
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
    width: '75%',
    marginLeft: '1rem',
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
    display: 'flex',
    justifyContent: 'space-between',
  }

  const buttonAreaStyle = {
    position: 'absolute',
    bottom: '0px',
    right: '1rem',
    marginBottom: '1rem',
  }

  const labelStyle = {
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
  }

  return (
    <Web3SettingsProvider
      title={'RPC Endpoint Settings'}
      drawerStyle={drawerStyle}
      bodyStyle={bodyStyle}
      buttonSaveStyle={buttonSaveStyle}
      buttonResetStyle={buttonResetStyle}
      titleStyle={titleStyle}
      headerStyle={headerStyle}
      inputStyle={inputStyle}
      sectionLabelStyle={sectionLabelStyle}
      sectionRowStyle={sectionRowStyle}
      settingRowStyle={settingRowStyle}
      buttonAreaStyle={buttonAreaStyle}
      labelStyle={labelStyle}
      settings={generateSettings(settings.rpc.mainnet)}
    >
      {children}
    </Web3SettingsProvider>
  )
}

export default SettingsDrawer
