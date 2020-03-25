import React from 'react'
import PropTypes from 'prop-types'
import NotificationAlert from 'react-notification-alert'
import PNetwork from '../../components/pNetwork/pNetwork'
import {
  ping,
  getLastProcessedBlock,
  submitBlock,
  resetSubmitBlockSuccess
} from '../../actions/pNetwork'
import { getTotalSupply } from '../../actions/pTokens'
import { connect } from 'react-redux'
import { isJsonString } from '../../utils/utils'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import settings from '../../settings'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    isActive: state.pNetwork.isActive,
    lastIssuerProcessedBlock: state.pNetwork.lastIssuerProcessedBlock,
    lastRedeemerProcessedBlock: state.pNetwork.lastRedeemerProcessedBlock,
    isBlockSubmissionSucceeded: state.pNetwork.isBlockSubmissionSucceeded,
    issuerBlockHeightStatus: state.pNetwork.issuerBlockHeightStatus,
    redeemerBlockHeightStatus: state.pNetwork.redeemerBlockHeightStatus,
    redeemerReadOnlyProvider: state.wallets.redeemerReadOnlyProvider
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ping: _pToken => dispatch(ping(_pToken)),
    getLastProcessedBlock: (_pToken, _type, _role) =>
      dispatch(getLastProcessedBlock(_pToken, _type, _role)),
    submitBlock: (_pToken, _type, _block) =>
      dispatch(submitBlock(_pToken, _type, _block)),
    resetSubmitBlockSuccess: () => dispatch(resetSubmitBlockSuccess()),
    getTotalSupply: (_pToken, _configs) =>
      dispatch(getTotalSupply(_pToken, _configs))
  }
}

class pNetworkController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      blockType: null,
      blockData: '',
      isBlockSubmissionEnd: false,
      redeemerDataLoaded: false,
      isBlockSubmissionTerminated: false
    }

    this.props.ping(this.props.pTokenSelected)
    this.props.getLastProcessedBlock(
      this.props.pTokenSelected,
      'native',
      'issuer'
    )
    this.props.getLastProcessedBlock(
      this.props.pTokenSelected,
      'host',
      'redeemer'
    )

    this.intervalIssuerBlockGetter = setInterval(() => {
      this.props.getLastProcessedBlock(
        this.props.pTokenSelected,
        'native',
        'issuer'
      )
    }, settings[this.props.pTokenSelected.id][this.props.pTokenSelected.issueFrom.toLowerCase()].enclaveBlockHeightPollingTime)

    this.intervalRedeemerBlockGetter = setInterval(() => {
      this.props.getLastProcessedBlock(
        this.props.pTokenSelected,
        'host',
        'redeemer'
      )
    }, settings[this.props.pTokenSelected.id][this.props.pTokenSelected.redeemFrom.toLowerCase()].enclaveBlockHeightPollingTime)
  }

  static getDerivedStateFromProps(props, prevState) {
    if (
      props.isBlockSubmissionSucceeded === true &&
      !prevState.isBlockSubmissionTerminated
    ) {
      return {
        isBlockSubmissionTerminated: true
      }
    }
    return null
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (
      (!_prevProps.redeemerReadOnlyProvider &&
        this.props.redeemerReadOnlyProvider) ||
      !this.state.redeemerDataLoaded
    ) {
      const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
        this.props.pTokenSelected
      )

      const configs = {
        issuer: null,
        redeemer: redeemerReadOnlyProvider
      }

      this.props.getTotalSupply(this.props.pTokenSelected, configs)

      this.setState({
        redeemerDataLoaded: true,
        canSubmit: false,
        blockData: '',
        blockType: null
      })
    }

    if (
      this.props.isBlockSubmissionSucceeded &&
      this.state.isBlockSubmissionTerminated &&
      !_prevState.isBlockSubmissionTerminated
    ) {
      this.setState({
        isBlockSubmissionTerminated: false,
        blockData: '',
        blockType: null
      })
      this.props.resetSubmitBlockSuccess()
      this.showAlert('success', 'Block submitted succesfully')
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalIssuerBlockGetter)
    clearInterval(this.intervalRedeemerBlockGetter)
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

  handleChangeBlockType = _blockType => {
    this.setState({
      blockType: _blockType
    })
    this.canSubmit(_blockType, this.state.blockData)
  }

  handleBlockData = _blockData => {
    this.setState({
      blockData: _blockData
    })
    this.canSubmit(this.state.blockType, _blockData)
  }

  canSubmit = (_blockType, _blockData) => {
    if (_blockData !== '' && _blockType) {
      this.setState({
        canSubmit: true
      })
    } else {
      this.setState({
        canSubmit: false
      })
    }
  }

  onSubmit = () => {
    if (!isJsonString(this.state.blockData)) {
      this.showAlert('danger', 'Please insert a valid JSON string')
      return
    }

    this.props.submitBlock(
      this.props.pTokenSelected,
      this.state.blockType === 'issuerBlock' ? 'native' : 'host',
      this.state.blockData
    )
  }

  render() {
    return (
      <React.Fragment>
        <PNetwork
          pTokenSelected={this.props.pTokenSelected}
          isActive={this.props.isActive}
          lastIssuerProcessedBlock={this.props.lastIssuerProcessedBlock}
          lastRedeemerProcessedBlock={this.props.lastRedeemerProcessedBlock}
          blockType={this.state.blockType}
          blockData={this.state.blockData}
          canSubmit={this.state.canSubmit}
          issuerBlockHeightStatus={this.props.issuerBlockHeightStatus}
          redeemerBlockHeightStatus={this.props.redeemerBlockHeightStatus}
          onChangeBlockType={this.handleChangeBlockType}
          onChangeBlockData={this.handleBlockData}
          onSubmit={this.onSubmit}
        />
        <NotificationAlert ref="notify" />
      </React.Fragment>
    )
  }
}

pNetworkController.propTypes = {
  pTokenSelected: PropTypes.object,
  isActive: PropTypes.bool,
  lastIssuerProcessedBlock: PropTypes.number,
  lastRedeemerProcessedBlock: PropTypes.number,
  isBlockSubmissionSucceeded: PropTypes.bool,
  issuerBlockHeightStatus: PropTypes.number,
  redeemerBlockHeightStatus: PropTypes.number,
  redeemerReadOnlyProvider: PropTypes.object,
  ping: PropTypes.func,
  getLastProcessedBlock: PropTypes.func,
  submitBlock: PropTypes.func,
  resetSubmitBlockSuccess: PropTypes.func,
  getMintNonce: PropTypes.func,
  getBurnNonce: PropTypes.func,
  getTotalIssued: PropTypes.func,
  getTotalRedeemed: PropTypes.func,
  getTotalSupply: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(pNetworkController)