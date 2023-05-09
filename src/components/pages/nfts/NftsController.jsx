import React from 'react'
import { connect } from 'react-redux'
import Nfts from './Nfts'
import PropTypes from 'prop-types'
import { move } from '../../../store/nfts/nfts.actions'

const mapStateToProps = (_state) => {
  return {
    nfts: _state.nfts.all,
    wallets: _state.wallets,
    loading: _state.pages.loading,
  }
}
const mapDispatchToProps = (_dispatch) => {
  return {
    move: (_nft, _blockchain, _account, _amount) => _dispatch(move(_nft, _blockchain, _account, _amount)),
  }
}

const NftsController = (_props) => <Nfts {..._props} />

NftsController.propTypes = {
  nfts: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  move: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NftsController)
