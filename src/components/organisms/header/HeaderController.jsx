import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import PropTypes from 'prop-types'
import { connectWithWallet, disconnectFromWallet } from '../../../store/wallets/wallets.actions'
import { selectPage } from '../../../store/pages/pages.actions'

const mapStateToProps = _state => {
  return {
    selectedPage: _state.pages.selectedPage,
    wallets: _state.wallets
  }
}
const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain)),
    disconnectFromWallet: _blockchain => _dispatch(disconnectFromWallet(_blockchain)),
    selectPage: _page => _dispatch(selectPage(_page))
  }
}

const HeaderController = _props => {
  return <Header {..._props} />
}

HeaderController.propTypes = {
  wallets: PropTypes.object.isRequired,
  selectedPage: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  disconnectFromWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderController)
