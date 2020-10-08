import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import SingleWallet from './singleWallet/SingleWallet'
import MultiWallet from './multiWallet/MultiWallet'
import MiniCard from '../utils/MiniCard'

const Settings = props => {
  const {
    pTokenSelected,
    redeemerWallet,
    issuerWallet,
    redeemerIsConnected,
    issuerIsConnected,
    redeemerAccount,
    issuerAccount,
    onChangeRedeemerConnection,
    onChangeIssuerConnection
  } = props
  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title={`YOUR ${pTokenSelected.redeemFrom} ACCOUNT`}
                  value={getCorresponsingVisibleAddressFormat(
                    pTokenSelected,
                    'redeemer',
                    redeemerAccount
                  )}
                  measure={''}
                />
              </div>
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title={`YOUR ${pTokenSelected.issueFrom} ACCOUNT`}
                  value={getCorresponsingVisibleAddressFormat(
                    pTokenSelected,
                    'issuer',
                    issuerAccount
                  )}
                  measure={''}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card no-shadow border-0 bg-light-gray mt-20">
              <div className="card-header mb-0 pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Global Settings
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0 ">
                <div
                  className={
                    'row ml-0 mr-0 mt-5 mb-5 ' +
                    (!redeemerIsConnected ? 'bg-gray' : '')
                  }
                >
                  <div className="col-md-4 col-8 mt-15 mb-15 text-xs text-gray">
                    {pTokenSelected.redeemFrom} wallet
                  </div>
                  <div className="col-md-4 col-4 text-right text-md-center mt-15 mb-15 text-xs text-primary">
                    {redeemerWallet ? redeemerWallet.name : '-'}
                  </div>
                  {pTokenSelected.redeemFrom === 'ETH' ? (
                    <div className="col-md-4 co-12 text-center text-md-right mt-10-md mt-0 mb-0-md mb-10">
                      <MultiWallet
                        isConnected={redeemerIsConnected}
                        onChange={() =>
                          onChangeRedeemerConnection(redeemerWallet)
                        }
                      />
                    </div>
                  ) : (
                    <div className="col-md-4 col-6 text-right d-flex justify-end justify-content-end mt-15 mb-15 pl-0">
                      <SingleWallet
                        isConnected={redeemerIsConnected}
                        onChange={() =>
                          onChangeRedeemerConnection(redeemerWallet)
                        }
                      />
                    </div>
                  )}
                </div>
                <hr />
                {pTokenSelected.name !== 'pBTC' &&
                pTokenSelected.name !== 'pLTC' ? (
                  <div
                    className={
                      'row ml-0 mr-0 mt-5 mb-5 ' +
                      (!issuerIsConnected ? 'bg-gray' : '')
                    }
                  >
                    <div className="col-md-4 col-6 mt-15 mb-15 text-xs text-gray">
                      {pTokenSelected.issueFrom} wallet
                    </div>
                    <div className="col-md-4 d-none d-md-block mt-15 mb-15 text-xs text-center text-primary">
                      {issuerWallet ? issuerWallet.name : '-'}
                    </div>
                    {pTokenSelected.redeemFrom === 'ETH' ||
                    pTokenSelected.redeemFrom === 'EOS' ? (
                      <div className="col-md-4 co-12 text-center text-md-right mt-10-md mt-0 mb-0-md mb-10">
                        <MultiWallet
                          isConnected={issuerIsConnected}
                          onChange={() =>
                            onChangeIssuerConnection(issuerWallet)
                          }
                        />
                      </div>
                    ) : (
                      <div className="col-md-4 col-6 text-right d-flex justify-end justify-content-end mt-15 mb-15 pl-0">
                        <SingleWallet
                          isConnected={issuerIsConnected}
                          onChange={() =>
                            onChangeIssuerConnection(issuerWallet)
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="row ml-0 mr-0 mt-5 mb-5">
                  <div className="col-6 mt-15 mb-15 text-xs text-gray">
                    Connected to:
                  </div>
                  <div className="col-6 text-right mt-15 mb-15 text-xs text-primary font-weight-bold">
                    {pTokenSelected.nodeInfo.endpoint
                      ? pTokenSelected.nodeInfo.endpoint
                      : '-'}
                  </div>
                </div>
                <hr />
              </div>
              <div className="card-footer border-0 p-0 pt-10" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
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
