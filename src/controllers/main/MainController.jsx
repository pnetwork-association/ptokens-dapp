import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Main from '../../components/main/Main'
import * as Enclave from '../../actions/enclave'
import * as pTokens from '../../actions/pTokens'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected,
    redeemerReadOnlyProvider: state.wallets.redeemerReadOnlyProvider,
    issueReports: state.enclave.issueReports,
    redeemReports: state.enclave.redeemReports,
    isActive: state.enclave.isActive
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCirculatingSupply: (_pToken, configs) =>
      dispatch(pTokens.getCirculatingSupply(_pToken, configs)),
    getReports: (_pToken, _type, role) =>
      dispatch(Enclave.getReports(_pToken, _type, role))
  }
}

export class MainController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      app1: [],
      app2: [],
      a1: null,
      a2: null,
      redeemerReportWithProof: [],
      issuerReportWithProof: [],
      redeemerDataLoaded: null
    }

    this.props.getReports(this.props.pTokenSelected, 'host', 'issuer')

    this.props.getReports(this.props.pTokenSelected, 'native', 'redeemer')
  }

  componentDidUpdate(_prevProps) {
    //reset verification proof
    if (
      this.props.issueReports.length <
      this.state.issuerReportWithProof.length - 2
    ) {
      this.setState({
        app1: [],
        app2: []
      })
    }

    if (!this.state.redeemerDataLoaded) {
      const redeemerReadOnlyProvider = getCorrespondingReadOnlyProvider(
        this.props.pTokenSelected.name,
        this.props.pTokenSelected.redeemFrom,
        this.props.pTokenSelected.network
      )

      const configs = {
        issuer: null,
        redeemer: redeemerReadOnlyProvider
      }

      this.props.getCirculatingSupply(this.props.pTokenSelected, configs)

      this.setState({ redeemerDataLoaded: true })
    }

    if (
      _prevProps.issueReports.length !== this.props.issueReports.length ||
      (this.state.issuerReportWithProof.length === 0 &&
        this.props.issueReports.length > 0)
    ) {
      this.setState(() => {
        const issuerReportWithProof = this.props.issueReports
        issuerReportWithProof.forEach(obj => (obj.prooved = false))
        return {
          issuerReportWithProof
        }
      })
      const a1 = setInterval(() => this.animation1(), 5)
      this.setState({ a1 })
    }

    if (
      _prevProps.redeemReports.length !== this.props.redeemReports.length ||
      (this.state.redeemerReportWithProof.length === 0 &&
        this.props.redeemReports.length > 0)
    ) {
      this.setState(() => {
        const redeemerReportWithProof = this.props.redeemReports
        redeemerReportWithProof.forEach(obj => (obj.prooved = false))
        return {
          redeemerReportWithProof
        }
      })
      const a2 = setInterval(() => this.animation2(), 5)
      this.setState({ a2 })
    }
  }

  //provisional animation for proove
  animation1 = () => {
    if (this.state.issuerReportWithProof.length === 0) {
      return
    }

    const random = Math.round(
      Math.random() * this.state.issuerReportWithProof.length
    )
    const value = random > 0 ? random - 1 : 0
    if (!this.state.app1.includes(value)) {
      this.setState(prevState => {
        const issuerReportWithProof = prevState.issuerReportWithProof
        const app = prevState.app1
        issuerReportWithProof[value].prooved = true
        app.push(value)
        return {
          issuerReportWithProof
        }
      })
    }
    if (this.state.issuerReportWithProof.length === this.state.app1.length) {
      clearInterval(this.state.a1)
    }
  }

  animation2 = () => {
    if (this.state.redeemerReportWithProof.length === 0) return
    const random = Math.round(
      Math.random() * this.state.redeemerReportWithProof.length
    )
    const value = random > 0 ? random - 1 : 0
    if (!this.state.app2.includes(value)) {
      this.setState(prevState => {
        const redeemerReportWithProof = prevState.redeemerReportWithProof
        const app = prevState.app2
        redeemerReportWithProof[value].prooved = true
        app.push(value)
        return {
          redeemerReportWithProof
        }
      })
    }
    if (this.state.redeemerReportWithProof.length === this.state.app2.length) {
      clearInterval(this.state.a2)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.a1)
    clearInterval(this.state.a2)
  }

  render() {
    return (
      <React.Fragment>
        <Main
          pTokenSelected={this.props.pTokenSelected}
          redeemReports={this.state.redeemerReportWithProof}
          issueReports={this.state.issuerReportWithProof}
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
  getCirculatingSupply: PropTypes.func,
  getReport: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MainController)
