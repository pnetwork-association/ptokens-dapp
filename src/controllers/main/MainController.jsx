import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Main from '../../components/main/Main'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    redeemerReadOnlyProvider: state.wallets.redeemerReadOnlyProvider,
    issueReports: state.pNetwork.issueReports,
    redeemReports: state.pNetwork.redeemReports,
    isActive: state.pNetwork.isActive
  }
}

export const MainController = _props => <Main {..._props} />

MainController.propTypes = {
  pTokenSelected: PropTypes.object,
  redeemerReadOnlyProvider: PropTypes.object,
  issueReports: PropTypes.array,
  redeemReports: PropTypes.array,
  isActive: PropTypes.bool
}

export default connect(mapStateToProps, null)(MainController)
