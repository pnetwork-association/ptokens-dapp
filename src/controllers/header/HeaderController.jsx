import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header/Header'
import PropTypes from 'prop-types'
import { connectWithWallet } from '../../actions/wallets'

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain))
  }
}

const HeaderController = _props => {
  return <Header {..._props} />
}

HeaderController.propTypes = {
  connectWithWallet: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderController)
