import { Blockchain } from 'ptokens-constants'
import { connect } from 'react-redux'

import { AppDispatch, RootState } from '../../../store'
import { selectPage, setTheme } from '../../../store/pages/pages.actions'
import { LoadSwapDataOpts, loadSwapData } from '../../../store/swap/swap.actions'
import { connectWithWallet, disconnectFromWallet } from '../../../store/wallets/wallets.actions'

import Header from './Header'

const mapStateToProps = (_state: RootState) => {
  return {
    wallets: _state.wallets,
    selectedPage: _state.pages.selectedPage,
    theme: _state.pages.theme,
  }
}
const mapDispatchToProps = (_dispatch: AppDispatch) => {
  return {
    connectWithWallet: (_blockchain: Blockchain) => _dispatch(connectWithWallet(_blockchain)),
    disconnectFromWallet: (_blockchain: Blockchain) => _dispatch(disconnectFromWallet(_blockchain)),
    selectPage: (_page: string) => _dispatch(selectPage(_page)),
    setTheme: (_theme: string) => _dispatch(setTheme(_theme)),
    loadSwapData: (_opts: LoadSwapDataOpts) => _dispatch(loadSwapData(_opts)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
