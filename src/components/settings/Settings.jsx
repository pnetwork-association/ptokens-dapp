import React from 'react'
import PropTypes from 'prop-types'
import MultiWallet from './multiWallet/MultiWallet'
import styled from 'styled-components'

const SettingsWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const MultiWalletContainer = styled.div`
  margin-left: 15px;
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
      {/* DESKTOP */}
      <div className="container-fluid hidden-mobile">
        <div className="row ml-0 mr-0">
          <div className="col-12 text-right mt-15 mb-15 d-flex flex-row-reverse">
            {pTokenSelected.redeemFrom === 'EOS' ? (
              <MultiWalletContainer>
                <MultiWallet
                  pToken={pTokenSelected}
                  account={redeemerAccount}
                  role={'redeemer'}
                  isConnected={redeemerIsConnected}
                  onChange={() => onChangeRedeemerConnection(redeemerWallet)}
                />
              </MultiWalletContainer>
            ) : null}
            {pTokenSelected.issueFrom === 'ETH' ? (
              <MultiWalletContainer>
                <MultiWallet
                  pToken={pTokenSelected}
                  account={issuerAccount}
                  role={'issuer'}
                  isConnected={issuerIsConnected}
                  onChange={() => onChangeIssuerConnection(issuerWallet)}
                />
              </MultiWalletContainer>
            ) : null}
            {pTokenSelected.redeemFrom === 'ETH' ? (
              <MultiWalletContainer>
                <MultiWallet
                  pToken={pTokenSelected}
                  account={redeemerAccount}
                  role={'redeemer'}
                  isConnected={redeemerIsConnected}
                  onChange={() => onChangeRedeemerConnection(redeemerWallet)}
                />
              </MultiWalletContainer>
            ) : null}
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="container-fluid show-mobile">
        <div className="row ml-0 mr-0 justify-content-center">
          {pTokenSelected.redeemFrom === 'EOS' ? (
            <div className="col-6 text-right mt-5 mb-15 pl-0 pr-1">
              <MultiWallet
                pToken={pTokenSelected}
                account={redeemerAccount}
                role={'redeemer'}
                isConnected={redeemerIsConnected}
                onChange={() => onChangeRedeemerConnection(redeemerWallet)}
              />
            </div>
          ) : null}
          {pTokenSelected.issueFrom === 'ETH' ? (
            <div className="col-6 text-right mt-5 mb-15 pl-1 pr-0">
              <MultiWallet
                pToken={pTokenSelected}
                account={issuerAccount}
                role={'issuer'}
                isConnected={issuerIsConnected}
                onChange={() => onChangeIssuerConnection(issuerWallet)}
              />
            </div>
          ) : null}
          {pTokenSelected.redeemFrom === 'ETH' ? (
            <div className="col-6 text-right mt-5 mb-15 pl-1 pr-0">
              <MultiWallet
                pToken={pTokenSelected}
                account={redeemerAccount}
                role={'redeemer'}
                isConnected={redeemerIsConnected}
                onChange={() => onChangeRedeemerConnection(redeemerWallet)}
              />
            </div>
          ) : null}
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
