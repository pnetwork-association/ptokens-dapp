import React from 'react'
import PropTypes from 'prop-types'
import MultiWallet from './multiWallet/MultiWallet'
import styled from 'styled-components'

const SettingsWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const Settings = _props => {
  const {
    pTokenSelected,
    redeemerAccount,
    redeemerIsConnected,
    redeemerWallet,
    onChangeIssuerConnection,
    onChangeRedeemerConnection,
    issuerAccount,
    issuerIsConnected,
    issuerWallet
  } = _props

  return (
    <SettingsWrapper>
      <div className="container-fluid">
        <div className="row ml-0 mr-0">
          <div className="col-12 text-right mt-15 mb-15">
            {pTokenSelected.redeemFrom === 'EOS' ? (
              <MultiWallet
                pToken={pTokenSelected}
                account={redeemerAccount}
                role={'redeemer'}
                isConnected={redeemerIsConnected}
                onChange={() => onChangeRedeemerConnection(redeemerWallet)}
              />
            ) : null}
            {pTokenSelected.issueFrom === 'ETH' ? (
              <MultiWallet
                pToken={pTokenSelected}
                account={issuerAccount}
                role={'issuer'}
                isConnected={issuerIsConnected}
                onChange={() => onChangeIssuerConnection(issuerWallet)}
              />
            ) : null}
            {pTokenSelected.redeemFrom === 'ETH' ? (
              <MultiWallet
                pToken={pTokenSelected}
                account={redeemerAccount}
                role={'redeemer'}
                isConnected={redeemerIsConnected}
                onChange={() => onChangeRedeemerConnection(redeemerWallet)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </SettingsWrapper>
  )
}

Settings.propTypes = {
  pTokenSelected: PropTypes.object,
  balance: PropTypes.number,
  issuerIsConnected: PropTypes.bool,
  redeemerIsConnected: PropTypes.bool,
  issuerAccount: PropTypes.string,
  redeemerAccount: PropTypes.string,
  issuerWallet: PropTypes.object,
  redeemerWallet: PropTypes.object,
  onChangeIssuerConnection: PropTypes.func,
  onChangeRedeemerConnection: PropTypes.func
}

export default Settings
