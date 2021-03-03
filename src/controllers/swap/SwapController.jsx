import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from '../../components/swap/Swap'
import { useAssets } from '../../hooks/use-assets'
import { connectWithWallet } from '../../actions/wallets'
import { hideDepositAddressModal, swap } from '../../actions/swap/'

const mapStateToProps = _state => {
  return {
    assets: _state.swap.assets,
    wallets: _state.wallets,
    depositAddressModal: _state.swap.depositAddressModal,
    progress: _state.swap.progress
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain)),
    hideDepositAddressModal: () => _dispatch(hideDepositAddressModal()),
    swap: (_from, _to, _amount, _address) => _dispatch(swap(_from, _to, _amount, _address))
  }
}

const SwapController = _props => {
  const [assets] = useAssets(_props.assets)
  return <Swap {..._props} assets={assets} />
}

SwapController.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  depositAddressModal: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  hideDepositAddressModal: PropTypes.func,
  swap: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
