import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../utils/Button'

const MultiWallet = props => {
  return(
    <Button text={
        props.isConnected
        ? 'CHANGE' 
        : 'CONNECT'
      }
      onClick={() => props.onChange()}/>
  )
}

MultiWallet.propTypes = {
  isConnected: PropTypes.bool,
  onChange: PropTypes.func
}

export default MultiWallet