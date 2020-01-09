import React from 'react'
import MainController from './main/MainController'
import EnclaveController from './enclave/EnclaveController'
import SidebarController from './sidebar/SidebarController'
import TokenController from './token/TokenController'
import SettingsController from './settings/SettingsController'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" render={props => {
            return (
              <React.Fragment>
                <SidebarController />
                <MainController />
              </React.Fragment>
            )
          }}/>
          <Route exact path="/enclave" render={props => {
            return (
              <React.Fragment>
                <SidebarController />
                <EnclaveController />
              </React.Fragment>
            )
          }}/>
          <Route exact path="/token" render={props => {
            return (
              <React.Fragment>
                <SidebarController />
                <TokenController />
              </React.Fragment>
            )
          }}/>
          <Route exact from='/settings' render={props => {
            return (
              <React.Fragment>
                <SidebarController />
                <SettingsController />
              </React.Fragment>
            )
          }} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
