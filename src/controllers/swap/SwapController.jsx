import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from '../../components/swap/Swap'
import swapAssets from '../../settings/swap-assets'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const SwapController = _props => {
  const { assets } = _props

  return <Swap {..._props} assets={assets} />
}

SwapController.propTypes = {
  assets: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
