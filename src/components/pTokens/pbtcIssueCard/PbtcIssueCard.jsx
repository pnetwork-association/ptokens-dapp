import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../utils/Spinner'
import QRCode from 'qrcode.react'
import settings from '../../../settings'
import Input from '../../utils/Input'
import Button from '../../utils/Button'
import ReactTooltip from 'react-tooltip'
import { copyToClipboard } from '../../../utils/utils'
import Alert from '../../utils/Alert'
import CardHeader from '../CardHeader/CardHeader'

const PbtcIssueCard = props => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(0)

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <CardHeader type="issue" pTokenSelected={props.pTokenSelected} />
      <div className="card-body pt-0">
        <Input
          withSelection={
            props.pTokenSelected.redeemFrom === 'EOS' || props.pTokenSelected.redeemFrom === 'TELOS' ? true : false
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
            <ReactTooltip />
            <div
              className="col-12 font-weight-bold text-center mt-2 cursor-pointer"
              key={isCopiedToClipboard ? 'is-copied-to-clipboard' : 'is-not-copied-to-clipboard'}
              data-tip={isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard'}
              onClick={() => {
                setIsCopiedToClipboard(true)
                copyToClipboard(props.pTokenSelected.depositAddress.value)

                setTimeout(() => {
                  setIsCopiedToClipboard(false)
                }, 3000)
              }}
            >
              <span className="gray-on-hover-with-border-radius">{props.pTokenSelected.depositAddress.value}</span>
            </div>

            <div className="col-12 text-center mt-10">
              <Alert
                type={'info'}
                size={'exsmall'}
                text={`Any BTC deposit sent to this address will mint an equal number of pBTC tokens on the ${props.pTokenSelected.redeemFrom} address above`}
              />
            </div>

            {props.pTokenSelected.network !== 'mainnet' ? (
              <div className="col-12 text-primary text-center mt-2 text-xs">
                Need testnet BTC?
                <a
                  className="text-primary text-underline ml-5"
                  href={settings[props.pTokenSelected.id].btc.faucet1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Faucet 1
                </a>
                <a
                  className="text-primary text-underline ml-5"
                  href={settings[props.pTokenSelected.id].btc.faucet2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Faucet 2
                </a>
              </div>
            ) : (
              ''
            )}
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
                <img src="../assets/tick.svg" height="100" width="100" alt="success" />
              ) : (
                <img src="../assets/error.svg" height="100" width="100" alt="error" />
              )}
            </div>
          </div>
        ) : null}
        {props.pTokenSelected.depositAddress.terminated && props.pTokenSelected.depositAddress.error ? (
          <div className="row mt-4 mb-4">
            <div className="col-12 text-center text-sm text-red font-weight-bold">
              {props.pTokenSelected.depositAddress.error}
            </div>
          </div>
        ) : null}
      </div>
      <div className={'card-footer border-0 pb-20 pt-10 d-flex justify-content-center'}>
        <Button
          width={280}
          icon={'add'}
          disabled={props.typedIssueAccount === ''}
          text={props.pTokenSelected.depositAddress ? 'Generate New Deposit Address' : 'Generate Deposit Address'}
          onClick={() => props.onIssue()}
        />
      </div>
    </div>
  )
}

PbtcIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  typedIssueAccount: PropTypes.string,
  suggestedRedimeerAccounts: PropTypes.array,
  localError: PropTypes.bool,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func
}

export default PbtcIssueCard
