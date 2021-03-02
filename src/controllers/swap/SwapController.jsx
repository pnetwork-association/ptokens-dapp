import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from '../../components/swap/Swap'
import { useAssets } from '../../hooks/use-assets'
import { connectWithWallet } from '../../actions/wallets'

const mapStateToProps = _state => {
  return {
    assets: _state.swap.assets,
    wallets: _state.wallets
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain))
  }
}

const SwapController = _props => {
  const [assets] = useAssets(_props.assets)
  return <Swap {..._props} assets={assets} />
}

SwapController.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  connectWithWallet: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
