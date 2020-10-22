import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Process from './process/Process'
import PbtcIssueCard from './pbtcIssueCard/PbtcIssueCard'
import Perc20IssueCard from './perc20IssueCard/Perc20IssueCard'
import PltcIssueCard from './pltcIssueCard/PltcIssueCard'
import MiniCard from '../utils/MiniCard'
import Alert from '../utils/Alert'
import Input from '../utils/Input'
import Button from '../utils/Button'
import CardHeader from './CardHeader/CardHeader'

const PTokens = props => {
  const [isRedeeming, setIsRedeeming] = useState(false)

  useEffect(() => {
    if (props.isRedeemTerminated) setIsRedeeming(false)
  })

  return (
    <React.Fragment>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-12 col-lg-6">
                <MiniCard
                  title="YOUR BALANCE"
                  value={
                    props.balance || props.balance === 0
                      ? props.balance.toFixed(
                          props.pTokenSelected.isPerc20
                            ? 9
                            : props.pTokenSelected.realDecimals
                        )
                      : null
                  }
                  measure={props.pTokenSelected.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-20 height-max">
        <div className="row">
          <div className="col-xl-6 ">
            {props.pTokenSelected.name === 'pBTC' ? (
              <PbtcIssueCard
                localError={props.localError}
                suggestedRedimeerAccounts={props.suggestedRedimeerAccounts}
                pTokenSelected={props.pTokenSelected}
                typedIssueAccount={props.typedIssueAccount}
                isIssueTerminated={props.isIssueTerminated}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : props.pTokenSelected.isPerc20 ? (
              <Perc20IssueCard
                pTokenSelected={props.pTokenSelected}
                suggestedRedimeerAccounts={props.suggestedRedimeerAccounts}
                typedIssueAccount={props.typedIssueAccount}
                amountToIssue={props.amountToIssue}
                issuerAccount={props.issuerAccount}
                onChangeAmountToIssue={props.onChangeAmountToIssue}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : props.pTokenSelected.name === 'pLTC' ? (
              <PltcIssueCard
                pTokenSelected={props.pTokenSelected}
                suggestedRedimeerAccounts={props.suggestedRedimeerAccounts}
                typedIssueAccount={props.typedIssueAccount}
                onChangeIssueAccount={props.onChangeIssueAccount}
                onIssue={props.onIssue}
              />
            ) : null}
          </div>
          <div className="col-xl-6 mt-xl-0 mt-3">
            <div className="card bg-light-gray no-shadow border-0 height-max">
              <CardHeader type="redeem" pTokenSelected={props.pTokenSelected} />
              <div className="card-body pt-0">
                <Input
                  withButton={true}
                  textButton="max"
                  type="number"
                  label="AMOUNT"
                  miniLabel={
                    props.amountToRedeem !== ''
                      ? `${props.amountToRedeem} ${props.pTokenSelected.name}`
                      : `0 ${props.pTokenSelected.name}`
                  }
                  value={props.amountToRedeem}
                  size={'xxlarge'}
                  onChange={e => props.onChangeAmountToRedeem(e.target.value)}
                  onClickButton={() => props.onMaxAmountToRedeem()}
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
                    props.amountToRedeem === '' ||
                    isRedeeming
                  }
                  text="REDEEM"
                  onClick={() => {
                    props.onRedeem()
                    setIsRedeeming(true)
                  }}
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
      <div className="container-fluid mt-20 text-center">
        <Alert
          type={'warning'}
          size={'medium'}
          text={
            <React.Fragment>
              Make sure you know what you are doing, DeFi isn't for the faint of
              heart just yet! To know more about the security model of pTokens
              and its progressive decentralisation approach{' '}
              <a
                href="https://medium.com/pnetwork/pnetwork-security-and-progressive-decentralisation-c5552216ca23"
                target="_blank"
                rel="noopener noreferrer"
              >
                you can read this article
              </a>
              .
            </React.Fragment>
          }
        />
      </div>
    </React.Fragment>
  )
}

PTokens.propTypes = {
  pTokenSelected: PropTypes.object,
  balance: PropTypes.number,
  issuerAccount: PropTypes.string,
  redeemerAccount: PropTypes.string,
  amountToIssue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  amountToRedeem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typedIssueAccount: PropTypes.string,
  typedRedeemAccount: PropTypes.string,
  logs: PropTypes.array,
  issuerProvider: PropTypes.object,
  redeemerProvider: PropTypes.object,
  isRedeemTerminated: PropTypes.bool,
  onChangeAmountToIssue: PropTypes.func,
  onChangeAmountToRedeem: PropTypes.func,
  onChangeIssueAccount: PropTypes.func,
  onChangeRedeemAccount: PropTypes.func,
  onIssue: PropTypes.func,
  onRedeem: PropTypes.func,
  onResetLogs: PropTypes.func
}

export default PTokens
