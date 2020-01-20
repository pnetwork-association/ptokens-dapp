import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../utils/Input'

const PeosIssueCard = props => {
  
  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <div className="text-left text-gray text-xxl font-weight-light">
              Issue {props.pTokenSelected.name} <span className="text-md">(Peg-in)</span>
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-right pl-0 pr-0 mt-10 mt-0-md mb-10 mb-0-md">
            <img className="ml-20 mr-10" src={`./assets/${props.pTokenSelected.issueFrom}.png`} height="22" width="22" alt="redeem from logo" />
            <img src="./assets/right.png" height="22" width="22" alt="redeem from logo" />
            <img className="ml-10" src={`./assets/${props.pTokenSelected.name}.png`} height="22" width="22" alt="redeem to logo" />
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        <Input label="AMOUNT"
          miniLabel={
              props.amountToIssue !== '' 
                ? `${props.amountToIssue} ${props.pTokenSelected.name}`
                : `0 ${props.pTokenSelected.name}`
            }
          value={props.amountToIssue}
          size={'xxlarge'}
          onChange={e => props.onChangeAmountToIssue(e.target.value)}
        />
        <hr />
        <Input label={`${props.pTokenSelected.redeemFrom} ADDRESS`}
          value={props.typedIssueAccount}
          size={'small'}
          onChange={e => props.onChangeIssueAccount(e.target.value)}/>
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