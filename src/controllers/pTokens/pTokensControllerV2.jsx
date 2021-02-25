import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PTokensV2 from '../../components/pTokens/pTokensV2'
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

const mapStateToProps = state => {
  return {
    logs: state.log.logs,
    pTokenSelected: state.pTokens.selected,
    balance: state.pTokens.balance,
    pTokensParams: state.pTokens.params,
    issuerIsConnected: state.wallets.issuerIsConnected,
    issuerProvider: state.wallets.issuerProvider,
    issuerAccount: state.wallets.issuerAccount,
    redeemerIsConnected: state.wallets.redeemerIsConnected,
    redeemerProvider: state.wallets.redeemerProvider
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

const PTokenControllersV2 = _props => {
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

  const [suggestedRedemeerAccounts, setSuggestedRedemeerAccounts] = useState(null)
  const [suggestedIssuerAccounts, setSuggestedIssuerAccounts] = useState(null)

  const onChangeAmountToIssue = useCallback(
    _amount => {
      setpTokenParams(
        Object.assign({}, pTokensParams, {
          amountToIssue: _amount
        })
      )
    },
    [setpTokenParams, pTokensParams]
  )

  const onChangeAmountToRedeem = useCallback(
    _amount => {
      setpTokenParams(
        Object.assign({}, pTokensParams, {
          amountToRedeem: _amount
        })
      )
    },
    [setpTokenParams, pTokensParams]
  )

  const onChangeTypedIssueAccount = useCallback(
    _account => {
      if (
        (pTokenSelected.name === 'pBTC' || pTokenSelected.name === 'pLTC') &&
        !pTokenSelected.depositAddress.waiting
      ) {
        resetDepositAddress()
      }

      if (pTokenSelected.redeemFrom === 'EOS' || pTokenSelected.redeemFrom === 'TELOS') {
        EosAccountSuggester.getPossiblesAccounts(pTokenSelected, _account, suggestedRedemeerAccounts, 'redeemer').then(
          _accounts => {
            setSuggestedRedemeerAccounts(_accounts)
          }
        )
      }

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedIssueAccount: _account
        })
      )
    },
    [suggestedRedemeerAccounts, pTokenSelected, setpTokenParams, pTokensParams, resetDepositAddress]
  )

  const onChangeTypedRedeemAccount = useCallback(
    _typedRedeemAccount => {
      if (pTokenSelected.issueFrom === 'EOS') {
        EosAccountSuggester.getPossiblesAccounts(
          pTokenSelected,
          _typedRedeemAccount,
          suggestedIssuerAccounts,
          'issuer'
        ).then(_accounts => {
          setSuggestedIssuerAccounts(_accounts)
        })
      }

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedRedeemAccount: _typedRedeemAccount
        })
      )
    },
    [suggestedIssuerAccounts, pTokenSelected, setpTokenParams, pTokensParams]
  )

  const setMaxAmountToRedeem = useCallback(() => {
    setpTokenParams(
      Object.assign({}, pTokensParams, {
        amountToRedeem: !balance || balance === 0 ? 0 : balance
      })
    )
  }, [pTokensParams, balance, setpTokenParams])

  const setMaxAmountToIssue = useCallback(() => {
    console.log('TODO')
  }, [])

  const onIssue = useCallback(() => {
    if (
      !isValidAccount(pTokenSelected, pTokensParams.typedIssueAccount, 'redeemer') ||
      pTokensParams.typedIssueAccount.length < 4
    ) {
      toastr.error(`Please insert a valid ${pTokenSelected.redeemFrom} address`)
      return
    }

    if (pTokenSelected.isPerc20 || pTokenSelected.name === 'pETH') {
      if (!issuerIsConnected) {
        toastr.error('Please connect your Ethereum wallet')
        return
      }
    }

    clearLogs()
    resetDepositAddress()

    const parsedAmountToIssue = parseFloat(pTokensParams.amountToIssue).toFixed(pTokenSelected.realDecimals)
    const minimumIssuableAmount = parseFloat(pTokenSelected.minimumIssuable).toFixed(pTokenSelected.realDecimals)
    if (parsedAmountToIssue < minimumIssuableAmount) {
      toastr.error(`Impossible to mint less than ${minimumIssuableAmount} ${pTokenSelected.name}`)
      return
    }

    let amountToIssue = pTokensParams.amountToIssue
    if (pTokenSelected.isPerc20 || pTokenSelected.name === 'pETH') {
      amountToIssue = BigNumber(pTokensParams.amountToIssue)
        .multipliedBy(10 ** pTokenSelected.realDecimals)
        .toFixed()
    }

    issue([amountToIssue, pTokensParams.typedIssueAccount], {
      issuer: issuerProvider,
      redeemer: getCorrespondingReadOnlyProvider(pTokenSelected)
    })
  }, [pTokenSelected, pTokensParams, issue, issuerProvider, issuerIsConnected, resetDepositAddress, clearLogs])

  const onRedeem = useCallback(() => {
    if (!redeemerIsConnected) {
      toastr.error(`${pTokenSelected.redeemFrom} Wallet Not Connected`)
      return
    }

    if (!isValidAccount(pTokenSelected, pTokensParams.typedRedeemAccount, 'issuer')) {
      toastr.error(`Please insert a valid ${pTokenSelected.issueFrom} address`)
      return
    }

    const minimunRedeemableAmount = parseFloat(pTokenSelected.minimumRedeamable)
    if (BigNumber(pTokensParams.amountToRedeem).isLessThan(minimunRedeemableAmount)) {
      toastr.error(`Impossible to redeem less than ${minimunRedeemableAmount} ${pTokenSelected.name}`)
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    clearLogs()

    redeem([pTokensParams.amountToRedeem, pTokensParams.typedRedeemAccount], {
      issuer: getCorrespondingReadOnlyProvider(pTokenSelected),
      redeemer: redeemerProvider
    })
  })

  return (
    <PTokensV2
      {..._props}
      amountToIssue={pTokensParams.amountToIssue}
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
      onMaxAmountToIssue={setMaxAmountToIssue}
    />
  )
}

PTokenControllersV2.propTypes = {
  logs: PropTypes.array,
  pTokenSelected: PropTypes.object,
  balance: PropTypes.string,
  pTokensParams: PropTypes.object,
  issuerIsConnected: PropTypes.bool,
  issuerProvider: PropTypes.object,
  issuerAccount: PropTypes.string,
  redeemerIsConnected: PropTypes.bool,
  redeemerProvider: PropTypes.object,
  redeemError: PropTypes.string,
  addItemLogs: PropTypes.func,
  clearLogs: PropTypes.func,
  issue: PropTypes.func,
  redeem: PropTypes.func,
  getBalance: PropTypes.func,
  resetIssueSuccess: PropTypes.func,
  resetRedeemSuccess: PropTypes.func,
  resetIssueError: PropTypes.func,
  resetRedeemError: PropTypes.func,
  setpTokenParams: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(PTokenControllersV2)
