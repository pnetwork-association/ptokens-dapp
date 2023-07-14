import PropTypes from 'prop-types'
import { Blockchain } from 'ptokens-constants'
import { connect } from 'react-redux'

import { AppDispatch, RootState } from '../../../store'
import { selectPage, setTheme } from '../../../store/pages/pages.actions'
import { LoadSwapDataOpts, loadSwapData } from '../../../store/swap/swap.actions'
import { connectWithWallet, disconnectFromWallet } from '../../../store/wallets/wallets.actions'
import { Wallets } from '../../../store/wallets/wallets.reducer'

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

type HeaderControllerProps = {
  wallets: Wallets
  selectedPage: string
  theme: string
  connectWithWallet: (_blockchain: Blockchain) => void
  disconnectFromWallet: (_blockchain: Blockchain) => void
  loadSwapData: (opts: LoadSwapDataOpts) => Promise<void>
  selectPage: (page: string) => void
  setTheme: (theme: string) => void
}

const HeaderController = (_props: HeaderControllerProps) => {
  return <Header {..._props} />
}

HeaderController.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  disconnectFromWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  loadSwapData: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderController)
