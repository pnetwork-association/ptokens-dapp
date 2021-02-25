import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import Settings from '../../components/settings/Settings'
import PropTypes from 'prop-types'
import { connectWithSpecificWallet, disconnectFromSpecificWallet, changeSpecificWallet } from '../../actions/wallets'
import { setParams, setBalance, getBalance } from '../../actions/pTokens'

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
    connectWithSpecificWallet: (_role, _force) => dispatch(connectWithSpecificWallet(_role, _force)),
    disconnectFromSpecificWallet: _role => dispatch(disconnectFromSpecificWallet(_role)),
    changeSpecificWallet: _role => dispatch(changeSpecificWallet(_role)),
    setpTokenParams: _params => dispatch(setParams(_params)),
    setBalance: _balance => dispatch(setBalance(_balance)),
    getBalance: _account => dispatch(getBalance(_account))
  }
}

const SettingsController = _props => {
  const {
    issuerIsConnected,
    redeemerIsConnected,
    pTokensParams,
    connectWithSpecificWallet,
    disconnectFromSpecificWallet,
    changeSpecificWallet,
    setpTokenParams
  } = _props

  const onChangeIssuerConnection = useCallback(
    _wallet => {
      if (!_wallet) {
        connectWithSpecificWallet('issuer', true)
        return
      }

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedRedeemAccount: ''
        })
      )

      setBalance(null)

      if (_wallet.type === 'singleWallet') {
        issuerIsConnected ? disconnectFromSpecificWallet('issuer') : connectWithSpecificWallet('issuer', false)
      }

      if (_wallet.type === 'multiWallet') {
        changeSpecificWallet('issuer', true)
      }
    },
    [
      changeSpecificWallet,
      connectWithSpecificWallet,
      disconnectFromSpecificWallet,
      issuerIsConnected,
      pTokensParams,
      setpTokenParams
    ]
  )

  const onChangeRedeemerConnection = useCallback(
    _wallet => {
      if (!_wallet) {
        connectWithSpecificWallet('redeemer', true)
        return
      }

      setpTokenParams(
        Object.assign({}, pTokensParams, {
          typedIssueAccount: ''
        })
      )

      setBalance(null)

      if (!_wallet) {
        connectWithSpecificWallet('redeemer', true)
        return
      }

      if (_wallet.type === 'singleWallet') {
        if (redeemerIsConnected) {
          disconnectFromSpecificWallet('redeemer')
        } else {
          connectWithSpecificWallet('redeemer', false)
        }
      }

      if (_wallet.type === 'multiWallet') {
        changeSpecificWallet('redeemer', true)
      }
    },
    [
      changeSpecificWallet,
      connectWithSpecificWallet,
      disconnectFromSpecificWallet,
      setpTokenParams,
      pTokensParams,
      redeemerIsConnected
    ]
  )

  return (
    <Settings
      onChangeIssuerConnection={onChangeIssuerConnection}
      onChangeRedeemerConnection={onChangeRedeemerConnection}
      {..._props}
    />
  )
}

Settings.propTypes = {
  pTokenSelected: PropTypes.object,
  pTokensParams: PropTypes.object,
  issuerIsConnected: PropTypes.bool,
  issuerProvider: PropTypes.object,
  issuerAccount: PropTypes.string,
  redeemerIsConnected: PropTypes.bool,
  redeemerProvider: PropTypes.object,
  redeemerAccount: PropTypes.string,
  issuerWallet: PropTypes.object,
  redeemerNetwork: PropTypes.string,
  connectWithSpecificWallet: PropTypes.func,
  disconnectFromSpecificWallet: PropTypes.func,
  changeSpecificWallet: PropTypes.func,
  setpTokenParams: PropTypes.func,
  setBalance: PropTypes.func,
  getBalance: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsController)
