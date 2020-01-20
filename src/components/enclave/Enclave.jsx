import React from 'react'
import PropTypes from 'prop-types'
import MiniCard from '../utils/MiniCard'
import { 
  getCorrespondingSmartContractAddress,
  getCorrespondingExplorerLink 
} from '../../utils/ptokens-sm-utils'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import Button from '../utils/Button'

const Enclave = props => {

  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-xl-4 mt-20">
                <MiniCard  title="ENCLAVE STATUS"
                  icon={props.isActive ? 'done' : 'timer'}
                  value={props.isActive ? 'Online' : 'Contacting...'}
                  measure={''}
                />
              </div>
              <div className="col-12 col-xl-4 mt-20">
                <MiniCard title={`LAST PROCESSED ${props.pTokenSelected.redeemFrom} BLOCK NUMBER`}
                  value={props.lastRedeemerProcessedBlock}
                  measure={''}
                  withSpinner={true}
                  textColor={
                    props.redeemerBlockHeightStatus === 1 ? 'gray' :
                    props.redeemerBlockHeightStatus === 2 ? 'orange' :
                    props.redeemerBlockHeightStatus === 3 ? 'red' : ''
                  }
                />
              </div>
              <div className="col-12 col-xl-4 mt-20">
                <MiniCard title={`LAST PROCESSED ${props.pTokenSelected.issueFrom} BLOCK NUMBER`}
                  value={props.lastIssuerProcessedBlock}
                  measure={''}
                  withSpinner={true}
                  textColor={
                    props.issuerBlockHeightStatus === 1 ? 'gray' :
                    props.issuerBlockHeightStatus === 2 ? 'orange' :
                    props.issuerBlockHeightStatus === 3 ? 'red' : ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 mb-20">
        <div className="row">
          <div className="col-xl-6 col-12 ">
            <div className="card bg-light-gray border-0 no-shadow">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Enclave Report
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row mt-5">
                  <div className="col-5 col-xl-3 text-gray text-xs font-weight-light">
                    {props.pTokenSelected.redeemFrom} ACCOUNT:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                    <a className="text-xs text-underline text-primary font-monospace" 
                      href={
                        getCorrespondingExplorerLink(
                          props.pTokenSelected.name,
                          'redeemer'
                        )
                      } 
                      target="_blank" rel="noopener noreferrer">
                      {
                        getCorresponsingVisibleAddressFormat(
                          props.pTokenSelected.name,
                          'redeemer',
                          getCorrespondingSmartContractAddress(
                            props.pTokenSelected.name,
                            'redeemer'
                          )
                        )
                      }
                    </a> 
                  </div>
                </div>
                <div className="row mt-15 mb-15">
                  <div className="col-6 col-xl-3 text-gray text-xs font-weight-light">
                    {
                      props.pTokenSelected.name === 'pBTC'
                        ? `${props.pTokenSelected.issueFrom} ENCLAVE PUBKEY:`
                        : `${props.pTokenSelected.issueFrom} ACCOUNT:`
                    }
                  </div>
                  <div className="col-6 col-xl-9 text-right text-gray text-md">
                    {
                      props.pTokenSelected.name === 'pBTC'
                        ?  getCorresponsingVisibleAddressFormat(
                            props.pTokenSelected.name,
                            'issuer',
                            getCorrespondingSmartContractAddress(
                              props.pTokenSelected.name,
                              'issuer'
                            )
                          )
                        : <a className="text-xs text-underline text-primary font-monospace" 
                            href={
                              getCorrespondingExplorerLink(
                                props.pTokenSelected.name,
                                'issuer'
                              )
                            } 
                            target="_blank" rel="noopener noreferrer">
                            {
                              getCorresponsingVisibleAddressFormat(
                                props.pTokenSelected.name,
                                'issuer',
                                getCorrespondingSmartContractAddress(
                                  props.pTokenSelected.name,
                                  'issuer'
                                )
                              )
                            }
                          </a> 
                    }
                    
                  </div>
                </div>
                <hr />
                <div className="row mt-15">
                  <div className="col-5 col-xl-3 coltext-gray text-xs font-weight-light">
                    ISSUED {props.pTokenSelected.name}:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.totalIssued
                      ? props.pTokenSelected.totalIssued 
                      : '-'
                  }
                  </div>
                </div>
                <div className="row mt-15">
                  <div className="col-5 col-xl-3 text-gray text-xs font-weight-light">
                    REDEEMED {props.pTokenSelected.name}:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.totalRedeemed
                      ? props.pTokenSelected.totalRedeemed 
                      : '-'
                  }
                  </div>
                </div>
                <div className="row mt-15">
                  <div className="col-5 col-xl-3 text-gray text-xs font-weight-light">
                    DEPOSITED {props.pTokenSelected.issueFrom}:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.circulatingSupply
                      ? props.pTokenSelected.circulatingSupply
                      : '-'
                  }
                  </div>
                </div>
                <div className="row mt-15 mb-15">
                  <div className="col-5 col-xl-3  text-gray text-xs font-weight-light">
                    CIRCULATING {props.pTokenSelected.name}:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.circulatingSupply
                      ? props.pTokenSelected.circulatingSupply
                      : '-'
                  }
                  </div>
                </div>
                <hr />
                <div className="row mt-15">
                  <div className="col-5 col-xl-3 text-gray text-xs font-weight-light">
                    MINTING EVENTS:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.mintNonce
                      ? props.pTokenSelected.mintNonce 
                      : '-'
                  }
                  </div>
                </div>
                <div className="row mt-15 mb-15">
                  <div className="col-5 col-xl-3 text-gray text-xs font-weight-light">
                    BURNING EVENTS:
                  </div>
                  <div className="col-7 col-xl-9 text-right text-gray text-md">
                  {
                    props.pTokenSelected.burnNonce
                      ? props.pTokenSelected.burnNonce 
                      : '-'
                  }
                  </div>
                </div>
                <hr />
              </div>
              <div className="card-footer border-0 pt-0" />
            </div>
          </div>
          <div className="col-xl-6 col-12 mt-xl-0 mt-3">
            <div className="card bg-light-gray no-shadow">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Submit Block to the Enclave
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-5">
                  <div className="col-4 col-md-8">
                    <label className="text-gray text-xxs font-weight-light mb-15" htmlFor="blockType">BLOCK TYPE:</label>
                  </div>
                  <div className="col-4 col-md-2 text-center">
                    <input onChange={e => props.onChangeBlockType(e.target.value)} name="block-type" id="blockTypeRedeemer" type="radio" value="redeemerBlock" />
                    <label htmlFor="blockTypeRedeemer" className="text-gray text-xs">
                    {
                      props.pTokenSelected.redeemFrom
                    }
                    </label>
                  </div>
                  <div className="col-4 col-md-2 text-center">
                    <input onChange={e => props.onChangeBlockType(e.target.value)} name="block-type" id="blockTypeIssuer" type="radio" value="issuerBlock" />
                    <label htmlFor="blockTypeIssuer" className="text-gray text-xs">
                    {
                      props.pTokenSelected.issueFrom
                    }
                    </label>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col mt-15">
                    <label className="text-gray text-xxs font-weight-light mb-10" htmlFor="blockType">ENTER BLOCK JSON:</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-10">
                    <textarea rows={15} value={props.blockData} onChange={e => props.onChangeBlockData(e.target.value)} className="text-area" />
                  </div>
                </div>
              </div>
              <div className="card-footer border-0 pb-20 pt-10 d-flex justify-content-end">
                <Button onClick={() => props.onSubmit()}
                  disabled={props.canSubmit ? false : true}
                  text="SUBMIT BLOCK"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Enclave.propTypes = {
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

export default Enclave
