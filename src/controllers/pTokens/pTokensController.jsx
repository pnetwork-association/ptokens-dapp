import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PTokens from '../../components/pTokens/pTokens'
import NotificationAlert from 'react-notification-alert'
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
import { connectWithCorrectWallets } from '../../actions/wallets'
import { isValidAccount } from '../../utils/account-validator'
import { getMinumIssuableAmount } from '../../utils/minum-issuable-amount'
import { getMinumRedeemableAmount } from '../../utils/minimun-redeeamble-amount'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import { getPossiblesAccounts } from '../../utils/accounts-autocomplete'

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
    issue: (_pToken, _params, _configs) =>
      dispatch(issue(_pToken, _params, _configs)),
    redeem: (_pToken, _params, _configs) =>
      dispatch(redeem(_pToken, _params, _configs)),
    getBalance: (_pToken, _account, _redeemerNetwork, configs) =>
      dispatch(getBalance(_pToken, _account, configs)),
    resetDepositAddress: () => dispatch(resetDepositAddress()),
    resetIssueSuccess: () => dispatch(resetIssueSuccess()),
    resetRedeemSuccess: () => dispatch(resetRedeemSuccess()),
    resetIssueError: () => dispatch(resetIssueError()),
    resetRedeemError: () => dispatch(resetRedeemError()),
    setpTokenParams: _params => dispatch(setParams(_params)),
    connectWithCorrectWallets: (pTokenName, currentProviders, force) =>
      dispatch(connectWithCorrectWallets(pTokenName, currentProviders, force))
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
      suggestedRedimeerAccounts: []
    }

    this.props.connectWithCorrectWallets(this.props.pTokenSelected, {
      redeemer: this.props.redeemerProvider,
      issuer: this.props.issuerProvider
    })
  }

  static getDerivedStateFromProps(_prevProps, _prevState) {
    if (
      (_prevProps.isIssueSuccedeed === true &&
        !_prevState.isRedeemTerminated) ||
      _prevProps.issueError
    ) {
      return {
        isIssueTerminated: true,
        localError: false
      }
    }
    if (
      (_prevProps.isRedeemSuccedeed === true &&
        !_prevState.isRedeemTerminated) ||
      _prevProps.redeemError
    ) {
      return {
        isRedeemTerminated: true
      }
    } else return null
  }

  async componentDidUpdate(_prevProps, _prevState) {
    if (
      this.props.pTokenSelected.id !== this.state.pTokenSelectedId &&
      this.props.pTokenSelected.nodeInfo.contractAddress
    ) {
      this.setState({
        pTokenSelectedId: this.props.pTokenSelected.id
      })

      this.props.getBalance(
        this.props.pTokenSelected,
        this.props.redeemerAccount,
        {
          redeemer: getCorrespondingReadOnlyProvider(this.props.pTokenSelected),
          issuer: this.props.issuerProvider
        }
      )
    }

    if (this.props.isIssueSuccedeed && this.state.isIssueTerminated) {
      this.props.resetIssueSuccess()

      this.setState({
        isIssueTerminated: false,
        localError: false
      })

      await sleep(10000)
      this.props.getBalance(
        this.props.pTokenSelected,
        this.props.redeemerAccount,
        {
          redeemer: this.props.redeemerProvider,
          issuer: this.props.issuerProvider
        }
      )
    }

    if (
      _prevProps.issueError !== this.props.issueError &&
      this.props.issueError
    ) {
      this.props.resetIssueError()
    }

    if (this.props.isRedeemSuccedeed && this.state.isRedeemTerminated) {
      this.props.resetRedeemSuccess()

      this.setState({
        isRedeemTerminated: false
      })

      this.props.getBalance(
        this.props.pTokenSelected,
        this.props.redeemerAccount,
        {
          redeemer: this.props.redeemerProvider,
          issuer: this.props.issuerProvider
        }
      )
    }

    if (
      _prevProps.redeemError !== this.props.redeemError &&
      this.props.redeemError
    ) {
      this.props.resetRedeemError()
    }

    //filling input with eth address when pToken is pBTC
    const enablers = ['pBTC', 'pLTC']
    if (
      (_prevProps.redeemerAccount !== this.state.currentRedeemerAccount &&
        enablers.includes(this.props.pTokenSelected.name)) ||
      (_prevProps.pTokenSelected.name !== this.state.currentpTokenName &&
        enablers.includes(this.props.pTokenSelected.name) &&
        _prevProps.redeemerAccount)
    ) {
      this.setState({
        currentRedeemerAccount: _prevProps.redeemerAccount,
        currentpTokenName: _prevProps.pTokenSelected.name
      })

      this.props.setpTokenParams(
        Object.assign({}, this.props.pTokensParams, {
          typedIssueAccount: _prevProps.redeemerAccount
        })
      )
    }

    if (
      this.props.pTokenSelected.network !== this.state.currentSelectedNetwork &&
      enablers.includes(this.props.pTokenSelected.name)
    ) {
      this.setState({
        currentSelectedNetwork: this.props.pTokenSelected.network
      })

      this.props.setpTokenParams(
        Object.assign({}, this.props.pTokensParams, {
          typedIssueAccount: this.props.redeemerAccount
        })
      )
    }
  }

  showAlert = (_type, _message, _link) => {
    const options = {
      place: 'br',
      message: (
        <span className="ml-1 font-weight-bold">
          {_message + '.'}
          {_link ? (
            <a href={_link} target="_blank" rel="noopener noreferrer">
              {' '}
              link
            </a>
          ) : null}
        </span>
      ),
      type: _type,
      icon: 'fa fa-bell',
      autoDismiss: 7
    }
    this.refs.notify.notificationAlert(options)
  }

  onIssue = async () => {
    this.setState(
      {
        localError: false
      },
      async () => {
        if (
          !isValidAccount(
            this.props.pTokenSelected,
            this.props.pTokensParams.typedIssueAccount,
            'redeemer'
          ) ||
          this.props.pTokensParams.typedIssueAccount.length < 4
        ) {
          this.showAlert(
            'danger',
            `Please insert a valid ${this.props.pTokenSelected.redeemFrom} address`
          )
          this.setState({
            localError: true
          })
          return
        }

        if (this.props.pTokenSelected.redeemFrom === 'EOS') {
          const rpc = getCorrespondingReadOnlyProvider(
            this.props.pTokenSelected,
            'redeemer'
          )

          try {
            await rpc.get_account(this.props.pTokensParams.typedIssueAccount)
          } catch (err) {
            this.showAlert('danger', "This EOS account doesn't exist yet")

            this.setState({
              localError: true
            })
            return
          }
        }

        this.props.resetDepositAddress()

        const decimals = this.props.pTokenSelected.realDecimals
        const parsedAmountToIssue = parseFloat(
          this.props.pTokensParams.amountToIssue
        ).toFixed(decimals)
        const minimunIssuableAmount = getMinumIssuableAmount(
          this.props.pTokenSelected.name
        )
        if (parsedAmountToIssue < minimunIssuableAmount) {
          this.showAlert(
            'danger',
            `Impossible to mint less than ${minimunIssuableAmount} ${this.props.pTokenSelected.name}`
          )
          return
        }

        this.setState({
          isIssueTerminated: null
        })

        this.props.clearLogs()

        const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
          this.props.pTokenSelected
        )
        console.log(this.props.pTokenSelected)

        this.props.issue(
          this.props.pTokenSelected,
          [
            parseFloat(this.props.pTokensParams.amountToIssue),
            this.props.pTokensParams.typedIssueAccount
          ],
          {
            issuer: this.props.issuerProvider,
            redeemer: redeemerReadOnlyProvider
          }
        )
      }
    )
  }

  onRedeem = () => {
    if (!this.props.redeemerIsConnected) {
      this.showAlert(
        'danger',
        `${this.props.pTokenSelected.redeemFrom} Wallet Not Connected`
      )
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    if (
      !isValidAccount(
        this.props.pTokenSelected,
        this.props.pTokensParams.typedRedeemAccount,
        'issuer'
      )
    ) {
      this.showAlert(
        'danger',
        `Please insert a valid ${this.props.pTokenSelected.issueFrom} address`
      )
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    const parsedAmountToRedeem =
      Math.trunc(
        this.props.pTokensParams.amountToRedeem *
          Math.pow(10, this.props.pTokensParams.realDecimals)
      ) /
      Math.pow(10, this.props.pTokensParams.realDecimals).toFixed(
        this.props.pTokensParams.realDecimals
      )

    const minimunRedeemableAmount = getMinumRedeemableAmount(
      this.props.pTokenSelected.name
    )
    if (parsedAmountToRedeem < minimunRedeemableAmount) {
      this.showAlert(
        'danger',
        `Impossible to redeem less than ${minimunRedeemableAmount} ${this.props.pTokenSelected.name}`
      )
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    if (parsedAmountToRedeem > this.props.pTokenBalance) {
      this.showAlert('danger', `Impossible to redeem more than what you have`)
      this.setState({
        isRedeemTerminated: true
      })
      return
    }

    this.setState({
      isRedeemTerminated: null
    })

    this.props.clearLogs()

    const issuerReadOnlyProvider = getCorrespondingReadOnlyProvider(
      this.props.pTokenSelected
    )

    this.props.redeem(
      this.props.pTokenSelected,
      [parsedAmountToRedeem, this.props.pTokensParams.typedRedeemAccount],
      {
        issuer: issuerReadOnlyProvider,
        redeemer: this.props.redeemerProvider
      }
    )
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
      (this.props.pTokenSelected.name === 'pBTC' ||
        this.props.pTokenSelected.name === 'pLTC') &&
      !this.props.pTokenSelected.depositAddress.waiting
    ) {
      this.props.resetDepositAddress()
    }

    // NOTE: get lists of possible account
    if (this.props.pTokenSelected.redeemFrom === 'EOS') {
      getPossiblesAccounts(
        this.props.pTokenSelected,
        _typedIssueAccount,
        this.state.suggestedRedimeerAccounts,
        'redeemer'
      ).then(accounts => {
        this.setState({
          suggestedRedimeerAccounts: accounts
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
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        typedRedeemAccount: _typedRedeemAccount
      })
    )
  }

  setMaxAmountToRedeem = () => {
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        amountToRedeem:
          !this.props.pTokenBalance || this.props.pTokenBalance === 0
            ? 0
            : this.props.pTokenBalance
      })
    )
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
          suggestedRedimeerAccounts={this.state.suggestedRedimeerAccounts}
          onChangeAmountToIssue={this.onChangeAmountToIssue}
          onChangeAmountToRedeem={this.onChangeAmountToRedeem}
          onChangeIssueAccount={this.onChangeTypedIssueAccount}
          onChangeRedeemAccount={this.onChangeTypedRedeemAccount}
          onIssue={this.onIssue}
          onRedeem={this.onRedeem}
          onResetLogs={this.onResetLogs}
          onMaxAmountToRedeem={this.setMaxAmountToRedeem}
        />
        <NotificationAlert ref="notify" />
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
  setpTokenParams: PropTypes.func,
  connectWithCorrectWallets: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(pTokenControllers)
