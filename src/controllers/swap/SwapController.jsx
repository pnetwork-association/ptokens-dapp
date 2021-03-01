import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from '../../components/swap/Swap'
import * as LogHandler from '../../actions/log'
import {
  issue,
  redeem,
  getBalance,
  resetDepositAddress,
  resetIssueSuccess,
  resetRedeemSuccess,
  resetRedeemError,
  resetIssueError,
  setParams
} from '../../actions/pTokens'
import { isValidAccount } from '../../utils/account-validator'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import BigNumber from 'bignumber.js'
import EosAccountSuggester from '../../lib/eosAccountSuggester'
import { toastr } from 'react-redux-toastr'
import swapAssets from '../../settings/swap-assets'

const mapStateToProps = state => {
  return {
    pTokensAvailable: state.pTokens.available
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemLogs: item => dispatch(LogHandler.addItem(item)),
    clearLogs: () => dispatch(LogHandler.clear()),
    issue: (_params, _configs) => dispatch(issue(_params, _configs)),
    redeem: (_params, _configs) => dispatch(redeem(_params, _configs)),
    getBalance: _account => dispatch(getBalance(_account)),
    resetDepositAddress: () => dispatch(resetDepositAddress()),
    resetIssueSuccess: () => dispatch(resetIssueSuccess()),
    resetRedeemSuccess: () => dispatch(resetRedeemSuccess()),
    resetIssueError: () => dispatch(resetIssueError()),
    resetRedeemError: () => dispatch(resetRedeemError()),
    setpTokenParams: _params => dispatch(setParams(_params))
  }
}

const SwapController = _props => {
  const {
    pTokenSelected,
    pTokensParams,
    balance,
    issuerIsConnected,
    issuerProvider,
    redeemerIsConnected,
    redeemerProvider,
    setpTokenParams,
    resetDepositAddress,
    clearLogs,
    issue,
    redeem
  } = _props

  const [from, setFrom] = useState(false)

  console.log(swapAssets)

  return (
    <Swap
      {..._props}
      swapAssets={swapAssets}
      /*amountToIssue={pTokensParams.amountToIssue}
      amountToRedeem={pTokensParams.amountToRedeem}
      typedIssueAccount={pTokensParams.typedIssueAccount}
      typedRedeemAccount={pTokensParams.typedRedeemAccount}
      suggestedRedemeerAccounts={suggestedRedemeerAccounts}
      suggestedIssuerAccounts={suggestedIssuerAccounts}
      onChangeAmountToIssue={onChangeAmountToIssue}
      onChangeAmountToRedeem={onChangeAmountToRedeem}
      onChangeIssueAccount={onChangeTypedIssueAccount}
      onChangeRedeemAccount={onChangeTypedRedeemAccount}
      onIssue={onIssue}
      onRedeem={onRedeem}
      onResetLogs={() => clearLogs()}
      onMaxAmountToRedeem={setMaxAmountToRedeem}
      onMaxAmountToIssue={setMaxAmountToIssue}*/
    />
  )
}

SwapController.propTypes = {
  pTokensAvailable: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
