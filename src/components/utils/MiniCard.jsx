import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../utils/Spinner'

const colors = {
  green: 'text-green',
  red: 'text-red',
  yellow: 'text-yellow',
  orange: 'text-orange',
  gray: 'text-gray'
}

const MiniCard = props => {
  return (
    <div className="card bg-gray">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 text-xxs text-gray line-height-1 font-weight-light">
                {props.title}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className={`text-gray text-xxl line-height-1 font-weight-light mt-10 ${props.textColor ? colors[props.textColor] : ''}`}>
                  {
                    props.icon
                      ? <i className={`icon mr-10 mb-5 ${props.icon}`} />
                      : null
                  }
                  {
                    props.value
                      ? props.value
                      : '-'
                  }
                  <span className="text-gray">
                    {
                      props.description
                        ? ` ${props.description}`
                        : null
                    }
                  </span>
                  <span className="text-md text-gray">
                    {
                      props.value
                        ? ` ${props.measure}`
                        : null
                    }
                  </span>
                  {
                    props.value && props.withSpinner
                      ? <Spinner />
                      : null
                  }
                </div>
              </div>
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
  measure: PropTypes.string,
  textColor: PropTypes.string,
  icon: PropTypes.string,
  withSpinner: PropTypes.bool,
  description: PropTypes.string
}

export default MiniCard