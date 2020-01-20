import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

const inputTextSizes = {
  small: 'text-sm',
  xxlarg: 'text-xxl'
}

const Input = props => {

  let input = null

  const [inputIsClicked, setInputIsClicked] = useState(0)

  return (
    <Fragment>
      <div onClick={() => {
        setInputIsClicked(true)
        input.focus()
      }}
        className="row mt-5 bg-white ml-0 mr-0 mb-5 cursor-text">
        <div className={'col-5 col-md-3 mt-15 ' + (props.size === 'small' ? 'mb-15' : '')}>
          <div className="row">
            <div className="col-12 text-xxs text-gray font-weight-light mt-2">
              {props.label}
            </div>
          </div>
          {
            props.miniLabel
              ? <div className="row">
                <div className="col-12 text-xxs text-primary mt-5 mb-15">
                  {props.miniLabel}
                </div>
              </div>
              : null
          }
        </div>
        <div className="col-7 col-md-9 text-right text-xxs font-weight-light my-auto">
          <input ref={ref => input = ref}
            value={props.value}
            onChange={e => props.onChange(e)}
            className={`form-control text-xxl caret-primary ${inputTextSizes[props.size]}`} placeholder="" type="text" />
        </div>
      </div>
      {
        inputIsClicked
          ? props.children
          : null
      }
    </Fragment>
  )
}

Input.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  miniLabel: PropTypes.string,
  onChange: PropTypes.func
}

export default Input