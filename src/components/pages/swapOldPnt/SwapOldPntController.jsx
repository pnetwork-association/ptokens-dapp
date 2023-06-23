import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { updateInfoModal } from '../../../store/pages/pages.actions'
import { resetProgress, updateSwapButton } from '../../../store/swap/swap.actions'
import { swap } from '../../../store/swap-old-pnt/swap-old-pnt.actions'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'

import SwapOldPnt from './SwapOldPnt'

const mapStateToProps = (_state) => {
  return {
    assets: _state.swapOldPnt.assets,
    wallets: _state.wallets,
    progress: _state.swap.progress,
    swapButton: _state.swap.swapButton,
    infoModal: _state.pages.infoModal,
  }
}

const mapDispatchToProps = (_dispatch) => {
  return {
    connectWithWallet: (_blockchain) => _dispatch(connectWithWallet(_blockchain)),
    swap: (_amount, _address) => _dispatch(swap(_amount, _address)),
    resetProgress: () => _dispatch(resetProgress()),
    updateSwapButton: (_text, _disabled) => _dispatch(updateSwapButton(_text, _disabled)),
    hideInfoModal: () => _dispatch(updateInfoModal({ show: false, message: null })),
  }
}

const SwapOldPntController = (_props) => <SwapOldPnt {..._props} />

SwapOldPntController.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapOldPntController)
