import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../utils/Spinner'
import QRCode from 'qrcode.react'
import settings from '../../../settings'
import Input from '../../utils/Input'
import Button from '../../utils/Button'
import CardHeader from '../CardHeader/CardHeader'

const PltcIssueCard = props => {
  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <CardHeader type="issue" pTokenSelected={props.pTokenSelected} />
      <div className="card-body pt-0">
        <Input
          withSelection={
            props.pTokenSelected.redeemFrom === 'EOS' ? true : false
          }
          showAtCharacter={3}
          options={props.suggestedRedimeerAccounts}
          label={`${props.pTokenSelected.redeemFrom} ACCOUNT`}
          value={props.typedIssueAccount ? props.typedIssueAccount : ''}
          size={'small'}
          onChange={e => props.onChangeIssueAccount(e.target.value)}
          onChangeFromSelection={value => props.onChangeIssueAccount(value)}
        />
        <hr />
        {props.pTokenSelected.depositAddress.value &&
        !props.pTokenSelected.depositAddress.waiting &&
        !props.pTokenSelected.depositAddress.terminated ? (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <QRCode value={props.pTokenSelected.depositAddress.value} />
            </div>
            <div className="col-12 font-weight-bold text-center mt-2">
              {props.pTokenSelected.depositAddress.value}
            </div>
            {props.pTokenSelected.network !== 'mainnet' ? (
              <div className="col-12 text-primary text-center mt-2 text-xs">
                Need testnet LTC?
                <a
                  className="text-primary text-underline ml-5"
                  href={settings[props.pTokenSelected.id].ltc.faucet1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Faucet 1
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
        {props.pTokenSelected.depositAddress.value &&
        props.pTokenSelected.depositAddress.waiting &&
        !props.pTokenSelected.depositAddress.terminated ? (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Spinner size="big" />
            </div>
          </div>
        ) : null}
        {props.pTokenSelected.depositAddress.terminated ? (
          <div className="row mt-4 mb-4">
            <div className="col-12 text-center">
              {props.pTokenSelected.depositAddress.success ? (
                <img
                  src="../assets/tick.svg"
                  height="100"
                  width="100"
                  alt="success"
                />
              ) : (
                <img
                  src="../assets/error.svg"
                  height="100"
                  width="100"
                  alt="error"
                />
              )}
            </div>
          </div>
        ) : null}
        {props.pTokenSelected.depositAddress.terminated &&
        props.pTokenSelected.depositAddress.error ? (
          <div className="row mt-4 mb-4">
            <div className="col-12 text-center text-sm text-red font-weight-bold">
              {props.pTokenSelected.depositAddress.error}
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={
          'card-footer border-0 pb-20 pt-10 d-flex justify-content-center'
        }
      >
        <Button
          width={280}
          icon={'add'}
          disabled={props.typedIssueAccount === ''}
          text={
            props.pTokenSelected.depositAddress
              ? 'Generate New Deposit Address'
              : 'Generate Deposit Address'
          }
          onClick={() => props.onIssue()}
        />
      </div>
    </div>
  )
}

PltcIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  suggestedRedimeerAccounts: PropTypes.array,
  typedIssueAccount: PropTypes.string,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func
}

export default PltcIssueCard
