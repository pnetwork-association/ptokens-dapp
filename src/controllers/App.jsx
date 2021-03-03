import React, { useEffect } from 'react'
import SwapController from './swap/SwapController'
import HeaderController from './header/HeaderController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/mainWrapper/MainWrapper'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { getValidators } from '../actions/pNetwork/'
import PropTypes from 'prop-types'
import Notifications from '../components/notifications/Notifications'
import { loadSwapData } from '../actions/swap'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = _dispatch => {
  return {
    getValidators: () => _dispatch(getValidators()),
    loadSwapData: () => _dispatch(loadSwapData())
  }
}

/*const pageNameToNumbers = {
  '': 0,
  'issue-redeem': 1,
  enclave: 2,
  settings: 3
}*/

const App = ({ getValidators, loadSwapData }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
    getValidators()
    // const page = history.location.pathname.split('/')[2]
    const { withTestnetInstances, iamthomas } = queryString.parse(window.location.search)
    loadSwapData(withTestnetInstances)
  }, [loadSwapData, getValidators])

  return (
    <Switch>
      <Route
        exact
        path={'/swap'}
        render={() => {
          return (
            <React.Fragment>
              <MainWrapper>
                <Notifications />
                <HeaderController />
                <SwapController />
              </MainWrapper>
            </React.Fragment>
          )
        }}
      />
      <Route render={() => <Redirect to="swap" />} />
    </Switch>
  )
}

App.propTypes = {
  getValidators: PropTypes.func,
  loadSwapData: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
