import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../utils/Spinner'

const BlockHeightCard = props => {
  return (
    <div className="card bg-gray">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="text-xxs text-gray line-height-1 font-weight-light">
              {props.title}
            </div>
            <div className="text-xxl line-height-1 mt-10 font-weight-light">
              <span className={
                'mr-10 ' +
                (props.blockHeightStatus === 1 ? 'text-gray' : '') +
                (props.blockHeightStatus === 2 ? 'text-orange' : '') +
                (props.blockHeightStatus === 3 ? 'text-red' : '')
              }>
                {
                  props.lastProcessedBlock
                    ? props.lastProcessedBlock
                    : '-'
                }
              </span>
              {
                props.lastProcessedBlock
                  ? <Spinner />
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

BlockHeightCard.propTypes = {
  title: PropTypes.string,
  blockHeightStatus: PropTypes.number,
  lastProcessedBlock: PropTypes.number
}

export default BlockHeightCard