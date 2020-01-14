import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Token from '../../components/token/Token'
import NotificationAlert from "react-notification-alert"
import * as LogHandler from '../../actions/log'
import { mask } from '../../utils/utils'
import * as pTokens from '../../actions/pTokens'
import * as WalletsController from '../../actions/wallets'
import { isValidAccount } from '../../utils/account-validator'
import { getMinumIssuableAmount } from '../../utils/minum-issuable-amount'
import { getMinumRedeemableAmount } from '../../utils/minimun-redeeamble-amount'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'

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
    issue: (type, amount, to, configs) => dispatch(pTokens.issue(type, amount, to, configs)),
    redeem: (type, amount, to, configs) => dispatch(pTokens.redeem(type, amount, to, configs)),
    getBalance: (type, account, configs) => dispatch(pTokens.getBalance(type, account, configs)),
    resetDepositAddress: () => dispatch(pTokens.resetDepositAddress()),
    resetIssueSuccess: () => dispatch(pTokens.resetIssueSuccess()),
    resetRedeemSuccess: () => dispatch(pTokens.resetRedeemSuccess()),
    resetIssueError: () => dispatch(pTokens.resetIssueError()),
    resetRedeemError: () => dispatch(pTokens.resetRedeemError()),
    setpTokenParams: _params => dispatch(pTokens.setParams(_params)),
    connectWithCorrectWallets: (pTokenName, currentProviders, force) => dispatch(WalletsController.connectWithCorrectWallets(pTokenName, currentProviders, force)),
  }
}

export class TokenController extends React.Component {

  constructor(_props, _context) {
    super(_props, _context)

    this.state = {
      isIssueTerminated: null,
      isRedeemTerminated: null,
      currentRedeemerAccount: null,
      currentpTokenName: null
    }

    //TODO: se non connesso con entrambi connetti con entrambi altrimenti con solo ognuno di essi

    this.props.connectWithCorrectWallets(
      this.props.pTokenSelected.name,
      {
        redeemer: this.props.redeemerProvider,
        issuer: this.props.issuerProvider
      }
    )
  }

  static getDerivedStateFromProps(_prevProps, _prevState) {
    if (_prevProps.isIssueSuccedeed === true  || _prevProps.issueError) {
      return {
        isIssueTerminated: true,
        amountToIssue: '',
        typedIssueAccount: ''
      }
    }
    if (
      (_prevProps.isRedeemSuccedeed === true && !_prevState.isRedeemTerminated) ||
      _prevProps.redeemError
    ) {
      return {
        isRedeemTerminated: true,
        amountToRedeem: '',
        typedRedeemAccount: ''
      }
    }
    else return null
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.isIssueSuccedeed) {
      this.props.resetIssueSuccess()

      this.setState({
        isIssueTerminated: false 
      })
    }
    if (
      (_prevProps.issueError !== this.props.issueError) &&
      this.props.issueError
    ) {
      this.props.resetIssueError()
    }

    if (this.props.isRedeemSuccedeed) {
      this.props.resetRedeemSuccess()

      this.setState({
        isRedeemTerminated: false 
      })

      this.props.getBalance(
        this.props.pTokenSelected.name,
        this.props.redeemerAccount,
        {
          redeemer: this.props.redeemerProvider,
          issuer: this.props.issuerProvider
        }
      )
    }
    if (
      (_prevProps.redeemError !== this.props.redeemError) &&
      this.props.redeemError
    ) {
      this.props.resetRedeemError()
    }

