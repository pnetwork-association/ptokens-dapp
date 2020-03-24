import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Main from '../../components/main/Main'
import { getReports } from '../../actions/pNetwork'
import { getTotalSupply } from '../../actions/pTokens'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    redeemerReadOnlyProvider: state.wallets.redeemerReadOnlyProvider,
    issueReports: state.pNetwork.issueReports,
    redeemReports: state.pNetwork.redeemReports,
    isActive: state.pNetwork.isActive
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTotalSupply: (_pToken, configs) =>
      dispatch(getTotalSupply(_pToken, configs)),
    getReports: (_pToken, _type, role) =>
      dispatch(getReports(_pToken, _type, role))
  }
}

export class MainController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      redeemerDataLoaded: null
    }

    this.props.getReports(this.props.pTokenSelected, 'host', 'issuer')
    this.props.getReports(this.props.pTokenSelected, 'native', 'redeemer')
  }

  componentDidUpdate(_prevProps) {
    if (!this.state.redeemerDataLoaded) {
      const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
        this.props.pTokenSelected
      )

      const configs = {
        issuer: null,
        redeemer: redeemerReadOnlyProvider
      }

      this.props.getTotalSupply(this.props.pTokenSelected, configs)

      this.setState({ redeemerDataLoaded: true })
    }

    if (
      _prevProps.pTokenSelected.id !== this.props.pTokenSelected.id
    ) {
      const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
        this.props.pTokenSelected
      )

      const configs = {
        issuer: null,
        redeemer: redeemerReadOnlyProvider
      }

      this.props.getTotalSupply(this.props.pTokenSelected, configs)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Main
          pTokenSelected={this.props.pTokenSelected}
          redeemReports={this.props.redeemReports}
          issueReports={this.props.issueReports}
          isActive={this.props.isActive}
        />
      </React.Fragment>
    )
  }
}

MainController.propTypes = {
  pTokenSelected: PropTypes.object,
  redeemerReadOnlyProvider: PropTypes.object,
  issueReports: PropTypes.array,
  redeemReports: PropTypes.array,
  isActive: PropTypes.bool,
  getTotalSupply: PropTypes.func,
  getReport: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MainController)
