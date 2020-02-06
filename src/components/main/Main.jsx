import React from 'react'
import Table from '../utils/Table'
import PropTypes from 'prop-types'
import { timestampInSecondsToDate } from '../../utils/utils'
import { getCorrespondingBaseTxExplorerLink } from '../../utils/ptokens-sm-utils'
import MiniCard from '../utils/MiniCard'
import {
  getCorrespondingHeaderMap,
  getCorrespondingHeaders
} from './mappers'

const Main = props => {
  console.log(props)
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
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title="NUMBER OF VALIDATORS"
                  value={1}
                  textColor={'yellow'}
                  measure="(on Strongbox)"
                  icon={'blockchain'}
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
              headerMap={getCorrespondingHeaderMap(
                props.pTokenSelected.name,
                'issuer'
              )}
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    'issuer'
                  )
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    'redeemer'
                  )
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  (
                    parseFloat(n) / Math.pow(10, props.pTokenSelected.decimals)
                  ).toFixed(props.pTokenSelected.decimals),
                1: t => timestampInSecondsToDate(t)
              }}
              headers={getCorrespondingHeaders(
                props.pTokenSelected.name,
                'issuer'
              )}
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
              headerMap={getCorrespondingHeaderMap(
                props.pTokenSelected.name,
                'redeemer'
              )}
              whichLink={{
                2: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    'redeemer'
                  )
                },
                3: {
                  base: getCorrespondingBaseTxExplorerLink(
                    props.pTokenSelected.name,
                    'issuer'
                  )
                }
              }}
              whichAnimation={[4]}
              conversions={{
                0: n =>
                  (
                    parseFloat(n) / Math.pow(10, props.pTokenSelected.decimals)
                  ).toFixed(props.pTokenSelected.decimals),
                1: t => timestampInSecondsToDate(t)
              }}
              headers={getCorrespondingHeaders(
                props.pTokenSelected.name,
                'redeemer'
              )}
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
