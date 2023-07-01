import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { updateInfoModal, selectPage } from '../../../store/pages/pages.actions'
import { swap, resetProgress, updateSwapButton } from '../../../store/swap/swap.actions'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'

import Swap from './Swap'

const mapStateToProps = (_state) => {
  return {
    assets: _state.swap.assets,
    bpm: _state.swap.bpm,
    wallets: _state.wallets,
    progress: _state.swap.progress,
    swapButton: _state.swap.swapButton,
    infoModal: _state.pages.infoModal,
  }
}

const mapDispatchToProps = (_dispatch) => {
  return {
    connectWithWallet: (_blockchain) => _dispatch(connectWithWallet(_blockchain)),
    swap: (_from, _to, _amount, _address, _options) => _dispatch(swap(_from, _to, _amount, _address, _options)),
    resetProgress: () => _dispatch(resetProgress()),
    updateSwapButton: (_text, _disabled, _link) => _dispatch(updateSwapButton(_text, _disabled, _link)),
    hideInfoModal: () => _dispatch(updateInfoModal({ show: false, message: null })),
    selectPage: (_page) => _dispatch(selectPage(_page)),
  }
}

const SwapController = (_props) => <Swap {..._props} />

SwapController.propTypes = {
  assets: PropTypes.array.isRequired,
  bpm: PropTypes.object.isRequired,
  wallets: PropTypes.object.isRequired,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func,
  selectPage: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
