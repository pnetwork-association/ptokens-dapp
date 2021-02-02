import React from 'react'
import Table from '../utils/Table'
import PropTypes from 'prop-types'
import { timestampInSecondsToDate } from '../../utils/utils'
import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'
import MiniCard from '../utils/MiniCard'
import BigNumber from 'bignumber.js'

const Main = props => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6">
                <MiniCard
                  title="CIRCULATING SUPPLY"
                  value={props.pTokenSelected.totalSupply}
                  measure={props.pTokenSelected.name}
                  icon={'coins'}
                />
              </div>
              <div className="col-12 col-xl-6 mt-15 mt-0-xl">
                <MiniCard
                  title="NETWORK STATUS"
                  icon={props.isActive ? 'blockchain' : 'timer'}
                  value={props.isActive ? 'Online' : 'Contacting...'}
                  measure={''}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-xl-12">
            <Table
              id="peg-ins"
              title={
                <div className="row">
                  <div className="col-7 pr-0">Peg-ins</div>
                  <div className="col-5 text-right pr-0 pl-0">
                    <img
                      className="ml-20 mr-10"
                      src={`./assets/${props.pTokenSelected.issueFrom}.png`}
                      height="22"
                      width="22"
                      alt="issue from logo"
                    />
                    <img src="./assets/right.png" height="22" width="22" alt="redeem from logo" />
                    <img
                      className="ml-10"
                      src={`./assets/${props.pTokenSelected.name}-${props.pTokenSelected.network}.png`}
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
                  </div>
                </div>
              }
              headerMap={{
                host_tx_amount: `AMOUNT ${props.pTokenSelected.name}`,
                broadcast_timestamp: 'TIMESTAMP',
                originating_tx_hash: `${props.pTokenSelected.issueFrom} TX ID (FROM)`,
                broadcast_tx_hash: `${props.pTokenSelected.redeemFrom} TX HASH (TO)`
                //prooved: 'VERIFIED'
              }}
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected, 'issuer')
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected, 'redeemer')
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  BigNumber(n)
                    .dividedBy(
                      props.pTokenSelected.contractDecimals === 0 ? 1 : 10 ** props.pTokenSelected.contractDecimals
                    )
                    .toFixed(),

                1: t => timestampInSecondsToDate(t)
              }}
              headers={[
                'host_tx_amount',
                'broadcast_timestamp',
                'originating_tx_hash',
                'broadcast_tx_hash'
                //'prooved'
              ]}
              values={props.issueReports}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 mb-20">
        <div className="row">
          <div className="col-xl-12">
            <Table
              id="peg-out"
              title={
                <div className="row">
                  <div className="col-7 pr-0">Peg-outs</div>
                  <div className="col-5 text-right pr-0 pl-0">
                    <img
                      className="ml-20 mr-10"
                      src={`./assets/${props.pTokenSelected.name}-${props.pTokenSelected.network}.png`}
                      height="22"
                      width="22"
                      alt="issue from logo"
                    />
                    <img src="./assets/right.png" height="22" width="22" alt="redeem from logo" />
                    <img
                      className="ml-10"
                      src={`./assets/${props.pTokenSelected.issueFrom}.png`}
                      height="22"
                      width="22"
                      alt="redeem to logo"
                    />
                  </div>
                </div>
              }
              headerMap={
                props.pTokenSelected.issueFrom === 'EOS'
                  ? {
                      host_tx_amount: `AMOUNT ${props.pTokenSelected.name}`,
                      broadcast_timestamp: 'TIMESTAMP',
                      originating_tx_hash: `${props.pTokenSelected.redeemFrom} TX ID (FROM)`,
                      broadcast_tx_hash: `${props.pTokenSelected.issueFrom} TX HASH (TO)`
                      //prooved: 'VERIFIED'
                    }
                  : {
                      native_tx_amount: `AMOUNT ${props.pTokenSelected.name}`,
                      broadcast_timestamp: 'TIMESTAMP',
                      originating_tx_hash: `${props.pTokenSelected.redeemFrom} TX ID (FROM)`,
                      broadcast_tx_hash: `${props.pTokenSelected.issueFrom} TX HASH (TO)`
                      //prooved: 'VERIFIED'
                    }
              }
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected, 'redeemer')
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(props.pTokenSelected, 'issuer')
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  props.pTokenSelected.issueFrom === 'EOS'
                    ? BigNumber(n)
                        .dividedBy(
                          props.pTokenSelected.contractDecimals === 0 ? 1 : 10 ** props.pTokenSelected.contractDecimals
                        )
                        .toFixed()
                    : BigNumber(n)
                        .dividedBy(10 ** props.pTokenSelected.realDecimals)
                        .toFixed(),
                1: t => timestampInSecondsToDate(t)
              }}
              headers={
                props.pTokenSelected.issueFrom === 'EOS'
                  ? [
                      'host_tx_amount',
                      'broadcast_timestamp',
                      'originating_tx_hash',
                      'broadcast_tx_hash'
                      //'prooved'
                    ]
                  : [
                      'native_tx_amount',
                      'broadcast_timestamp',
                      'originating_tx_hash',
                      'broadcast_tx_hash'
                      //'prooved'
                    ]
              }
              values={props.redeemReports}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Main.propTypes = {
  pTokenSelected: PropTypes.object,
  redeemReports: PropTypes.array,
  issueReports: PropTypes.array,
  isActive: PropTypes.bool
}

export default Main
