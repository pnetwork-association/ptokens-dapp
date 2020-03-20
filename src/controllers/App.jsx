import React from 'react'
import MainController from './main/MainController'
import PNetworkController from './pNetwork/pNetworkController'
import SidebarController from './sidebar/SidebarController'
import PTokensController from './pTokens/pTokensController'
import SettingsController from './settings/SettingsController'
import NodeDetectorController from './nodeDetector/NodeDetectorController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/utils/MainWrapper'
import NetworkDetectorController from './networkDetector/NetworkDetectorController'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { Node } from 'ptokens-node'
import { setNodeManually, setNode } from '../actions/pNetwork/'
import { setSelectedPage } from '../actions/sidebar'
import { setSelectedpToken } from '../actions/pTokens'
import PropTypes from 'prop-types'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const mapStateToProps = state => {
  return {
    pTokensAvailable: state.pTokens.available
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNodeManually: (_pToken, _endpoint) =>
      dispatch(setNodeManually(_pToken, _endpoint)),
    setNode: _pToken => dispatch(setNode(_pToken)),
    setSelectedPage: (_selected, _pToken) =>
      dispatch(setSelectedPage(_selected, _pToken)),
    setSelectedpToken: (_pToken, _withNodeSelection) =>
      dispatch(setSelectedpToken(_pToken, _withNodeSelection))
  }
}

const pageNameToNumbers = {
  '': 0,
  'issue-redeem': 1,
  enclave: 2,
  settings: 3
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  async componentWillMount() {
    //getting only the ptoken type -> ../pbtc-on-eth-testnet/....
    const splittedUrl = history.location.pathname.split('/')[1].split('-')

    const pTokenNameSelected = splittedUrl[0]
    const pTokenNetworkSelected =
      splittedUrl[3] === 'testnet' ? 'testnet' : 'mainnet'

    const page = history.location.pathname.split('/')[2]
    const pToken = this.props.pTokensAvailable.find(
      pToken =>
        pToken.name.toLowerCase() === pTokenNameSelected &&
        pToken.network === pTokenNetworkSelected
    )

    const { node } = queryString.parse(window.location.search)
    //if node is present not load the node
    this.props.setSelectedpToken(
      pToken ? pToken : this.props.pTokensAvailable[0],
      node ? false : true
    )

    if (!page) {
      this.props.setSelectedPage(
        0,
        pToken ? pToken : this.props.pTokensAvailable[0]
      )
    } else {
      this.props.setSelectedPage(
        pageNameToNumbers[page],
        pToken ? pToken : this.props.pTokensAvailable[0]
      )
    }

    if (node) {
      const pnode = new Node({
        pToken: {
          name: pToken.name.toLowerCase(),
          redeemFrom: pToken.redeemFrom.toLowerCase()
        },
        endpoint: node.includes('https://') ? node : `https://${node}`
      })

      this.props.setNodeManually(pToken, pnode.endpoint)
      return
    }

    this.props.setNode(pToken ? pToken : this.props.pTokensAvailable[0])
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path={
              '/(pbtc-on-eth|pbtc-on-eth-testnet|pbtc-on-eos|pbtc-on-eos-testnet)'
            }
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NodeDetectorController />
                    <NetworkDetectorController />
                    <MainController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path={
              '/(pbtc-on-eth|pbtc-on-eth-testnet|pbtc-on-eos|pbtc-on-eos-testnet)/pnetwork'
            }
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NodeDetectorController />
                    <NetworkDetectorController />
                    <PNetworkController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path={
              '/(pbtc-on-eth|pbtc-on-eth-testnet|pbtc-on-eos|pbtc-on-eos-testnet)/issue-redeem'
            }
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NodeDetectorController />
                    <NetworkDetectorController />
                    <PTokensController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path={
              '/(pbtc-on-eth|pbtc-on-eth-testnet|pbtc-on-eos|pbtc-on-eos-testnet)/settings'
            }
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NodeDetectorController />
                    <NetworkDetectorController />
                    <SettingsController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route render={() => <Redirect to="pbtc-on-eth" />} />
        </Switch>
      </React.Fragment>
    )
  }
}

SidebarController.propTypes = {
  pTokensAvailable: PropTypes.array,
  setSelectedPage: PropTypes.func,
  setSelectedpToken: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
