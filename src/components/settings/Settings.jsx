import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import SingleWallet from './singleWallet/SingleWallet'
import MultiWallet from './multiWallet/MultiWallet'
import MiniCard from '../utils/MiniCard'

const Settings = props => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title={`YOUR ${props.pTokenSelected.redeemFrom} ACCOUNT`}
                  value={getCorresponsingVisibleAddressFormat(
                    props.pTokenSelected,
                    'redeemer',
                    props.redeemerAccount
                  )}
                  measure={''}
                />
              </div>
              {props.pTokenSelected.name === 'pBTC' ||
              props.pTokenSelected.name === 'pLTC' ? (
                <div className="col-12 col-xl-6 mt-20">
                  <MiniCard
                    title="YOUR BALANCE"
                    value={
                      props.balance || props.balance === 0
                        ? props.balance.toFixed(
                            props.pTokenSelected.realDecimals
                          )
                        : null
                    }
                    measure={props.pTokenSelected.name}
                  />
                </div>
              ) : (
                ''
              )}
              {props.pTokenSelected.name !== 'pBTC' ? (
                <div className="col-12 col-xl-4 mt-20">
                  <MiniCard
                    title={`YOUR ${props.pTokenSelected.issueFrom} ACCOUNT`}
                    value={getCorresponsingVisibleAddressFormat(
                      props.pTokenSelected,
                      'issuer',
                      props.issuerAccount
                    )}
                    measure={''}
                  />
                </div>
              ) : null}
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
                    (!props.redeemerIsConnected ? 'bg-gray' : '')
                  }
                >
                  <div className="col-md-4 col-8 mt-15 mb-15 text-xs text-gray">
                    {props.pTokenSelected.redeemFrom} wallet
                  </div>
                  <div className="col-md-4 col-4 text-right text-md-center mt-15 mb-15 text-xs text-primary">
                    {props.redeemerWallet ? props.redeemerWallet.name : '-'}
                  </div>
                  {props.pTokenSelected.redeemFrom === 'ETH' ? (
                    <div className="col-md-4 co-12 text-center text-md-right mt-10-md mt-0 mb-0-md mb-10">
                      <MultiWallet
                        isConnected={props.redeemerIsConnected}
                        onChange={() =>
                          props.onChangeRedeemerConnection(props.redeemerWallet)
                        }
                      />
                    </div>
                  ) : (
                    <div className="col-md-4 col-6 text-right d-flex justify-end justify-content-end mt-15 mb-15 pl-0">
                      <SingleWallet
                        isConnected={props.redeemerIsConnected}
                        onChange={() =>
                          props.onChangeRedeemerConnection(props.redeemerWallet)
                        }
                      />
                    </div>
                  )}
                </div>
                <hr />
                {props.pTokenSelected.name !== 'pBTC' ? (
                  <div
                    className={
                      'row ml-0 mr-0 mt-5 mb-5 ' +
                      (!props.issuerIsConnected ? 'bg-gray' : '')
                    }
                  >
                    <div className="col-md-4 col-6 mt-15 mb-15 text-xs text-gray">
                      {props.pTokenSelected.issueFrom} wallet
                    </div>
                    <div className="col-md-4 d-none d-md-block mt-15 mb-15 text-xs text-center text-primary">
                      {props.issuerWallet ? props.issuerWallet.name : '-'}
                    </div>
                    <div className="col-md-4 col-6 text-right d-flex justify-end justify-content-end mt-15 mb-15 pl-0">
                      <SingleWallet
                        isConnected={props.issuerIsConnected}
                        onChange={() =>
                          props.onChangeIssuerConnection(props.issuerWallet)
                        }
                      />
                    </div>
                  </div>
                ) : null}
                <div className="row ml-0 mr-0 mt-5 mb-5">
                  <div className="col-6 mt-15 mb-15 text-xs text-gray">
                    Connected to:
                  </div>
                  <div className="col-6 text-right mt-15 mb-15 text-xs text-primary font-weight-bold">
                    {props.pTokenSelected.nodeInfo.endpoint
                      ? props.pTokenSelected.nodeInfo.endpoint
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
