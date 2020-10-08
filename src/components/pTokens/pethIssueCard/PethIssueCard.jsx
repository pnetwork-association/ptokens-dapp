import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../utils/Input'
import Button from '../../utils/Button'
import CardHeader from '../CardHeader/CardHeader'

const PethIssueCard = props => {
  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <CardHeader type="issue" pTokenSelected={props.pTokenSelected} />
      <div className="card-body pt-0">
        <Input
          label="AMOUNT"
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
        <Input
          withSelection={
            props.pTokenSelected.redeemFrom === 'EOS' ? true : false
          }
          showAtCharacter={3}
          options={props.suggestedRedimeerAccounts}
          label={`${props.pTokenSelected.redeemFrom} ACCOUNT`}
          value={props.typedIssueAccount}
          size={'small'}
          onChange={e => props.onChangeIssueAccount(e.target.value)}
        />
        <hr />
      </div>
      <div className="card-footer border-0 pb-20 pt-10 d-flex">
        <Button
          width={140}
          icon={'add'}
          disabled={
            props.typedIssueAccount === '' || props.amountToIssue === ''
          }
          text="ISSUE"
          onClick={() => props.onIssue()}
        />
      </div>
    </div>
  )
}

PethIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  amountToIssue: PropTypes.string,
  typedIssueAccount: PropTypes.string,
  onChangeAmountToIssue: PropTypes.func,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func
}

export default PethIssueCard
