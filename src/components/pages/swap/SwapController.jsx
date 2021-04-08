import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from './Swap'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'
import {
  hideDepositAddressModal,
  swap,
  resetProgress,
  hideInfoModal,
  updateSwapButton
} from '../../../store/swap/swap.actions'

const mapStateToProps = _state => {
  return {
    assets: _state.swap.assets,
    wallets: _state.wallets,
    depositAddressModal: _state.swap.depositAddressModal,
    progress: _state.swap.progress,
    infoModal: _state.swap.infoModal,
    swapButton: _state.swap.swapButton
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain)),
    hideDepositAddressModal: () => _dispatch(hideDepositAddressModal()),
    swap: (_from, _to, _amount, _address) => _dispatch(swap(_from, _to, _amount, _address)),
    resetProgress: () => _dispatch(resetProgress()),
    hideInfoModal: () => _dispatch(hideInfoModal()),
    updateSwapButton: (_text, _disabled) => _dispatch(updateSwapButton(_text, _disabled))
  }
}

const SwapController = _props => <Swap {..._props} />

SwapController.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  depositAddressModal: PropTypes.object,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  hideDepositAddressModal: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
