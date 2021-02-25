import React from 'react'
import PropTypes from 'prop-types'
import PNetwork from '../../components/pNetwork/pNetwork'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    isActive: state.pNetwork.isActive,
    lastIssuerProcessedBlock: state.pNetwork.lastIssuerProcessedBlock,
    lastRedeemerProcessedBlock: state.pNetwork.lastRedeemerProcessedBlock,
    issuerBlockHeightStatus: state.pNetwork.issuerBlockHeightStatus,
    redeemerBlockHeightStatus: state.pNetwork.redeemerBlockHeightStatus,
    validators: state.pNetwork.validators
  }
}

const pNetworkController = _props => <PNetwork {..._props} />

pNetworkController.propTypes = {
  pTokenSelected: PropTypes.object,
  isActive: PropTypes.bool,
  lastIssuerProcessedBlock: PropTypes.number,
  lastRedeemerProcessedBlock: PropTypes.number,
  issuerBlockHeightStatus: PropTypes.number,
  redeemerBlockHeightStatus: PropTypes.number,
  validators: PropTypes.array
}

export default connect(mapStateToProps, null)(pNetworkController)
