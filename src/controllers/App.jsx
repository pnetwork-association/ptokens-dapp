import React from 'react'
import MainController from './main/MainController'
import EnclaveController from './enclave/EnclaveController'
import SidebarController from './sidebar/SidebarController'
import TokenController from './token/TokenController'
import SettingsController from './settings/SettingsController'
import { Route, Switch } from 'react-router-dom'
import MainWrapper from '../components/utils/MainWrapper'
import NetworkDetectorController from './networkDetector/NetworkDetectorController'
import history from './../utils/history'
import ReactGA from 'react-ga'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
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
            path={'/(peos-on-eth|pbtc-on-eth|pltc-on-eth)'}
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
            exact
            path={'/(peos-on-eth|pbtc-on-eth|pltc-on-eth)/enclave'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <EnclaveController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path={'/(peos-on-eth|pbtc-on-eth|pltc-on-eth)/issue-redeem'}
            render={() => {
              return (
                <React.Fragment>
                  <SidebarController />
                  <MainWrapper>
                    <NetworkDetectorController />
                    <TokenController />
                  </MainWrapper>
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path={'/(peos-on-eth|pbtc-on-eth|pltc-on-eth)/settings'}
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
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
