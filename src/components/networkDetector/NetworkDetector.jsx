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

const networkToType = {
  kovan: 'testnet',
  ropsten: 'testnet',
  mainnet: 'mainnet',
  goerly: 'testnet',
  rinkeby: 'testnet'
}

const NetworkDetector = props => {
  console.log(props.currentDetectedRedeemerNetwork)
  return (
    <React.Fragment>
      {props.pTokenSelected.network !==
      networkToType[props.currentDetectedRedeemerNetwork] ? (
        <div className="container-fluid mt-3">
          <Alert
            type={'danger'}
            text={`
                the current provider network (${
                  networkTextToShow[props.currentDetectedRedeemerNetwork]
                })
                does not match the current selected network (${
                  props.pTokenSelected.network
                }).
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
