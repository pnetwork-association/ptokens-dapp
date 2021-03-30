import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SwapController from './swap/SwapController'
import HeaderController from './header/HeaderController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/mainWrapper/MainWrapper'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { getValidators } from '../store/pNetwork/pnetwork.actions'
import Notifications from '../components/notifications/Notifications'
import { loadSwapData } from '../store/swap/swap.actions'
import { selectPage } from '../store/pages/pages.actions'
import NftsController from './nfts/NftsController'

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
    loadSwapData: () => _dispatch(loadSwapData()),
    selectPage: _page => _dispatch(selectPage(_page))
  }
}

const App = ({ getValidators, loadSwapData, selectPage }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
    getValidators()
    const page = history.location.pathname.split('/')[1]
    selectPage(page)
    const { withTestnetInstances, iamthomas } = queryString.parse(window.location.search)
    loadSwapData(withTestnetInstances)
  }, [])

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
      <Route
        exact
        path={'/nfts'}
        render={() => {
          return (
            <React.Fragment>
              <MainWrapper>
                <Notifications />
                <HeaderController />
                <NftsController />
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
  loadSwapData: PropTypes.func,
  selectPage: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
