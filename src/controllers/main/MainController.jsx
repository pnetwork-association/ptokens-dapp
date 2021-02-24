import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Main from '../../components/main/Main'
import { getReports } from '../../actions/pNetwork'
import { getTotalSupply } from '../../actions/pTokens'

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
    getTotalSupply: () => dispatch(getTotalSupply()),
    getReports: (_type, role) => dispatch(getReports(_type, role))
  }
}

export class MainController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      redeemerDataLoaded: null
    }

    this.props.getReports('host', 'issuer')
    this.props.getReports('native', 'redeemer')
  }

  componentDidUpdate(_prevProps) {
    if (!this.state.redeemerDataLoaded) {
      this.props.getTotalSupply()
      this.setState({ redeemerDataLoaded: true })
    }

    if (_prevProps.pTokenSelected.id !== this.props.pTokenSelected.id) {
      this.props.getTotalSupply()
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
