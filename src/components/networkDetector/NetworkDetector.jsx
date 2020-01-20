import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../utils/Alert'

const networkTextToShow = {
  kovan: 'Kovan Test Network',
  ropsten: 'Ropsten Test Network',
  mainnet: 'Main Ethereum Network',
  goerly: 'Goerly Test Network',
  rinkeby: 'Rinkeby Test Network'
}

const NetworkDetector = props => {
  return (
    props.isCorrectRedeemerNetwork === false &&
    props.showIn.includes(props.currentPage)
      ? <div className="container-fluid mt-3">
          <Alert type={'danger'}
            text={
              `${props.pTokenSelected.name} is not available on ${networkTextToShow[props.currentDetectedRedeemerNetwork]}. 
              Please use ${networkTextToShow[props.pTokenSelected.network]}`
            }/>
        </div>
      : null
  )
}

NetworkDetector.propTypes = {
  pTokenSelected: PropTypes.object,
  isCorrectRedeemerNetwork: PropTypes.bool,
  currentDetectedRedeemerNetwork: PropTypes.string
}
export default NetworkDetector