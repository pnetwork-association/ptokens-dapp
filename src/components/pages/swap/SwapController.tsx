import PropTypes from 'prop-types'
import { Blockchain } from 'ptokens-constants'
import React from 'react'
import { connect } from 'react-redux'

import { Asset, UpdatedAsset } from '../../../settings/swap-assets'
import { AppDispatch, RootState } from '../../../store'
import { updateInfoModal, selectPage } from '../../../store/pages/pages.actions'
import { swap, resetProgress, updateSwapButton } from '../../../store/swap/swap.actions'
import { AssetWithAddress, IBpm } from '../../../store/swap/swap.reducer'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'
import { Wallets } from '../../../store/wallets/wallets.reducer'

import Swap from './Swap'

const mapStateToProps = (_state: RootState) => {
  return {
    assets: _state.swap.assets,
    bpm: _state.swap.bpm,
    wallets: _state.wallets,
    progress: _state.swap.progress,
    swapButton: _state.swap.swapButton,
    infoModal: _state.pages.infoModal,
  }
}

const mapDispatchToProps = (_dispatch: AppDispatch) => {
  return {
    connectWithWallet: (_blockchain: Blockchain) => _dispatch(connectWithWallet(_blockchain)),
    swap: (_from: Asset, _to: Asset, _amount: string, _address: string) =>
      _dispatch(swap(_from, _to, _amount, _address)),
    resetProgress: () => _dispatch(resetProgress()),
    updateSwapButton: (_text: string, _disabled: boolean, _link: string) =>
      _dispatch(updateSwapButton(_text, _disabled, _link)),
    hideInfoModal: () => _dispatch(updateInfoModal({ show: false, message: null })),
    selectPage: (_page: string) => _dispatch(selectPage(_page)),
  }
}

type SwapControllerProps = {
  assets: AssetWithAddress[]
  bpm: IBpm
  wallets: Wallets
}

const SwapController = (_props: SwapControllerProps) => <Swap {..._props} />

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
