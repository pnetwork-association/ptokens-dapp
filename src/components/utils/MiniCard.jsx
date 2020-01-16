import React from 'react'
import PropTypes from 'prop-types'

const MiniCard = props => {
  return (
    <div className="card bg-gray">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="text-xxs text-gray line-height-1 font-weight-light">
              {props.title}
            </div>
            <div className="text-gray text-xxl line-height-1 font-weight-light mt-10">
              {
                props.value
                  ? props.value
                  : '-'
              }
              <span className="text-md">
                {
                  props.value
                    ? ` ${props.measure}`
                    : null
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MiniCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  measure: PropTypes.string
}

export default MiniCard