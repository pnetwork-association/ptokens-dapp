import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

const inputTextSizes = {
  small: 'text-sm',
  xxlarg: 'text-xxl'
}

const Input = props => {
  let input = null
  let inputRef = null

  const [inputIsClicked, setInputIsClicked] = useState(0)

  const handleClickOutside = _event => {
    if (inputRef && !inputRef.contains(_event.target)) {
      setInputIsClicked(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  return (
    <Fragment>
      <div
        ref={ref => (inputRef = ref)}
        onClick={() => {
          setInputIsClicked(true)
          input.focus()
        }}
        className="row mt-5 bg-white ml-0 mr-0 mb-5 cursor-text"
      >
        <div className={'col-3 col-md-3 mt-15 ' + (props.size === 'small' ? 'mb-15' : '')}>
          <div className="row">
            <div className="col-12 text-xxs text-gray font-weight-light mt-2">{props.label}</div>
          </div>
          {props.miniLabel ? (
            <div className="row">
              <div className="col-12 text-xxs text-primary mt-5 mb-15">{props.miniLabel}</div>
            </div>
          ) : null}
        </div>
        <div
          className={
            (props.withButton ? 'col-6 col-md-6 col-lg-7' : 'col-9 col-md-9') +
            ' text-right text-xxs font-weight-light my-auto'
          }
        >
          <input
            ref={ref => (input = ref)}
            value={props.value ? props.value : ''}
            className={`form-control text-xl caret-primary ${inputTextSizes[props.size]}`}
            placeholder=""
            type={props.type ? props.type : 'text'}
            onChange={e => props.onChange(e)}
          />
        </div>
        {props.withButton ? (
          <div className="col-3 col-md-3 col-lg-2 my-auto text-center">
            <button type="button" className="btn btn-outline-primary" onClick={() => props.onClickButton()}>
              {props.textButton}
            </button>
          </div>
        ) : null}
        {props.withSelection &&
        props.options &&
        props.options.length > 0 &&
        props.value.length >= props.showAtCharacter &&
        inputIsClicked ? (
          <div className="col-12 p-0 mt-5">
            <div id="picklist" className="picklist">
              {props.options.map((option, index) => {
                return (
                  <div
                    key={index.toString()}
                    onClick={() => {
                      props.onChangeFromSelection(option)
                      setTimeout(() => {
                        setInputIsClicked(false)
                      }, 200)
                    }}
                    className="picklist-item"
                  >
                    {option}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>

      {inputIsClicked ? props.children : null}
    </Fragment>
  )
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  showAtCharacter: PropTypes.number,
  size: PropTypes.string,
  miniLabel: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default Input
