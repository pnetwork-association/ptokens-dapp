import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../utils/account-viewer'
import Process from './process/Process'
import PbtcIssueCard from './pbtcIssueCard/PbtcIssueCard'
import PeosIssueCard from './peosIssueCard/PeosIssueCard'
import PltcIssueCard from './pltcIssueCard/PltcIssueCard'
import MiniCard from '../utils/MiniCard'
import Alert from '../utils/Alert'
import Input from '../utils/Input'
import Button from '../utils/Button'

const Token = props => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              {props.redeemerProvider ? (
                <div
                  className={
                    (props.pTokenSelected.name === 'pBTC' ||
                    props.pTokenSelected.name === 'pLTC'
                      ? 'col-xl-6'
                      : 'col-xl-4') + ' col-12 mt-20'
                  }
                >
                  <MiniCard
                    title="YOUR BALANCE"
                    value={
                      props.balance
                        ? parseFloat(props.balance).toFixed(
                            props.pTokenSelected.decimals
                          )
                        : null
                    }
                    measure={props.pTokenSelected.name}
                  />
                </div>
              ) : null}
              {props.redeemerProvider ? (
                <div
                  className={
                    (props.pTokenSelected.name === 'pBTC' ||
                    props.pTokenSelected.name === 'pLTC'
                      ? 'col-xl-6'
                      : 'col-xl-4') + ' col-12 mt-20'
                  }
                >
                  <div className="card bg-gray">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 mr-0">
                          <div className="text-xxs text-gray line-height-1 font-weight-light">
                            YOUR {props.pTokenSelected.redeemFrom} ADDRESS
                          </div>
                          <div className="text-gray text-xxl line-height-1 font-weight-light mt-10 text-on-1-row">
                            {props.redeemerAccount
                              ? getCorresponsingVisibleAddressFormat(
                                  props.pTokenSelected.name,
                                  'redeemer',
                                  props.redeemerAccount
                                )
                              : '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.pTokenSelected.name !== 'pBTC' && props.issuerAccount ? (
                <div className="col-12 col-xl-4 mt-20">
                  <MiniCard
                    title={`YOUR ${props.pTokenSelected.issueFrom} ACCOUNT`}
                    value={getCorresponsingVisibleAddressFormat(
                      props.pTokenSelected.name,
                      'issuer',
                      props.issuerAccount
                    )}
                    measure={''}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 height-max">
        <div className="row">
          <div className="col-xl-6 ">
            {props.pTokenSelected.name === 'pBTC' ? (
              <PbtcIssueCard
                pTokenSelected={props.pTokenSelected}
                typedIssueAccount={props.typedIssueAccount}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : props.pTokenSelected.name === 'pEOS' ? (
              <PeosIssueCard
                pTokenSelected={props.pTokenSelected}
                typedIssueAccount={props.typedIssueAccount}
                amountToIssue={props.amountToIssue}
                onChangeAmountToIssue={props.onChangeAmountToIssue}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : props.pTokenSelected.name === 'pLTC' ? (
              <PltcIssueCard
                pTokenSelected={props.pTokenSelected}
                typedIssueAccount={props.typedIssueAccount}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : null}
          </div>
          <div className="col-xl-6 mt-xl-0 mt-3">
            <div className="card bg-light-gray no-shadow border-0 height-max">
              <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
                <div className="row align-items-center">
                  <div className="col-12 col-md-8">
                    <div className="text-left text-gray text-xxl font-weight-light">
                      Redeem {props.pTokenSelected.name}{' '}
                      <span className="text-md">(Peg-out)</span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 text-md-right pl-0 pr-0 mt-10 mt-0-md mb-10 mb-0-md">
                    <img
                      className="ml-20 mr-10"
                      src={`./assets/${props.pTokenSelected.name}.png`}
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
                    <img
                      src="./assets/right.png"
                      height="22"
                      width="22"
                      alt="redeem from logo"
                    />
                    <img
                      className="ml-10"
                      src={`./assets/${props.pTokenSelected.issueFrom}.png`}
                      height="22"
                      width="22"
                      alt="redeem to logo"
                    />
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <Input
                  label="AMOUNT"
                  miniLabel={
                    props.amountToRedeem !== ''
                      ? `${props.amountToRedeem} ${props.pTokenSelected.name}`
                      : `0 ${props.pTokenSelected.name}`
                  }
                  value={props.amountToRedeem}
                  size={'xxlarge'}
                  onChange={e => props.onChangeAmountToRedeem(e.target.value)}
                />
                <hr />
                <Input
                  label={`${props.pTokenSelected.issueFrom} ADDRESS`}
                  value={props.typedRedeemAccount}
                  size={'small'}
                  onChange={e => props.onChangeRedeemAccount(e.target.value)}
                >
                  {props.pTokenSelected.name === 'pBTC' ||
                  props.pTokenSelected.name === 'pLTC' ? (
                    <div className="mt-10">
                      <Alert
                        type={'warning'}
                        size={'exsmall'}
                        text={`Please make sure the ${
                          props.pTokenSelected.name === 'pBTC'
                            ? 'bitcoin'
                            : props.pTokenSelected.name === 'pLTC'
                            ? 'litecoin'
                            : ''
                        } address is one you own, or funds may be permanently lost`}
                      />
                    </div>
                  ) : null}
                </Input>
                <hr />
              </div>
              <div className="card-footer border-0 pb-20 pt-10 d-flex justify-content-end">
                <Button
                  width={140}
                  icon={'burn'}
                  disabled={
                    props.typedRedeemAccount === '' ||
                    props.amountToRedeem === ''
                  }
                  text="REDEEM"
                  onClick={() => props.onRedeem()}
                />
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
              onResetLogs={() => props.onResetLogs()}
            />
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
  onResetLogs: PropTypes.func
}

export default Token
