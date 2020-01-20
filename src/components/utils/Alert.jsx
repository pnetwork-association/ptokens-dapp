import React from 'react'
import PropTypes from 'prop-types'

const sizes = {
  exsmall: 'text-xs',
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg'
}

const Alert = props => {
  return (
    <div className={`alert alert-${props.type} ${sizes[props.size]}`} role="alert">
      {props.text}
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string
}

export default Alert