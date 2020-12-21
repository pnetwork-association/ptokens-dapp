import React from 'react'
import PropTypes from 'prop-types'
import Toogle from '../../utils/Toogle'

const SingleWallet = props => {
  return (
    <React.Fragment>
      <div
        className={
          'text-xxs font-weigth-light mr-10 my-auto d-none d-sm-block ' +
          (!props.isConnected ? 'text-gray' : 'text-super-light-gray')
        }
      >
        DEACTIVATED
      </div>
      <Toogle value={props.isConnected ? props.isConnected : false} onChange={() => props.onChange()} />
      <div
        className={
          'text-xxs font-weigth-light ml-10 my-auto d-none d-sm-block ' +
          (props.isConnected ? 'text-gray' : 'text-super-light-gray')
        }
      >
        ACTIVATED
      </div>
    </React.Fragment>
  )
}

SingleWallet.propTypes = {
  isConnected: PropTypes.bool,
  onChange: PropTypes.func
}

export default SingleWallet
