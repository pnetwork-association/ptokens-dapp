import React, { Component } from 'react'
import NetworkDetector from '../../components/networkDetector/NetworkDetector'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { detectNetwork } from '../../actions/networkDetector'
import { getNetworkCorrectness } from '../../utils/network-correctness'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    issuerIsConnected: state.wallets.issuerIsConnected,
    issuerProvider: state.wallets.issuerProvider,
    redeemerIsConnected: state.wallets.redeemerIsConnected,
    redeemerProvider: state.wallets.redeemerProvider,
    detectedRedeemerNetwork: state.networkDetector.redeemerNetwork,
    pageSelected: state.sidebar.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    detectNetwork: (_provider, _pTokenName, _role) =>
      dispatch(detectNetwork(_provider, _pTokenName, _role))
  }
}

export class NetworkDetectorController extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      currentDetectedRedeemerNetwork: null,
      isCorrectRedeemerNetwork: null,
      isDetectedRedeemer: false,
      toDetectRedeemer: true,
      currentpTokenName: true,
      currentRedeemerProvider: null
    }
  }

  static getDerivedStateFromProps(_nextProps, _prevState) {
    if (
      _nextProps.redeemerProvider !== _prevState.currentRedeemerProvider &&
      _nextProps.redeemerIsConnected
    ) {
      return {
        toDetectRedeemer: true,
        currentRedeemerProvider: _nextProps.redeemerProvider
      }
    }

    if (
      _nextProps.pTokenSelected.name !== _prevState.currentPtokenName &&
      _nextProps.redeemerIsConnected
    ) {
      return {
        toDetectRedeemer: true,
        isDetectedRedeemer: false,
        currentPtokenName: _nextProps.pTokenSelected.name
      }
    }

    if (
      _nextProps.detectedRedeemerNetwork !==
      _prevState.currentDetectedRedeemerNetwork
    ) {
      return {
        currentDetectedRedeemerNetwork: _nextProps.detectedRedeemerNetwork,
        isCorrectRedeemerNetwork: getNetworkCorrectness(
          _nextProps.pTokenSelected.name,
          _nextProps.detectedRedeemerNetwork,
          'redeemer'
        )
      }
    }

    if (
      (_nextProps.pTokenSelected.name === 'pEOS' ||
        _nextProps.pTokenSelected.name === 'pBTC') &&
      _nextProps.redeemerIsConnected &&
      _nextProps.redeemerProvider &&
      !_prevState.isDetectedRedeemer
    ) {
      return {
        toDetectRedeemer: true
      }
    }
    return null
  }

  componentDidUpdate(_nextProps, _prevState) {
    if (this.state.toDetectRedeemer) {
      this.props.detectNetwork(
        this.props.redeemerProvider,
        this.props.pTokenSelected,
        'redeemer'
      )

      this.setState({
        isDetectedRedeemer: true,
        toDetectRedeemer: false,
        currentDetectedRedeemerNetwork: null
      })
    }
  }

  render() {
    return (
      <NetworkDetector
        showIn={[1]} //array of pages where showing the network error (0: main, 1: issue & redeem, 2:enclave 3:settings)
        currentPage={this.props.pageSelected}
        pTokenSelected={this.props.pTokenSelected}
        isCorrectRedeemerNetwork={this.state.isCorrectRedeemerNetwork}
        currentDetectedRedeemerNetwork={
          this.state.currentDetectedRedeemerNetwork
        }
      />
    )
  }
}

NetworkDetectorController.propTypes = {
  pTokenSelected: PropTypes.object,
  issuerIsConnected: PropTypes.bool,
  issuerProvider: PropTypes.object,
  redeemerIsConnected: PropTypes.bool,
  redeemerProvider: PropTypes.object,
  detectedRedeemerNetwork: PropTypes.string,
  pageSelected: PropTypes.number,
  detectNetwork: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkDetectorController)
