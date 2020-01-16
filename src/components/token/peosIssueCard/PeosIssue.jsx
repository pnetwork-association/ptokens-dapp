import React from 'react'
import PropTypes from 'prop-types'

const PeosIssueCard = props => {

  let inputIssueAddress = null
  let inputIssueAmount = null

  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <div className="text-left text-gray text-xxl font-weight-light">
              Issue {props.pTokenSelected.name} <span className="text-md">(Peg-in)</span>
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-right pl-0 mt-10 mt-0-md mb-10 mb-0-md">
            <img className="ml-20 mr-10" src={`./assets/${props.pTokenSelected.issueFrom}.png`} height="22" width="22" alt="redeem from logo" />
            <img src="./assets/right.png" height="22" width="22" alt="redeem from logo" />
            <img className="ml-10" src={`./assets/${props.pTokenSelected.name}.png`} height="22" width="22" alt="redeem to logo" />
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        <div onClick={() => inputIssueAmount.focus()}
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
              className="form-control text-xxl caret-primary" placeholder="" type="text" />
          </div>
        </div>
        <hr />
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
      </div>
      <div className="card-footer border-0 pb-20 pt-10 d-flex">
        <button onClick={() => props.onIssue()}
          type="button"
          className={'btn btn-primary font-weight-light btn-width-140'}
          disabled={(props.typedIssueAccount === '' || props.amountToIssue === '')}>
          <i className="icon add" />
          <span className="ml-10 vertical-align-middle">
            ISSUE
          </span>
        </button>
      </div>
    </div>

  )
}

PeosIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  amountToIssue: PropTypes.string,
  typedIssueAccount: PropTypes.string,
  onChangeAmountToIssue: PropTypes.func,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func,
}

export default PeosIssueCard