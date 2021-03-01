import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Main from '../../components/main/Main'
import { ping, getReports } from '../../actions/pNetwork'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    redeemerReadOnlyProvider: state.wallets.redeemerReadOnlyProvider,
    issueReports: state.pNetwork.issueReports,
    redeemReports: state.pNetwork.redeemReports,
    isActive: state.pNetwork.isActive
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    ping: () => _dispatch(ping()),
    getReports: (_nodeInfo, _type, _actor) => _dispatch(getReports(_nodeInfo, _type, _actor))
  }
}

export const MainController = _props => {
  const { pTokenSelected, ping, getReports } = _props

  useEffect(() => {
    ping()
    getReports(pTokenSelected.nodeInfo, 'native', 'redeemer')
    getReports(pTokenSelected.nodeInfo, 'host', 'issuer')
  }, [pTokenSelected.nodeInfo, ping, getReports])

  return <Main {..._props} />
}

MainController.propTypes = {
  pTokenSelected: PropTypes.object,
  redeemerReadOnlyProvider: PropTypes.object,
  issueReports: PropTypes.array,
  redeemReports: PropTypes.array,
  isActive: PropTypes.bool,
  ping: PropTypes.func,
  getReports: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MainController)
