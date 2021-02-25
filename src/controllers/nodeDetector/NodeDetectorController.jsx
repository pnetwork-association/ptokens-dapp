import React from 'react'
import NodeDetector from '../../components/nodeDetector/NodeDetector'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected
  }
}

const NodeDetectrorController = _props => <NodeDetector {..._props} />

NodeDetectrorController.propTypes = {
  pTokenSelected: PropTypes.object
}

export default connect(mapStateToProps, null)(NodeDetectrorController)
