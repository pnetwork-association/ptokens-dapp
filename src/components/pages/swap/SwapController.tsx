import { Blockchain } from 'ptokens-constants'
import { connect } from 'react-redux'

import { Asset } from '../../../settings/swap-assets'
import { AppDispatch, RootState } from '../../../store'
import { updateInfoModal, selectPage } from '../../../store/pages/pages.actions'
import { swap, resetProgress, updateSwapButton } from '../../../store/swap/swap.actions'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'

import Swap from './Swap'

const mapStateToProps = (_state: RootState) => {
  return {
    assets: _state.swap.assets,
    bpm: _state.swap.bpm,
    wallets: _state.wallets,
    infoModal: _state.pages.infoModal,
    swapButton: _state.swap.swapButton,
    progress: _state.swap.progress,
  }
}

const mapDispatchToProps = (_dispatch: AppDispatch) => {
  return {
    connectWithWallet: (_blockchain: Blockchain) => _dispatch(connectWithWallet(_blockchain)),
    swap: (_from: Asset, _to: Asset, _amount: string, _address: string) =>
      _dispatch(swap(_from, _to, _amount, _address)),
    resetProgress: () => _dispatch(resetProgress()),
    hideInfoModal: () =>
      _dispatch(updateInfoModal({ show: false, text: null, showMoreLabel: null, showMoreText: null, message: null })),
    updateSwapButton: (_text: string, _disabled?: boolean, _link?: string | null) =>
      _dispatch(updateSwapButton(_text, _disabled, _link)),
    selectPage: (_page: string) => _dispatch(selectPage(_page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
