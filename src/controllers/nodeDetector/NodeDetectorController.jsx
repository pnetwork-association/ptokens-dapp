import React from 'react'
import NodeDetector from '../../components/nodeDetector/NodeDetector'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected
  }
}

class NodeDetectrorController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  render() {
    return <NodeDetector pTokenSelected={this.props.pTokenSelected} />
  }
}

NodeDetectrorController.propTypes = {
  pTokenSelected: PropTypes.object
}

export default connect(mapStateToProps, null)(NodeDetectrorController)
