import React from 'react'
import { connect } from 'react-redux'
import Nfts from '../../components/nfts/Nfts'
import PropTypes from 'prop-types'
import { selectPage } from '../../store/pages/pages.actions'

const mapStateToProps = _state => {
  return {
    selectedPage: _state.pages.selectedPage
  }
}
const mapDispatchToProps = _dispatch => {
  return {
    selectPage: _page => _dispatch(selectPage(_page))
  }
}

const NftsController = _props => {
  return <Nfts {..._props} />
}

NftsController.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  selectPage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NftsController)
