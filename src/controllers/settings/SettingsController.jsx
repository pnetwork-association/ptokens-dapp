import React from 'react'
import { connect } from 'react-redux'
import Settings from '../../components/settings/Settings'
import PropTypes from 'prop-types'
import {
  connectWithCorrectWallets,
  connectWithSpecificWallet,
  disconnectFromSpecificWallet,
  changeSpecificWallet
} from '../../actions/wallets'
import { resetDetectedNetwork } from '../../actions/networkDetector'
import { setParams, setBalance, getBalance } from '../../actions/pTokens'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    pTokensParams: state.pTokens.params,
    pTokenBalance: state.pTokens.balance,
    issuerIsConnected: state.wallets.issuerIsConnected,
    issuerProvider: state.wallets.issuerProvider,
    issuerAccount: state.wallets.issuerAccount,
    redeemerIsConnected: state.wallets.redeemerIsConnected,
    redeemerProvider: state.wallets.redeemerProvider,
    redeemerAccount: state.wallets.redeemerAccount,
    issuerWallet: state.wallets.issuerWallet,
    redeemerWallet: state.wallets.redeemerWallet
  }
}
const mapDispatchToProps = dispatch => {
  return {
    connectWithCorrectWallets: (_pToken, _currentProviders) =>
      dispatch(connectWithCorrectWallets(_pToken, _currentProviders)),
    connectWithSpecificWallet: (_pToken, _role, _force) =>
      dispatch(connectWithSpecificWallet(_pToken, _role, _force)),
    disconnectFromSpecificWallet: (_pToken, _role) =>
      dispatch(disconnectFromSpecificWallet(_pToken, _role)),
    changeSpecificWallet: (_pToken, _role) =>
      dispatch(changeSpecificWallet(_pToken, _role)),
    resetDetectedNetwork: _role => dispatch(resetDetectedNetwork(_role)),
    setpTokenParams: _params => dispatch(setParams(_params)),
    setBalance: _balance => dispatch(setBalance(_balance)),
    getBalance: (_pToken, _account, _redeemerNetwork, configs) =>
      dispatch(getBalance(_pToken, _account, configs))
  }
}

export class SettingsController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      providerNameLoaded: false,
      pTokenSelectedId: null,
      pTokenSelectedNetwork: null
    }

    if (!this.props.issuerIsConnected) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected,
        'issuer',
        false
      )
    }
    if (!this.props.redeemerIsConnected) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected,
        'redeemer',
        false
      )
    }
  }

  componentDidUpdate(_prevProps) {
    if (
      this.props.pTokenSelected.id !== this.state.pTokenSelectedId &&
      this.props.redeemerProvider &&
      this.props.pTokenSelected.nodeInfo.contractAddress
    ) {
      this.setState({
        pTokenSelectedId: this.props.pTokenSelected.id,
        pTokenSelectedNetwork: this.props.pTokenSelected.network
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
  }

  onChangeIssuerConnection = _wallet => {
    if (!_wallet) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected,
        'issuer',
        true
      )
      return
    }

    if (_wallet.type === 'singleWallet') {
      this.props.issuerIsConnected
        ? this.props.disconnectFromSpecificWallet(
            this.props.pTokenSelected,
            'issuer'
          )
        : this.props.connectWithSpecificWallet(
            this.props.pTokenSelected,
            'issuer',
            false
          )
    }

    if (_wallet.type === 'multiWallet') {
      this.props.changeSpecificWallet(this.props.pTokenSelected, 'issuer', true)
    }
  }

  onChangeRedeemerConnection = _wallet => {
    this.props.resetDetectedNetwork('redeemer')
    this.props.setpTokenParams(
      Object.assign({}, this.props.pTokensParams, {
        typedIssueAccount: ''
      })
    )

    this.props.setBalance(null)

    if (!_wallet) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected,
        'redeemer',
        true
      )
      return
    }

    if (_wallet.type === 'singleWallet') {
      this.props.issuerIsConnected
        ? this.props.disconnectFromSpecificWallet(
            this.props.pTokenSelected,
            'redeemer'
          )
        : this.props.connectWithSpecificWallet(
            this.props.pTokenSelected,
            'redeemer',
            false
          )
    }

    if (_wallet.type === 'multiWallet') {
      this.props.changeSpecificWallet(
        this.props.pTokenSelected,
        'redeemer',
        true
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <Settings
          pTokenSelected={this.props.pTokenSelected}
          balance={this.props.pTokenBalance}
          issuerIsConnected={this.props.issuerIsConnected}
          redeemerIsConnected={this.props.redeemerIsConnected}
          issuerAccount={this.props.issuerAccount}
          redeemerAccount={this.props.redeemerAccount}
          issuerWallet={this.props.issuerWallet}
          redeemerWallet={this.props.redeemerWallet}
          onChangeIssuerConnection={this.onChangeIssuerConnection}
          onChangeRedeemerConnection={this.onChangeRedeemerConnection}
        />
      </React.Fragment>
    )
  }
}

Settings.propTypes = {
  pTokenSelected: PropTypes.object,
  pTokensParams: PropTypes.object,
  pTokenBalance: PropTypes.number,
  issuerIsConnected: PropTypes.bool,
  issuerProvider: PropTypes.bool,
  issuerAccount: PropTypes.string,
  redeemerIsConnected: PropTypes.bool,
  redeemerProvider: PropTypes.object,
  redeemerAccount: PropTypes.string,
  issuerWallet: PropTypes.object,
  redeemerWallet: PropTypes.object,
  connectWithCorrectWallets: PropTypes.func,
  connectWithSpecificWallet: PropTypes.func,
  disconnectFromSpecificWallet: PropTypes.func,
  changeSpecificWallet: PropTypes.func,
  resetDetectedNetwork: PropTypes.func,
  setpTokenParams: PropTypes.func,
  setBalance: PropTypes.func,
  getBalance: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsController)