    //filling input with eth address when pToken is pBTC
    if (
        (
          _prevProps.redeemerAccount !== this.state.currentRedeemerAccount &&
          this.props.pTokenSelected.name === 'pBTC'
        ) ||
        (
          _prevProps.pTokenSelected.name !== this.state.currentpTokenName &&
          this.props.pTokenSelected.name === 'pBTC' &&
          _prevProps.redeemerAccount
        )
    ) {

      this.setState({
        currentRedeemerAccount: _prevProps.redeemerAccount,
        currentpTokenName: _prevProps.pTokenSelected.name
      })

      this.props.setpTokenParams(Object.assign({}, this.props.pTokensParams, {
        typedIssueAccount: _prevProps.redeemerAccount,
      }))
    }
  }

  showAlert = (_type, _message, _link) => {
    const options = {
      place: 'br',
      message: (
        <span className='ml-1 font-weight-bold'>
          {
            _message + '.'
          } 
          {
            _link 
              ? <a href={_link} target="_blank" rel="noopener noreferrer"> link</a> 
              : null
          }
        </span>
      ),
      type: _type,
      icon: 'fa fa-bell',
      autoDismiss: 7
    }
    this.refs.notify.notificationAlert(options)
  }

  onIssue = () => {
    if (this.props.pTokenSelected.name === 'pEOS') {
      if (!this.props.issuerIsConnected) {
        this.showAlert('danger', `${this.props.pTokenSelected.issueFrom} Wallet Not Connected`)
        return
      }
    }

    if (!isValidAccount(this.props.pTokenSelected.name, this.props.pTokensParams.typedIssueAccount, 'redeemer')) {
      this.showAlert('danger', `Please insert a valid ${this.props.pTokenSelected.redeemFrom} address`)
      return
    }

    const decimals = this.props.pTokenSelected.decimals
    const parsedAmountToIssue = parseFloat(this.props.pTokensParams.amountToIssue).toFixed(decimals)
    const minimunIssuableAmount = getMinumIssuableAmount(
      this.props.pTokenSelected.name
    )
    if (parsedAmountToIssue < minimunIssuableAmount ) {
      this.showAlert('danger', `Impossible to mint less than ${minimunIssuableAmount} ${this.props.pTokenSelected.name}`)
      return
    }

    this.setState({
      isIssueTerminated: null
    })

    this.props.clearLogs()

    const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
      this.props.pTokenSelected.name,
      this.props.pTokenSelected.redeemFrom
    )

    this.props.issue(
      this.props.pTokenSelected,
      [
        parseFloat(this.props.pTokensParams.amountToIssue),
        this.props.pTokensParams.typedIssueAccount
      ],
      {
        issuer: this.props.issuerProvider,
        redeemer: redeemerReadOnlyProvider,
      }
    )
  }

  onRedeem = () => {
    if (!this.props.redeemerIsConnected) {
      this.showAlert('danger', `${this.props.pTokenSelected.redeemFrom} Wallet Not Connected`)
      return
    }
    
    if (!isValidAccount(this.props.pTokenSelected.name, this.props.pTokensParams.typedRedeemAccount, 'issuer')) {
      this.showAlert('danger', `Please insert a valid ${this.props.pTokenSelected.issueFrom} address`)
      return
    }

    const parsedAmountToRedeem = parseFloat(this.props.pTokensParams.amountToRedeem)
    if (parsedAmountToRedeem === 0) {
      this.showAlert('danger', `Impossible to burn 0 ${this.props.pTokenSelected.name}`)
      return
    }

    const decimals = this.props.pTokenSelected.decimals
    const parsedAmountToIssue = parseFloat(this.props.pTokensParams.amountToRedeem).toFixed(decimals)
    const minimunRedeemableAmount = getMinumRedeemableAmount(
      this.props.pTokenSelected.name
    )
    if (parsedAmountToIssue < minimunRedeemableAmount ) {
      this.showAlert('danger', `Impossible to mint less than ${minimunRedeemableAmount} ${this.props.pTokenSelected.name}`)
      return
    }

    this.setState({
      isRedeemTerminated: null
    })

    this.props.clearLogs()

    const issuerReadOnlyProvider = getCorrespondingReadOnlyProvider(
      this.props.pTokenSelected.name,
      this.props.pTokenSelected.issueFrom
    )
    
    this.props.redeem(
      this.props.pTokenSelected,
      [
        parseFloat(this.props.pTokensParams.amountToRedeem),
        this.props.pTokensParams.typedRedeemAccount
      ],
      {
        issuer: issuerReadOnlyProvider,
        redeemer: this.props.redeemerProvider,
      }
    )
  }

  onResetLogs = () => {
    this.props.clearLogs()
  }

  onChangeAmountToIssue = _amount => {    
    this.props.setpTokenParams(Object.assign({}, this.props.pTokensParams, {
      amountToIssue: mask(_amount, this.props.pTokenSelected.decimals).maskedValue
    }))
  }

  onChangeAmountToRedeem = _amount => {
    this.props.setpTokenParams(Object.assign({}, this.props.pTokensParams, {
      amountToRedeem: mask(_amount, this.props.pTokenSelected.decimals).maskedValue,
    }))
  }

  onChangeTypedIssueAccount = _typedIssueAccount => {
    if (
      this.props.pTokenSelected.name === 'pBTC' &&
      !this.props.pTokenSelected.depositAddress.waiting
    ) {
      this.props.resetDepositAddress()
    }

    this.props.setpTokenParams(Object.assign({},this.props.pTokensParams, {
      typedIssueAccount: _typedIssueAccount,
    }))
  }

  onChangeTypedRedeemAccount = _typedRedeemAccount => {
    this.props.setpTokenParams(Object.assign({}, this.props.pTokensParams, {
      typedRedeemAccount: _typedRedeemAccount,
    }))
  }

  render() {
    
    if (
      this.props.redeemerIsConnected &&
      this.props.redeemerAccount &&
      this.props.pTokenSelected
    ) {
      this.props.getBalance(
        this.props.pTokenSelected.name,
        this.props.redeemerAccount,
        {
          issuer: this.props.issuerProvider,
          redeemer: this.props.redeemerProvider
        }
      )
    }
      
    return (
      <React.Fragment>
        <Token pTokenSelected={this.props.pTokenSelected}
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
          onChangeAmountToIssue={this.onChangeAmountToIssue}
          onChangeAmountToRedeem={this.onChangeAmountToRedeem}
          onChangeIssueAccount={this.onChangeTypedIssueAccount}
          onChangeRedeemAccount={this.onChangeTypedRedeemAccount}
          onIssue={this.onIssue}
          onRedeem={this.onRedeem}
          onResetLogs={this.onResetLogs} />
        <NotificationAlert ref="notify"/>
      </React.Fragment>
    );
  }
}

TokenController.propTypes = {
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
  clearLogs:PropTypes.func,
  issue: PropTypes.func,
  redeem: PropTypes.func,
  getBalance: PropTypes.func,
  resetIssueSuccess: PropTypes.func,
  resetRedeemSuccess: PropTypes.func,
  resetIssueError: PropTypes.func,
  resetRedeemError: PropTypes.func,
  setpTokenParams: PropTypes.func,
  connectWithCorrectWallets: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenController)
