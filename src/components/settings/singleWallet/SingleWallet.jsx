import React from 'react'
import PropTypes from 'prop-types'

const SingleWallet = props => {
  return(
    <button className="btn btn-primary h-40" onClick={() => props.onChange()}>
      <span>
        {
          props.isConnected
            ? 'CHANGE' 
            : 'CONNECT'
        }
      </span>
    </button>
  )
}

SingleWallet.propTypes = {
  isConnected: PropTypes.bool,
  onChange: PropTypes.func
}

export default SingleWallet