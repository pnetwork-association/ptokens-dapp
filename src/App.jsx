import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SwapController from './components/pages/swap/SwapController'
import HeaderController from './components/organisms/header/HeaderController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import history from './utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Notifications from './components/molecules/notifications/Notifications'
import { loadSwapData } from './store/swap/swap.actions'
import { selectPage, setTheme } from './store/pages/pages.actions'
import NftsController from './components/pages/nfts/NftsController'
import Loader from './components/atoms/loader/Loader'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const mapStateToProps = _state => {
  return {
    loading: _state.pages.loading
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    loadSwapData: _options => _dispatch(loadSwapData(_options)),
    selectPage: _page => _dispatch(selectPage(_page)),
    setTheme: _theme => _dispatch(setTheme(_theme))
  }
}

const App = ({ loading, setTheme, loadSwapData, selectPage }) => {
  useEffect(() => {
    const { withTestnetInstances, iamthomas, pToken } = queryString.parse(window.location.search)
    const theme = window.localStorage.getItem('THEME')
    setTheme(theme)
    ReactGA.pageview(window.location.pathname)
    const page = history.location.pathname.split('/')[1]
    selectPage(page)
    loadSwapData({ withTestnetInstances: Boolean(withTestnetInstances), pTokenDefault: pToken })
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
                <Loader loading={loading} />
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
  loading: PropTypes.object,
  loadSwapData: PropTypes.func,
  selectPage: PropTypes.func,
  setTheme: PropTypes.func,
  loadNftsData: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
