import React from 'react'
import PropTypes from 'prop-types'

const NodeDetector = props => {
  return (
    <React.Fragment>
      {props.pTokenSelected.nodeInfo.isManuallySelected ? (
        <React.Fragment>
          <div
            className={'node-detector-container ' + (props.pTokenSelected.nodeInfo.isCompatible ? 'success' : 'danger')}
          >
            {props.pTokenSelected.nodeInfo.isCompatible
              ? `Connected to: ${props.pTokenSelected.nodeInfo.endpoint}`
              : null + !props.pTokenSelected.nodeInfo.contractAddress
              ? `${props.pTokenSelected.nodeInfo.endpoint} not reachable`
              : null + props.pTokenSelected.nodeInfo.endpoint && !props.pTokenSelected.nodeInfo.isCompatible
              ? `${props.pTokenSelected.nodeInfo.endpoint} not compatible with the selected pToken`
              : null}
          </div>
          <div style={{ height: 20 }} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  )
}

NodeDetector.propTypes = {
  pTokenSelected: PropTypes.object
}
export default NodeDetector
