import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import Process from './process/Process'
import PbtcIssueCard from './pbtcIssueCard/PbtcIssueCard'
import PeosIssueCard from './peosIssueCard/PeosIssue'
import MiniCard from '../utils/MiniCard'

const Token = props => {

  let inputRedeemAmount = null
  let inputRedeemAddress = null

  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              {
                props.redeemerProvider
                  ? <div className={(props.pTokenSelected.name === 'pBTC' ? 'col-xl-6' : 'col-xl-4') + ' col-12 mt-20'}>
                      <MiniCard title="YOUR BALANCE"
                        value={props.balance ? parseFloat(props.balance).toFixed(props.pTokenSelected.decimals) : null}
                        measure={props.pTokenSelected.name }
                      />
                    </div>
                  : null
              }
              {
                props.redeemerProvider
                  ? <div className={(props.pTokenSelected.name === 'pBTC' ? 'col-xl-6' : 'col-xl-4') +' col-12 mt-20'}>
                      <div className="card bg-gray">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mr-0">
                              <div className="text-xxs text-gray line-height-1 font-weight-light">
                                YOUR {props.pTokenSelected.redeemFrom} ADDRESS
                              </div>
                              <div className="text-gray text-xxl line-height-1 font-weight-light mt-10 text-on-1-row">
                              {
                                props.redeemerAccount
                                  ? getCorresponsingVisibleAddressFormat(props.pTokenSelected.name, 'redeemer', props.redeemerAccount)
                                  : '-'
                              }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  : null
              }
              {
                props.pTokenSelected.name !== 'pBTC' &&
                props.issuerAccount
                  ?<div className="col-12 col-xl-4 mt-20">
                    <MiniCard title={`YOUR ${props.pTokenSelected.issueFrom} ACCOUNT`}
                      value={getCorresponsingVisibleAddressFormat(props.pTokenSelected.name, 'issuer', props.issuerAccount)}
                      measure={''}
                    />
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 height-max">
        <div className="row">
          <div className="col-xl-6 ">
          {
            props.pTokenSelected.name === 'pBTC'
              ? <PbtcIssueCard pTokenSelected={props.pTokenSelected}
                  typedIssueAccount={props.typedIssueAccount}
                  onChangeIssueAccount={props.onChangeIssueAccount}
                  onIssue={props.onIssue}/>
              : 
            props.pTokenSelected.name === 'pEOS'
              ? <PeosIssueCard pTokenSelected={props.pTokenSelected}
                  typedIssueAccount={props.typedIssueAccount}
                  amountToIssue={props.amountToIssue}
                  onChangeAmountToIssue={props.onChangeAmountToIssue}
                  onChangeIssueAccount={props.onChangeIssueAccount}
                  onIssue={props.onIssue}/>
              : null
          }
          </div>
          <div className="col-xl-6 mt-xl-0 mt-3">
            <div className="card bg-light-gray no-shadow border-0 height-max">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Burn {props.pTokenSelected.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div onClick={() => inputRedeemAmount.focus()}
                  className="row mt-5 bg-white ml-0 mr-0 mb-5 cursor-text">
                  <div className="col-5 col-md-2 mt-15">
                    <div className="row">
                      <div className="col-12 text-xxs text-gray font-weight-light mt-2">
                        AMOUNT
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-xxs text-primary mt-5 mb-15">
                        {
                          props.amountToRedeem !== '' 
                            ? `${props.amountToRedeem} ${props.pTokenSelected.redeemFrom}`
                            : `0 ${props.pTokenSelected.redeemFrom}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-7 col-md-10 text-right text-xxs font-weight-light my-auto">
                    <input ref={ref => inputRedeemAmount = ref}
                      value={props.amountToRedeem} 
                      onChange={e => props.onChangeAmountToRedeem(e.target.value)}
                      className="form-control text-xxl caret-primary" placeholder="" type="text"/>
                  </div>
                </div>
                <hr/>
                <div onClick={() => inputRedeemAddress.focus()}
                  className="row mt-5 bg-white ml-0 mr-0 mb-5">
                  <div className="col-4 col-md-2 mt-15 mb-15 text-xxs text-gray font-weight-light line-height-1">
                    {props.pTokenSelected.issueFrom} ADDRESS
                  </div>
                  <div className="col-8 col-md-10 text-right text-xxs font-weight-light my-auto">
                    <input ref={ref => inputRedeemAddress = ref}
                      value={props.typedRedeemAccount}
                      onChange={e => props.onChangeRedeemAccount(e.target.value)}
                      className="form-control text-sm" placeholder="" type="text"/>
                  </div>
                </div>
                <hr/>
              </div>
              <div className="card-footer border-0 pb-20 pt-10 d-flex justify-content-end">
                <button onClick={() => props.onRedeem()} 
                        type="button" 
                        className="btn btn-primary font-weight-light btn-width-140"
                        disabled={props.typedRedeemAccount === '' || props.amountToRedeem === ''}>
                  <i className="icon burn"/>
                  <span className="ml-10 vertical-align-middle">BURN</span>
                </button>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-20">
        <div className="row">
          <div className="col-xl-12 mt-20 mb-5">
            <Process 
              logs={props.logs}
              onResetLogs={() => props.onResetLogs()}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Token.propTypes = {
  pTokenSelected: PropTypes.object,
  balance: PropTypes.number,
  issuerAccount: PropTypes.string,
  redeemerAccount: PropTypes.string,
  amountToIssue: PropTypes.string,
  amountToRedeem: PropTypes.string,
  typedIssueAccount: PropTypes.string,
  typedRedeemAccount: PropTypes.string,
  logs: PropTypes.array,
  issuerProvider: PropTypes.object,
  redeemerProvider: PropTypes.object,
  onChangeAmountToIssue: PropTypes.func,
  onChangeAmountToRedeem: PropTypes.func,
  onChangeIssueAccount: PropTypes.func,
  onChangeRedeemAccount: PropTypes.func,
  onIssue: PropTypes.func,
  onRedeem: PropTypes.func,
  onResetLogs: PropTypes.func,
}

export default Token
