import React from 'react'
import PropTypes from 'prop-types'

const widths = {
  140: 'btn-width-140',
  280: 'btn-width-280'
}

const Button = props => {
  return (
    <button
      onClick={e => props.onClick(e)}
      type="button"
      className={`btn btn-primary font-weight-light ${
        widths[props.width]
      } text-center`}
      disabled={props.disabled}
    >
      <i className={`icon ${props.icon}`} />
      <span className={`${props.icon ? 'ml-10' : ''} vertical-align-middle`}>
        {props.text}
      </span>
    </button>
  )
}

Button.propTypes = {
  width: PropTypes.number,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string
}

export default Button
