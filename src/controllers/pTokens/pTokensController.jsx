import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PTokens from '../../components/pTokens/pTokens'
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

const sleep = _ms => new Promise(resolve => setTimeout(resolve, _ms))

const mapStateToProps = state => {
  return {
    logs: state.log.logs,
    pTokenSelected: state.pTokens.selected,
    pTokenBalance: state.pTokens.balance,
    pTokensParams: state.pTokens.params,
    issuerIsConnected: state.wallets.issuerIsConnected,
    issuerProvider: state.wallets.issuerProvider,
    issuerAccount: state.wallets.issuerAccount,
    redeemerIsConnected: state.wallets.redeemerIsConnected,
    redeemerProvider: state.wallets.redeemerProvider,
    redeemerAccount: state.wallets.redeemerAccount,
    isIssueSuccedeed: state.pTokens.isIssueSuccedeed,
    isRedeemSuccedeed: state.pTokens.isRedeemSuccedeed,
    issueError: state.pTokens.issueError,
    redeemError: state.pTokens.redeemError
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

export class pTokenControllers extends React.Component {
  constructor(_props, _context) {
    super(_props, _context)

    this.state = {
      isIssueTerminated: null,
      isRedeemTerminated: null,
      currentRedeemerAccount: null,
      currentpTokenName: null,
      currentSelectedNetwork: null,
      pTokenSelectedId: null,
      pTokenSelectedNetwork: null,
      localError: null,
      suggestedRedemeerAccounts: [],
      suggestedIssuerAccounts: []
    }

    if (this.props.redeemerAccount) {
      this.props.setpTokenParams(
        Object.assign({}, this.props.pTokensParams, {
          typedIssueAccount: this.props.redeemerAccount
        })
      )
    }

    if (this.props.issuerAccount) {
      this.props.setpTokenParams(
        Object.assign({}, this.props.pTokensParams, {
          typedRedeemAccount: this.props.issuerAccount
        })
      )
    }
  }

  static getDerivedStateFromProps(_prevProps, _prevState) {
    if ((_prevProps.isIssueSuccedeed === true && !_prevState.isRedeemTerminated) || _prevProps.issueError) {
      return {
        isIssueTerminated: true,
        localError: false
      }
    }
    if ((_prevProps.isRedeemSuccedeed === true && !_prevState.isRedeemTerminated) || _prevProps.redeemError) {
      return {
        isRedeemTerminated: true
      }
    } else return null
  }

  async componentDidUpdate(_prevProps, _prevState) {
    const {
      pTokenSelected,
      getBalance,
      isRedeemSuccedeed,
      setpTokenParams,
      pTokensParams,
      redeemerAccount,
      isIssueSuccedeed,
      resetIssueSuccess,
      resetIssueError,
      issueError,
      resetRedeemSuccess,
      redeemError
    } = this.props

    const {
      pTokenSelectedId,
      isIssueTerminated,
      isRedeemTerminated,
      currentIssuerAccount,
      currentRedeemerAccount,
      currentpTokenName,
      currentSelectedNetwork
    } = this.state

    if (pTokenSelected.id !== pTokenSelectedId && pTokenSelected.nodeInfo.contractAddress) {
      this.setState({
        pTokenSelectedId: pTokenSelected.id
      })

      getBalance(redeemerAccount)
    }

    if (isIssueSuccedeed && isIssueTerminated) {
      resetIssueSuccess()

      this.setState({
        isIssueTerminated: false,
        localError: false
      })

      await sleep(10000)
      getBalance(redeemerAccount)
    }

    if (_prevProps.issueError !== issueError && issueError) {
      resetIssueError()
    }

    if (isRedeemSuccedeed && isRedeemTerminated) {
      resetRedeemSuccess()

      this.setState({
        isRedeemTerminated: false
      })

      getBalance(redeemerAccount)
    }

    if (_prevProps.redeemError !== redeemError && redeemError) {
      resetRedeemError()
    }

    // issue input auto filling
    if (_prevProps.redeemerAccount !== currentRedeemerAccount) {
      this.setState({
        currentRedeemerAccount: _prevProps.redeemerAccount
      })

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedIssueAccount: _prevProps.redeemerAccount
        })
      )
    }

    // redeem input auto filling
    const enablers = ['pETH']
    const { name } = _prevProps.pTokenSelected
    if (
      // prettier-ignore
      (_prevProps.issuerAccount !== currentIssuerAccount || name !== currentpTokenName) &&
      enablers.includes(name)
    ) {
      this.setState({
        currentIssuerAccount: _prevProps.issuerAccount
      })

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedRedeemAccount: _prevProps.issuerAccount
        })
      )
    }

    if (_prevProps.pTokenSelected.name !== currentpTokenName) {
      this.setState({
        currentpTokenName: _prevProps.pTokenSelected.name
      })
    }

    if (pTokenSelected.network !== currentSelectedNetwork) {
      this.setState({
        currentSelectedNetwork: pTokenSelected.network
      })
    }
  }

  onIssue = async () => {
    this.setState(
      {
        localError: false
      },
      async () => {
        if (
          !isValidAccount(this.props.pTokenSelected, this.props.pTokensParams.typedIssueAccount, 'redeemer') ||
          this.props.pTokensParams.typedIssueAccount.length < 4
        ) {
          toastr.error(`Please insert a valid ${this.props.pTokenSelected.redeemFrom} address`)
          this.setState({
            localError: true
          })
          return
        }

        if (this.props.pTokenSelected.isPerc20 || this.props.pTokenSelected.name === 'pETH') {
          if (!this.props.issuerIsConnected) {
            toastr.error('Please connect your Ethereum wallet')
            return
          }
        }

        this.props.resetDepositAddress()

        // prettier-ignore
        const parsedAmountToIssue = parseFloat(this.props.pTokensParams.amountToIssue).toFixed(this.props.pTokenSelected.realDecimals)
        // prettier-ignore
        const minimumIssuableAmount = parseFloat(this.props.pTokenSelected.minimumIssuable).toFixed(this.props.pTokenSelected.realDecimals)
        if (parsedAmountToIssue < minimumIssuableAmount) {
          toastr.error(`Impossible to mint less than ${minimumIssuableAmount} ${this.props.pTokenSelected.name}`)
          return
        }

        this.setState({
          isIssueTerminated: null
        })

        this.props.clearLogs()

        const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(this.props.pTokenSelected)

        let amountToIssue = this.props.pTokensParams.amountToIssue
        if (this.props.pTokenSelected.isPerc20 || this.props.pTokenSelected.name === 'pETH') {
          amountToIssue = BigNumber(this.props.pTokensParams.amountToIssue)
            .multipliedBy(10 ** this.props.pTokenSelected.realDecimals)
            .toFixed()
        }

        this.props.issue([amountToIssue, this.props.pTokensParams.typedIssueAccount], {
          issuer: this.props.issuerProvider,
          redeemer: redeemerReadOnlyProvider
        })
      }
    )
  }

  onRedeem = () => {
    if (!this.props.redeemerIsConnected) {
      toastr.error(`${this.props.pTokenSelected.redeemFrom} Wallet Not Connected`)
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    if (!isValidAccount(this.props.pTokenSelected, this.props.pTokensParams.typedRedeemAccount, 'issuer')) {
      toastr.error(`Please insert a valid ${this.props.pTokenSelected.issueFrom} address`)
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    const minimunRedeemableAmount = parseFloat(this.props.pTokenSelected.minimumRedeamable)
    if (BigNumber(this.props.pTokensParams.amountToRedeem).isLessThan(minimunRedeemableAmount)) {
      toastr.error(`Impossible to redeem less than ${minimunRedeemableAmount} ${this.props.pTokenSelected.name}`)
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    this.setState({
      isRedeemTerminated: null
    })

    this.props.clearLogs()

    const issuerReadOnlyProvider = getCorrespondingReadOnlyProvider(this.props.pTokenSelected)

    this.props.redeem([this.props.pTokensParams.amountToRedeem, this.props.pTokensParams.typedRedeemAccount], {
      issuer: issuerReadOnlyProvider,
      redeemer: this.props.redeemerProvider
    })
  }

  onResetLogs = () => {
    this.props.clearLogs()
  }

  onChangeAmountToIssue = _amount => {
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        amountToIssue: _amount
      })
    )
  }

  onChangeAmountToRedeem = _amount => {
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        amountToRedeem: _amount
      })
    )
  }

  onChangeTypedIssueAccount = async _typedIssueAccount => {
    if (
      (this.props.pTokenSelected.name === 'pBTC' || this.props.pTokenSelected.name === 'pLTC') &&
      !this.props.pTokenSelected.depositAddress.waiting
    ) {
      this.props.resetDepositAddress()
    }

    // NOTE: get lists of possible account
    if (this.props.pTokenSelected.redeemFrom === 'EOS' || this.props.pTokenSelected.redeemFrom === 'TELOS') {
      EosAccountSuggester.getPossiblesAccounts(
        this.props.pTokenSelected,
        _typedIssueAccount,
        this.state.suggestedRedemeerAccounts,
        'redeemer'
      ).then(_accounts => {
        this.setState({
          suggestedRedemeerAccounts: _accounts
        })
      })
    }

    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        typedIssueAccount: _typedIssueAccount
      })
    )
  }

  onChangeTypedRedeemAccount = _typedRedeemAccount => {
    if (this.props.pTokenSelected.issueFrom === 'EOS') {
      EosAccountSuggester.getPossiblesAccounts(
        this.props.pTokenSelected,
        _typedRedeemAccount,
        this.state.suggestedIssuerAccounts,
        'issuer'
      ).then(_accounts => {
        this.setState({
          suggestedIssuerAccounts: _accounts
        })
      })
    }

    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        typedRedeemAccount: _typedRedeemAccount
      })
    )
  }

  setMaxAmountToRedeem = () => {
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        amountToRedeem: !this.props.pTokenBalance || this.props.pTokenBalance === 0 ? 0 : this.props.pTokenBalance
      })
    )
  }

  setMaxAmountToIssue = () => {
    // TODO: get EOS balance
    /*this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        amountToIssue: !this.props.pTokenBalance || this.props.pTokenBalance === 0 ? 0 : this.props.pTokenBalance
      })
    )*/
  }

  render() {
    return (
      <React.Fragment>
        <PTokens
          pTokenSelected={this.props.pTokenSelected}
          balance={this.props.pTokenBalance}
          issuerAccount={this.props.issuerAccount}
          redeemerAccount={this.props.redeemerAccount}
          amountToIssue={this.props.pTokensParams.amountToIssue}
          amountToRedeem={this.props.pTokensParams.amountToRedeem}
          typedIssueAccount={this.props.pTokensParams.typedIssueAccount}
          typedRedeemAccount={this.props.pTokensParams.typedRedeemAccount}
          logs={this.props.logs}
          issuerProvider={this.props.issuerProvider}
          redeemerProvider={this.props.redeemerProvider}
          isRedeemTerminated={this.state.isRedeemTerminated}
          localError={this.state.localError}
          suggestedRedemeerAccounts={this.state.suggestedRedemeerAccounts}
          suggestedIssuerAccounts={this.state.suggestedIssuerAccounts}
          onChangeAmountToIssue={this.onChangeAmountToIssue}
          onChangeAmountToRedeem={this.onChangeAmountToRedeem}
          onChangeIssueAccount={this.onChangeTypedIssueAccount}
          onChangeRedeemAccount={this.onChangeTypedRedeemAccount}
          onIssue={this.onIssue}
          onRedeem={this.onRedeem}
          onResetLogs={this.onResetLogs}
          onMaxAmountToRedeem={this.setMaxAmountToRedeem}
          onMaxAmountToIssue={this.setMaxAmountToIssue}
        />
      </React.Fragment>
    )
  }
}

pTokenControllers.propTypes = {
  logs: PropTypes.array,
  pTokenSelected: PropTypes.object,
  pTokenBalance: PropTypes.number,
  pTokensParams: PropTypes.object,
  issuerIsConnected: PropTypes.bool,
  issuerProvider: PropTypes.object,
  issuerAccount: PropTypes.string,
  redeemerIsConnected: PropTypes.bool,
  redeemerProvider: PropTypes.object,
  redeemerAccount: PropTypes.string,
  isIssueSuccedeed: PropTypes.bool,
  isRedeemSuccedeed: PropTypes.bool,
  issueError: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(pTokenControllers)
