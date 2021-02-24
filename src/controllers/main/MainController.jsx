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
const mapDispatchToProps = dispatch => {
  return {}
}

export class MainController extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    //console.log(this.props.pTokenSelected.totalSupply)
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
  isActive: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(MainController)
