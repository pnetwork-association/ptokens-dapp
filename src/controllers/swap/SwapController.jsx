import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swap from '../../components/swap/Swap'
import { useAssets } from '../../hooks/use-assets'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const SwapController = _props => {
  const [assets] = useAssets(_props.assets)
  return <Swap {..._props} assets={assets} />
}

SwapController.propTypes = {
  assets: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapController)
