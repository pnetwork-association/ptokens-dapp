import React from 'react'
import { connect } from 'react-redux'
import Settings from '../../components/settings/Settings'
import PropTypes from 'prop-types'
import * as WalletsController from '../../actions/wallets'
import { resetDetectedNetwork } from '../../actions/networkDetector'
import { setParams } from '../../actions/pTokens'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    pTokensParams: state.pTokens.params,
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
    connectWithCorrectWallets: (_pTokenName, _currentProviders) => dispatch(WalletsController.connectWithCorrectWallets(_pTokenName, _currentProviders)),
    connectWithSpecificWallet: (_pTokenName, _role, _force) => dispatch(WalletsController.connectWithSpecificWallet(_pTokenName, _role, _force)),
    disconnectFromSpecificWallet: (_pTokenName, _role) => dispatch(WalletsController.disconnectFromSpecificWallet(_pTokenName, _role)),
    changeSpecificWallet: (_pTokenName, _role) => dispatch(WalletsController.changeSpecificWallet(_pTokenName, _role)),
    resetDetectedNetwork: _role => dispatch(resetDetectedNetwork(_role)),
    setpTokenParams: _params => dispatch(setParams(_params)),
  }
}

export class SettingsController extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      providerNameLoaded: false
    }

    if (!this.props.issuerIsConnected) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected.name,
        'issuer',
        false
      )
    }
    if (!this.props.redeemerIsConnected) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected.name,
        'redeemer',
        false
      )
    }
  }

  onChangeIssuerConnection = _wallet => {
    if (!_wallet) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected.name,
        'issuer',
        true
      )
      return
    }

    if (_wallet.type === 'singleWallet') {
      this.props.issuerIsConnected
        ? this.props.disconnectFromSpecificWallet(
            this.props.pTokenSelected.name,
            'issuer'
          )
        : this.props.connectWithSpecificWallet(
            this.props.pTokenSelected.name,
            'issuer',
            false
          )
    } 

    if (_wallet.type === 'multiWallet') {
      this.props.changeSpecificWallet(
        this.props.pTokenSelected.name,
        'issuer',
        true
      )
    }
  }

  onChangeRedeemerConnection = _wallet => {

    this.props.resetDetectedNetwork('redeemer')
    this.props.setpTokenParams(Object.assign({}, this.props.pTokensParams, {
      typedIssueAccount: '',
    }))

    if (!_wallet) {
      this.props.connectWithSpecificWallet(
        this.props.pTokenSelected.name,
        'redeemer',
        false
      )
      return
    }
    
    if (_wallet.type === 'singleWallet') {
      this.props.issuerIsConnected
      ? this.props.disconnectFromSpecificWallet(
          this.props.pTokenSelected.name,
          'redeemer'
        )
      : this.props.connectWithSpecificWallet(
          this.props.pTokenSelected.name,
          'redeemer',
          false
        )
    } 

    if (_wallet.type === 'multiWallet') {
      this.props.changeSpecificWallet(
        this.props.pTokenSelected.name,
        'redeemer',
        true
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <Settings pTokenSelected={this.props.pTokenSelected}
          issuerIsConnected={this.props.issuerIsConnected}
          redeemerIsConnected={this.props.redeemerIsConnected}
          issuerAccount={this.props.issuerAccount}
          redeemerAccount={this.props.redeemerAccount}
          issuerWallet={this.props.issuerWallet}
          redeemerWallet={this.props.redeemerWallet}
          onChangeIssuerConnection={this.onChangeIssuerConnection}
          onChangeRedeemerConnection={this.onChangeRedeemerConnection}/>
      </React.Fragment>
    )
  }
}

Settings.propTypes = {
  pTokenSelected: PropTypes.object,
  pTokensParams: PropTypes.object,
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
  setpTokenParams: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsController)
