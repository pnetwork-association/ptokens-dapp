import React from 'react'
import PropTypes from 'prop-types'

const Toogle = props => {
  return (
    <React.Fragment>
      <input
        className="hidden-input input-toogle"
        checked={props.value}
        onChange={() => props.onChange()}
        type="checkbox"
        id="switch"
      />
      <label className="label-toggle m-0" htmlFor="switch" />
    </React.Fragment>
  )
}

Toogle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
}

export default Toogle
