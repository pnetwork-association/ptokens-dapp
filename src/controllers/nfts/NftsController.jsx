import React from 'react'
import { connect } from 'react-redux'
import Nfts from '../../components/nfts/Nfts'
import PropTypes from 'prop-types'

const mapStateToProps = _state => {
  return {
    nfts: _state.nfts.all
  }
}
const mapDispatchToProps = _dispatch => {
  return {}
}

const NftsController = _props => {
  return <Nfts {..._props} />
}

NftsController.propTypes = {
  nfts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NftsController)
