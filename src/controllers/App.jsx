import React from 'react'
import MainController from './main/MainController'
import PNetworkController from './pNetwork/pNetworkController'
import SidebarController from './sidebar/SidebarController'
import PTokensController from './pTokens/pTokensController'
import SettingsController from './settings/SettingsController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/utils/MainWrapper'
import NetworkDetectorController from './networkDetector/NetworkDetectorController'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { Node } from 'ptokens-node'
import NotificationAlert from 'react-notification-alert'
import { setNode } from '../actions/pNetwork/'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const mapStateToProps = state => {
  return {
    pTokenSelected: state.pTokens.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNode: (_pToken, _node) => dispatch(setNode(_pToken, _node))
  }
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  async componentWillMount() {
    const { node } = queryString.parse(window.location.search)

    if (node) {
      const pnode = new Node({
        pToken: {
          name: this.props.pTokenSelected.name,
          redeemFrom: this.props.pTokenSelected.redeemFrom
        },
        endpoint: node.includes('https://') ? node : `https://${node}`
      })
      const info = await pnode.getInfo()
      if (!info.host_network.includes(this.props.pTokenSelected.network)) {
        this.showAlert('danger', 'Node not compatible with selected pToken')
        return
      }

      this.props.setNode(this.props.pTokenSelected, pnode)
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname)
  }

  showAlert = (_type, _message) => {
    const options = {
      place: 'br',
      message: <span className="ml-1 font-weight-bold">{_message + '.'}</span>,
      type: _type,
      icon: 'fa fa-bell',
      autoDismiss: 10
    }
    this.refs.notify.notificationAlert(options)
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path={'/(pbtc-on-eth|pbtc-on-eth-testnet|pltc-on-eth)'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <MainController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            path={'/(pbtc-on-eth|pbtc-on-eth-testnet)/pnetwork'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <PNetworkController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            path={'/(pbtc-on-eth|pbtc-on-eth-testnet)/issue-redeem'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <PTokensController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            path={'/(pbtc-on-eth|pbtc-on-eth-testnet)/settings'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <SettingsController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route render={() => <Redirect to="pbtc-on-eth" />} />
        </Switch>
        <NotificationAlert ref="notify" />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
