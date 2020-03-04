import React from 'react'
import Table from '../utils/Table'
import PropTypes from 'prop-types'
import { timestampInSecondsToDate } from '../../utils/utils'
import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'
import MiniCard from '../utils/MiniCard'

const Main = props => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title="CIRCULATING SUPPLY"
                  value={props.pTokenSelected.circulatingSupply}
                  measure={props.pTokenSelected.name}
                  icon={'coins'}
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
                      alt="redeem from logo"
                    />
                    <img
                      src="./assets/right.png"
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
                    <img
                      className="ml-10"
                      src={`./assets/${props.pTokenSelected.name}.png`}
                      height="22"
                      width="22"
                      alt="redeem to logo"
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
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    props.pTokenSelected.network,
                    'issuer'
                  )
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    props.pTokenSelected.network,
                    'redeemer'
                  )
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  (
                    parseFloat(n) /
                    Math.pow(10, props.pTokenSelected.contractDecimals)
                  ).toFixed(props.pTokenSelected.realDecimals),
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
                      src={`./assets/${props.pTokenSelected.name}.png`}
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
                    <img
                      src="./assets/right.png"
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
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
              headerMap={{
                native_tx_amount: `AMOUNT ${props.pTokenSelected.name}`,
                broadcast_timestamp: 'TIMESTAMP',
                originating_tx_hash: `${props.pTokenSelected.redeemFrom} TX ID (FROM)`,
                broadcast_tx_hash: `${props.pTokenSelected.issueFrom} TX HASH (TO)`
                //prooved: 'VERIFIED'
              }}
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    props.pTokenSelected.network,
                    'redeemer'
                  )
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    props.pTokenSelected.network,
                    'issuer'
                  )
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  (
                    parseFloat(n) /
                    Math.pow(10, props.pTokenSelected.realDecimals)
                  ).toFixed(props.pTokenSelected.realDecimals),
                1: t => timestampInSecondsToDate(t)
              }}
              headers={[
                'native_tx_amount',
                'broadcast_timestamp',
                'originating_tx_hash',
                'broadcast_tx_hash'
                //'prooved'
              ]}
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
  issueReports: PropTypes.array
}

export default Main
