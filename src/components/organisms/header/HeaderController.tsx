import PropTypes from 'prop-types'
import { Blockchain } from 'ptokens-constants'
import React from 'react'
import { connect, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../store'
import { selectPage, setTheme } from '../../../store/pages/pages.actions'
import { loadSwapData } from '../../../store/swap/swap.actions'
import { connectWithWallet, disconnectFromWallet } from '../../../store/wallets/wallets.actions'

import Header from './Header'

const mapStateToProps = (_state) => {
  return {
    selectedPage: _state.pages.selectedPage,
    theme: _state.pages.theme,
  }
}
const mapDispatchToProps = (_dispatch: AppDispatch) => {
  return {
    connectWithWallet: (_blockchain: Blockchain) => _dispatch(connectWithWallet(_blockchain)),
    disconnectFromWallet: (_blockchain) => _dispatch(disconnectFromWallet(_blockchain)),
    selectPage: (_page) => _dispatch(selectPage(_page)),
    setTheme: (_theme) => _dispatch(setTheme(_theme)),
    loadSwapData: (_opts) => _dispatch(loadSwapData(_opts)),
  }
}

const HeaderController = (_props) => {
  const wallets = useSelector((_state: RootState) => _state.wallets)
  return <Header {..._props} wallets={wallets} />
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
