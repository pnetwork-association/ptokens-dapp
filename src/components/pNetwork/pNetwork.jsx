import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import MiniCard from '../utils/MiniCard'
import { getCorrespondingExplorerLink } from '../../utils/ptokens-sm-utils'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import ReactTooltip from 'react-tooltip'

const PNetwork = props => {
  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <React.Fragment>
      <ReactTooltip />
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-6">
                <MiniCard
                  title="NETWORK STATUS"
                  icon={props.isActive ? 'done' : 'timer'}
                  value={props.isActive ? 'Online' : 'Contacting...'}
                  measure={''}
                />
              </div>
              <div className="col-12 col-xl-6">
                <MiniCard
                  title="NUMBER OF VALIDATORS"
                  value={props.validators ? props.validators.length : '-'}
                  textColor={'gray'}
                  icon={'blockchain'}
                />
              </div>
              <div className="col-12 col-xl-6 mt-20">
                <MiniCard
                  title={`LAST PROCESSED ${props.pTokenSelected.issueFrom} BLOCK NUMBER`}
                  value={props.lastIssuerProcessedBlock}
                  measure={''}
                  withSpinner={true}
                  textColor={
                    props.issuerBlockHeightStatus === 1
                      ? 'gray'
                      : props.issuerBlockHeightStatus === 2
                      ? 'orange'
                      : props.issuerBlockHeightStatus === 3
                      ? 'red'
                      : ''
                  }
                />
              </div>
              <div className="col-12 col-xl-6 mt-20">
                {props.pTokenSelected.redeemFrom !== 'EOS' ? (
                  <MiniCard
                    title={`LAST PROCESSED ${props.pTokenSelected.redeemFrom} BLOCK NUMBER`}
                    value={props.lastRedeemerProcessedBlock}
                    measure={''}
                    withSpinner={true}
                    textColor={
                      props.redeemerBlockHeightStatus === 1
                        ? 'gray'
                        : props.redeemerBlockHeightStatus === 2
                        ? 'orange'
                        : props.redeemerBlockHeightStatus === 3
                        ? 'red'
                        : ''
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-40 mb-20">
        <div className="row">
          <div className="col-12">
            <div className="card bg-light-gray border-0 no-shadow">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">pTokens Setup</div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row mt-15 mb-15">
                  <div className="col-4 col-sm-2 text-gray text-xs font-weight-light">
                    {`${props.pTokenSelected.issueFrom} PUBKEY:`}
                  </div>
                  <div className="col-8 col-sm-10 text-right text-gray text-md">
                    {props.pTokenSelected.name === 'pBTC' || props.pTokenSelected.name === 'pLTC' ? (
                      <React.Fragment>
                        {/*MOBILE*/}
                        <div className="show-mobile" data-tip={`0x${props.pTokenSelected.nodeInfo.publicKey}`}>
                          {getCorresponsingVisibleAddressFormat(
                            props.pTokenSelected,
                            'issuer',
                            `0x${props.pTokenSelected.nodeInfo.publicKey}`
                          )}
                        </div>
                        {/*DESKTOP & TABLET*/}
                        <div className="hidden-mobile" data-tip={`0x${props.pTokenSelected.nodeInfo.publicKey}`}>
                          {props.pTokenSelected.nodeInfo.publicKey
                            ? `0x${props.pTokenSelected.nodeInfo.publicKey}`
                            : '-'}
                        </div>
                      </React.Fragment>
                    ) : (
                      <a
                        className="text-xs text-underline text-primary font-monospace"
                        href={getCorrespondingExplorerLink(props.pTokenSelected, 'issuer')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getCorresponsingVisibleAddressFormat(props.pTokenSelected, 'issuer')}
                      </a>
                    )}
                  </div>
                </div>
                <div className="row mt-15 mb-15">
                  <div className="col-4 col-sm-3 text-gray text-xs font-weight-light">CONNECTED T0:</div>
                  <div className="col-8 col-xl-9 text-right text-gray text-md font-weight-bold">
                    {props.pTokenSelected.nodeInfo ? props.pTokenSelected.nodeInfo.endpoint : '-'}
                  </div>
                </div>
                <hr />
                <div className="row mt-15 mb-15">
                  <div className="col-5 col-xl-3  text-gray text-xs font-weight-light">
                    CIRCULATING {props.pTokenSelected.name}:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                    {props.pTokenSelected.totalSupply ? props.pTokenSelected.totalSupply : '-'}
                  </div>
                </div>
                <hr />
              </div>
              <div className="card-footer border-0 pt-0" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

PNetwork.propTypes = {
  pTokenSelected: PropTypes.object,
  isActive: PropTypes.bool,
  lastIssuerProcessedBlock: PropTypes.number,
  lastRedeemerProcessedBlock: PropTypes.number,
  blockType: PropTypes.string,
  blockData: PropTypes.string,
  canSubmit: PropTypes.bool,
  issuerBlockHeightStatus: PropTypes.number,
  redeemerBlockHeightStatus: PropTypes.number,
  onChangeBlockType: PropTypes.func,
  onChangeBlockData: PropTypes.func,
  onSubmit: PropTypes.func
}

export default PNetwork
