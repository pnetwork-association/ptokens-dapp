import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../utils/Alert'

const NodeDetector = props => {
  return (
    <div className="container-fluid mt-3">
      {props.pTokenSelected.nodeInfo.isManuallySelected ? (
        <Alert
          type={
            props.pTokenSelected.nodeInfo.isCompatible ? 'success' : 'danger'
          }
          text={
            props.pTokenSelected.nodeInfo.isCompatible
              ? `Connected to: ${props.pTokenSelected.nodeInfo.endpoint}`
              : null + !props.pTokenSelected.nodeInfo.contractAddress
              ? `${props.pTokenSelected.nodeInfo.endpoint} not reachable`
              : null + props.pTokenSelected.nodeInfo.endpoint &&
                !props.pTokenSelected.nodeInfo.isCompatible
              ? `${props.pTokenSelected.nodeInfo.endpoint} not compatible with the selected pToken`
              : null
          }
        />
      ) : null}
    </div>
  )
}

NodeDetector.propTypes = {
  pTokenSelected: PropTypes.object
}
export default NodeDetector
