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

const PbtcIssueCard = props => {
  const [isGenerating, setIsGenerating] = useState(0)
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(0)

  useEffect(() => {
    if (
      props.pTokenSelected.depositAddress.value ||
      props.pTokenSelected.depositAddress.error
    )
      setIsGenerating(false)
  }, [
    props.pTokenSelected.depositAddress.value,
    props.pTokenSelected.depositAddress.error
  ])

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <div className="card shadow bg-light-gray no-shadow height-max">
      <div className="card-header mb-0 bg-light-gray pl-0 pt-0 pr-0">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <div className="text-left text-gray text-xxl font-weight-light">
              Issue {props.pTokenSelected.name}{' '}
              <span className="text-md">(Peg-in)</span>
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-right pl-0 mt-10 mt-0-md mb-10 mb-0-md">
            <img
              className="ml-20 mr-10"
              src={`../assets/${props.pTokenSelected.issueFrom}.png`}
              height="22"
              width="22"
              alt="redeem from logo"
            />
            <img
              src="../assets/right.png"
              height="22"
              width="22"
              alt="redeem from logo"
            />
            <img
              className="ml-10"
              src={`../assets/${props.pTokenSelected.name}-${props.pTokenSelected.network}.png`}
              height="22"
              width="22"
              alt="redeem to logo"
            />
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        <Input
          label={`${props.pTokenSelected.redeemFrom} ${
            props.pTokenSelected.redeemFrom === 'EOS' ? 'ACCOUNT' : 'ADDRESS'
          }`}
          value={props.typedIssueAccount ? props.typedIssueAccount : ''}
          size={'small'}
          onChange={e => props.onChangeIssueAccount(e.target.value)}
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
              key={
                isCopiedToClipboard
                  ? 'is-copied-to-clipboard'
                  : 'is-not-copied-to-clipboard'
              }
              data-tip={isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard'}
              onClick={() => {
                setIsCopiedToClipboard(true)
                copyToClipboard(props.pTokenSelected.depositAddress.value)

                setTimeout(() => {
                  setIsCopiedToClipboard(false)
                }, 3000)
              }}
            >
              <span className="gray-on-hover-with-border-radius">
                {props.pTokenSelected.depositAddress.value}
              </span>
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
          icon={isGenerating ? null : 'add'}
          disabled={
            props.typedIssueAccount === '' ||
            props.typedIssueAccount === null ||
            isGenerating
              ? true
              : false
          }
          text={
            isGenerating
              ? 'Generating...'
              : props.pTokenSelected.depositAddress
              ? 'Generate New Deposit Address'
              : 'Generate Deposit Address'
          }
          onClick={() => {
            setIsGenerating(true)
            props.onIssue()
          }}
        />
      </div>
    </div>
  )
}

PbtcIssueCard.propTypes = {
  pTokenSelected: PropTypes.object,
  typedIssueAccount: PropTypes.string,
  onChangeIssueAccount: PropTypes.func,
  onIssue: PropTypes.func
}

export default PbtcIssueCard
