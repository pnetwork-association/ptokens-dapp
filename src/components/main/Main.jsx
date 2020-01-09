import React from 'react'
import Table from '../utils/Table'
import PropTypes from 'prop-types'
import { timestampInSecondsToDate } from '../../utils/utils'
import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'

const getCorrespondingHeaderMap = (_pTokenName, _role) => {
  switch (_pTokenName) {
    case 'pEOS' : {
      return _role === 'issuer'
        ? {
            peos_amount: 'AMOUNT pEOS',
            broadcast_timestamp: 'TIMESTAMP',
            incoming_transaction_hash: 'EOS TX ID (FROM)',
            broadcast_transaction_hash: 'ETH TX HASH (TO)',
            //prooved: 'VERIFIED'
          }
        : {
            eos_amount: 'AMOUNT pEOS',
            broadcast_timestamp: 'TIMESTAMP',
            incoming_transaction_hash: 'ETH TX HASH (FROM)',
            broadcast_transaction_hash: 'EOS TX ID (TO)',
            //prooved: 'VERIFIED'
          }
    }

    case 'pBTC' : {
      return _role === 'issuer'
        ? {
            btc_tx_amount: 'AMOUNT pBTC',
            broadcast_timestamp: 'TIMESTAMP',
            btc_tx_hash: 'BTC TX HASH (FROM)',
            originating_tx_hash: 'ETH TX HASH (TO)',
            //prooved: 'VERIFIED'
          }
        : {
            eth_tx_amount: 'AMOUNT BTC',
            broadcast_timestamp: 'TIMESTAMP',
            originating_tx_hash: 'BTC TX HASH (TO)',
            broadcast_tx_hash: 'ETH TX HASH (FROM)',
            //prooved: 'VERIFIED'
          }
    }

    default: break
  }
}

const getCorrespondingHeaders = (_pTokenName, _role) => {

  if (_pTokenName === 'pEOS' && _role === 'issuer') {
    return [
      'peos_amount',
      'broadcast_timestamp',
      'incoming_transaction_hash',
      'broadcast_transaction_hash',
      //'prooved'
    ]
  }

  if (_pTokenName === 'pEOS' && _role === 'redeemer') {
    return [
      'eos_amount',
      'broadcast_timestamp',
      'incoming_transaction_hash',
      'broadcast_transaction_hash',
      //'prooved'
    ]
  }

  if (_pTokenName === 'pBTC' && _role === 'issuer') {
    return [
      'btc_tx_amount',
      'broadcast_timestamp',
      'btc_tx_hash',
      'originating_tx_hash',
      //'prooved'
    ]
  }

  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return [
      'eth_tx_amount',
      'broadcast_timestamp',
      'broadcast_tx_hash',
      'originating_tx_hash',
      //'prooved'
    ]
  }
}

const Main = props => {

  return (
    <div className="main-content bg-white">
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6 mt-20">
                <div className="card bg-gray">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-xxs text-gray line-height-1 font-weight-light">
                          CIRCULATING SUPPLY
                        </div>
                        <div className="text-gray text-xxl line-height-1 font-weight-light mt-10">
                          {
                            props.pTokenSelected.circulatingSupply
                              ? props.pTokenSelected.circulatingSupply
                              : '-'
                          }
                          <span className="text-md">
                          {
                            props.pTokenSelected.circulatingSupply
                              ? ` ${props.pTokenSelected.name}` 
                              : null
                          }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 mt-20">
                <div className="card bg-gray">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-xxs text-gray line-height-1 font-weight-light">
                          UNDERLYING ASSET
                        </div>
                        <div className="text-gray text-xxl line-height-1 font-weight-light mt-10">
                          {
                            props.pTokenSelected.circulatingSupply 
                              ? props.pTokenSelected.circulatingSupply 
                              : '-'
                          }
                          <span className="text-md">
                          {
                            props.pTokenSelected.circulatingSupply 
                              ? ` ${props.pTokenSelected.issueFrom}`  
                              : null
                          }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-xl-12">
            <Table id='issue'
              title="Minting Events"
              headerMap={
                getCorrespondingHeaderMap(props.pTokenSelected.name, 'issuer')
              }
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected.name, 'issuer')
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected.name, 'redeemer')
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n => (parseFloat(n) / Math.pow(10, props.pTokenSelected.decimals)).toFixed(props.pTokenSelected.decimals),
                1: t => timestampInSecondsToDate(t)
              }}
              headers={getCorrespondingHeaders(props.pTokenSelected.name, 'issuer')}
              values={props.issueReports} />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 mb-20">
        <div className="row">
          <div className="col-xl-12">
            <Table id='reedeem'
              title="Burning Events"
              headerMap={
                getCorrespondingHeaderMap(props.pTokenSelected.name, 'redeemer')
              }
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected.name, 'redeemer')
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected.name, 'issuer')
                },
              }}
              whichAnimation={[4]}
              conversions={{
                0: n => {
                  return props.pTokenSelected.name === 'pBTC'
                    ? (parseFloat(n) / Math.pow(10, props.pTokenSelected.decimals)).toFixed(props.pTokenSelected.decimals)
                    : parseFloat(n)
                },
                1: t => timestampInSecondsToDate(t)
              }}
              headers={getCorrespondingHeaders(props.pTokenSelected.name, 'redeemer')}
              values={props.redeemReports} />
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {
  pTokenSelected: PropTypes.object,
  redeemReports: PropTypes.array,
  issueReports: PropTypes.array,
}

export default Main