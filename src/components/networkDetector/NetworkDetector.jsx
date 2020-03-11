import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../utils/Alert'

const networkTextToShow = {
  kovan: 'Kovan Test Network',
  ropsten: 'Ropsten Test Network',
  mainnet: 'Main Ethereum Network',
  goerly: 'Goerly Test Network',
  rinkeby: 'Rinkeby Test Network',
  testnet: 'Ropsten Test Network'
}

const networkToType = {
  kovan: 'testnet',
  ropsten: 'testnet',
  mainnet: 'mainnet',
  goerly: 'testnet',
  rinkeby: 'testnet'
}

const NetworkDetector = props => {
  return (
    <React.Fragment>
      {props.pTokenSelected.network !==
        networkToType[props.currentDetectedRedeemerNetwork] &&
      props.currentDetectedRedeemerNetwork ? (
        <div className="container-fluid mt-3">
          <Alert
            type={'danger'}
            text={`
                The current provider (${
                  networkTextToShow[props.currentDetectedRedeemerNetwork]
                })
                does not match the current selected network (${props.pTokenSelected.network
                  .substr(0, 1)
                  .toUpperCase() +
                  props.pTokenSelected.network.substr(
                    1,
                    props.pTokenSelected.network.length - 1
                  )}).
                ${
                  props.pTokenSelected.network === 'testnet'
                    ? props.pTokenSelected.name +
                      ' is Available only on Ropsten Test Network'
                    : ''
                }`}
          />
        </div>
      ) : props.isCorrectRedeemerNetwork === false &&
        props.showIn.includes(props.currentPage) ? (
        <div className="container-fluid mt-3">
          <Alert
            type={'danger'}
            text={`${props.pTokenSelected.name} is not available on ${
              networkTextToShow[props.currentDetectedRedeemerNetwork]
            }. 
                    Please use ${
                      networkTextToShow[props.pTokenSelected.network]
                    }`}
          />
        </div>
      ) : null}
    </React.Fragment>
  )
}

NetworkDetector.propTypes = {
  pTokenSelected: PropTypes.object,
  isCorrectRedeemerNetwork: PropTypes.bool,
  currentDetectedRedeemerNetwork: PropTypes.string
}
export default NetworkDetector
