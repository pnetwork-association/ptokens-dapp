import React from 'react'
import PropTypes from 'prop-types'

const widths = {
  140: 'btn-width-140',
  280: 'btn-width-280'
}

const Button = _props => {
  const { width, icon, text, disabled } = _props

  return (
    <button
      onClick={e => _props.onClick(e)}
      type="button"
      className={`btn btn-primary font-weight-light ${widths[width]} text-center`}
      disabled={disabled}
    >
      <i className={`icon ${icon}`} />
      <span className={`${icon ? 'ml-10' : ''} vertical-align-middle`}>{text}</span>
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
