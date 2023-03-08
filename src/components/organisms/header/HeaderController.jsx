import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import PropTypes from 'prop-types'
import { connectWithWallet, disconnectFromWallet } from '../../../store/wallets/wallets.actions'
import { selectPage, setTheme } from '../../../store/pages/pages.actions'
import { loadSwapData } from '../../../store/swap/swap.actions'

const mapStateToProps = _state => {
  return {
    selectedPage: _state.pages.selectedPage,
    wallets: _state.wallets,
    theme: _state.pages.theme
  }
}
const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain)),
    disconnectFromWallet: _blockchain => _dispatch(disconnectFromWallet(_blockchain)),
    selectPage: _page => _dispatch(selectPage(_page)),
    setTheme: _theme => _dispatch(setTheme(_theme)),
    loadSwapData: _opts => _dispatch(loadSwapData(_opts))
  }
}

const HeaderController = _props => {
  return <Header {..._props} />
}

HeaderController.propTypes = {
  wallets: PropTypes.object.isRequired,
  selectedPage: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  disconnectFromWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  loadSwapData: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderController)
