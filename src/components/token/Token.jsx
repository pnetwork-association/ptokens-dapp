import React from 'react'
import PropTypes from 'prop-types'
import MiniSpinner from '../utils/MiniSpinner'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import QRCode from 'qrcode.react'

const Token = props => {

  let inputIssueAmount = null
  let inputIssueAddress = null
  let inputRedeemAmount = null
  let inputRedeemAddress = null

  return (
    <div className="main-content bg-white">
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className={(props.pTokenSelected.name === 'pBTC' ? 'col-xl-6' : 'col-xl-4') + ' col-12 mt-20'}>
                <div className="card bg-gray">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-xxs text-gray line-height-1 font-weight-light">
                          YOUR BALANCE
                        </div>
                        <div className="text-gray text-xxl line-height-1 font-weight-light mt-10">
                          {
                            props.balance !== null
                              ? props.balance 
                              : '-'
                          }
                          <span className="text-md">
                          {
                            props.balance !== null 
                              ? ' ' + props.pTokenSelected.name 
                              : ''
                          }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={(props.pTokenSelected.name === 'pBTC' ? 'col-xl-6' : 'col-xl-4') +' col-12 mt-20'}>
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
              {
                props.pTokenSelected.name !== 'pBTC'
                  ?<div className="col-12 col-xl-4 mt-20">
                    <div className="card bg-gray">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="text-xxs text-gray line-height-1 font-weight-light">
                              YOUR {props.pTokenSelected.issueFrom} ACCOUNT
                            </div>
                            <div className="text-gray text-xxl line-height-1 font-weight-light mt-10">
                              {
                                props.issuerAccount
                                  ? getCorresponsingVisibleAddressFormat(props.pTokenSelected.name, 'issuer', props.issuerAccount)
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
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 height-max">
        <div className="row">
          <div className="col-xl-6 ">
            <div className="card shadow bg-light-gray no-shadow height-max">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Issue {props.pTokenSelected.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
              {
                props.pTokenSelected.name !== 'pBTC' 
                  ? <div onClick={() => inputIssueAmount.focus()} 
                      className="row mt-5 bg-white ml-0 mr-0 mb-5  cursor-text">
                      <div className="col-5 col-md-2 mt-15">
                        <div className="row">
                          <div className="col-12 text-xxs text-gray font-weight-light mt-2">
                            AMOUNT
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-xxs text-primary mt-5 mb-15">
                            {
                              props.amountToIssue !== '' 
                                ? `${props.amountToIssue} ${props.pTokenSelected.issueFrom}`
                                : `0 ${props.pTokenSelected.issueFrom}`
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-7 col-md-10 text-right text-xxs font-weight-light my-auto">
                        <input ref={ref => inputIssueAmount = ref}
                          value={props.amountToIssue}
                          onChange={e => props.onChangeAmountToIssue(e.target.value)} 
                          className="form-control text-xxl caret-primary" placeholder="" type="text"/>
                      </div>
                    </div>
                  : null
                }
                {
                  props.pTokenSelected.name !== 'pBTC'
                    ? <hr/>
                    : null
                }
                <div onClick={() => inputIssueAddress.focus()}
                  className="row mt-5 bg-white ml-0 mr-0 mb-5 cursor-text">
                  <div className="col-4 col-md-2 mt-15 mb-15 text-xxs text-gray font-weight-light line-height-1">
                  {props.pTokenSelected.redeemFrom} ADDRESS
                  </div>
                  <div className="col-8 col-md-10 text-right text-xxs font-weight-light my-auto">
                    <input ref={ref => inputIssueAddress = ref}
                      value={props.typedIssueAccount} 
                      onChange={e => props.onChangeIssueAccount(e.target.value)}
                      className="form-control text-sm" placeholder="" type="text"/>
                  </div>
                </div>
                <hr/>

                {
                  props.pTokenSelected.name === 'pBTC' && props.pTokenSelected.depositAddress
                    ? <div className="row mt-4">
                        <div className="col-12 text-center">
                          <QRCode value={props.pTokenSelected.depositAddress} />
                        </div>
                        <div className="col-12 font-weight-bold text-center mt-2">
                          {props.pTokenSelected.depositAddress}
                        </div>
                      </div>
                    : null
                }


              </div>
              <div className={'card-footer border-0 pb-20 pt-10 d-flex ' + (props.pTokenSelected.name === 'pBTC' ? 'justify-content-center' : 'justify-content-end')}>
                <button onClick={() => props.onIssue()} 
                  type="button" 
                  className={'btn btn-primary font-weight-light ' + (props.pTokenSelected.name === 'pBTC' ? 'btn-width-280' : 'btn-width-140')}
                  disabled={
                    props.pTokenSelected.name === 'pEOS' ? (props.typedIssueAccount === '' || props.amountToIssue === '') :
                    props.pTokenSelected.name === 'pBTC' ? props.typedIssueAccount === '' : true
                  }>
                  <i className="icon add"/>
                  <span className="ml-10 vertical-align-middle">
                  {
                    props.pTokenSelected.name === 'pBTC'
                      ? props.pTokenSelected.depositAddress
                        ? 'Generate New Deposit Address'
                        : 'Generate Deposit Address' 
                      : 'ISSUE'
                  }
                  </span>
                </button>
              </div>
            </div>
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
            <div className="card bg-light-gray no-shadow border-0">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col-10">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Process
                    </div>
                  </div>
                  <div onClick={() => props.onResetLogs()} className="col-2 text-right cursor-pointer">
                    <i className="icon empty"/>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {
                  props.logs ? 
                    props.logs.map( (log,index) => {
                      return (
                        <div key={index} className="row">
                          <div className={'col ml-10' + (index > 0 ? ' mt-5' : '') + (index === props.logs.length - 1 ? ' mb-15' : '')}>
                            {
                              log.waiting === true 
                                ? <MiniSpinner/> 
                                : <i className={log.success === true ? 'icon verified' : 'icon not-verified'}/>
                            }
                            <span className={(!log.waiting ? 'text-gray ml-10' : 'text-super-light-gray ml-15') + ' text-sm'}>{log.value}</span>
                            {
                              log.link 
                                ? <a className="ml-10 text-xs text-underline text-primary" href={log.link} target="_blank" rel="noopener noreferrer">
                                    View tx link
                                  </a> 
                                : null
                            }
                          </div>
                        </div>
                      )
                    })
                  : null
                }
                <hr/>
              </div>
              <div className="card-footer border-0 p-0 pt-10"/>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  onChangeAmountToIssue: PropTypes.func,
  onChangeAmountToRedeem: PropTypes.func,
  onChangeIssueAccount: PropTypes.func,
  onChangeRedeemAccount: PropTypes.func,
  onIssue: PropTypes.func,
  onRedeem: PropTypes.func,
  onResetLogs: PropTypes.func,
}

export default Token
