import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../utils/Spinner'
import QRCode from 'qrcode.react'
import settings from '../../../settings'

const PbtcIssueCard = props => {

  let inputIssueAddress = null

  return (
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
        <div onClick={() => inputIssueAddress.focus()}
          className="row mt-5 bg-white ml-0 mr-0 mb-5 cursor-text">
          <div className="col-4 col-md-2 mt-15 mb-15 text-xxs text-gray font-weight-light line-height-1">
            {props.pTokenSelected.redeemFrom} ADDRESS
                  </div>
          <div className="col-8 col-md-10 text-right text-xxs font-weight-light my-auto">
            <input ref={ref => inputIssueAddress = ref}
              value={props.typedIssueAccount}
              onChange={e => props.onChangeIssueAccount(e.target.value)}
              className="form-control text-sm" placeholder="" type="text" />
          </div>
        </div>
        <hr />
        {
          props.pTokenSelected.depositAddress.value &&
          !props.pTokenSelected.depositAddress.waiting &&
          !props.pTokenSelected.depositAddress.terminated
            ? <div className="row mt-4">
              <div className="col-12 text-center">
                <QRCode value={props.pTokenSelected.depositAddress.value} />
              </div>
              <div className="col-12 font-weight-bold text-center mt-2">
                {props.pTokenSelected.depositAddress.value}
              </div>
              <div className="col-12 text-primary text-center mt-2 text-xs">
                Need testnet BTC? 
                <a className="text-primary" 
                  href={settings.pbtc.btc.faucet1}
                  target="_blank"
                  rel="noopener noreferrer"
                  > (Faucet 1 link)</a>
                <a className="text-primary"
                  href={settings.pbtc.btc.faucet2}
                  target="_blank"
                  rel="noopener noreferrer"
                  > (Faucet 2 link)</a>
              </div>
            </div>
            : null
        }
        {
          
          props.pTokenSelected.depositAddress.value &&
          props.pTokenSelected.depositAddress.waiting &&
          !props.pTokenSelected.depositAddress.terminated
            ? <div className="row mt-4">
                <div className="col-12 text-center">
                  <Spinner size="big"/>
                </div>
              </div>
            : null
        }
        {
          
          props.pTokenSelected.depositAddress.terminated
            ? <div className="row mt-4 mb-4">
                <div className="col-12 text-center">
                  {
                    props.pTokenSelected.depositAddress.success
                      ? <img src="./assets/tick.svg" height="100" width="100" alt="success"/>
                      : <img src="./assets/error.svg" height="100" width="100" alt="error"/>
                  }
                  
                </div>
              </div>
            : null
        }
      </div>
      <div className={'card-footer border-0 pb-20 pt-10 d-flex justify-content-center'}>
        <button onClick={() => props.onIssue()}
          type="button"
          className={'btn btn-primary font-weight-light btn-width-280'}
          disabled={
            props.typedIssueAccount === ''}>
          <i className="icon add" />
          <span className="ml-10 vertical-align-middle">
            {
              props.pTokenSelected.depositAddress
                ? 'Generate New Deposit Address'
                : 'Generate Deposit Address'
            }
          </span>
        </button>
      </div>
    </div>
  )
}

PbtcIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  typedIssueAccount: PropTypes.string,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func,
}

export default PbtcIssueCard