import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadSwapData } from './store/swap/swap.actions'
import { selectPage, setTheme } from './store/pages/pages.actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import SwapController from './components/pages/swap/SwapController'
import HeaderController from './components/organisms/header/HeaderController'
import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import Notifications from './components/molecules/notifications/Notifications'
import NftsController from './components/pages/nfts/NftsController'
import Loader from './components/atoms/loader/Loader'
import Banner from './components/molecules/banner/Banner'

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
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options)),
    setTheme: _theme => _dispatch(setTheme(_theme))
  }
}

const App = ({ loading, setTheme, loadSwapData, selectPage }) => {
  useEffect(() => {
    const { pToken, asset, from, to } = queryString.parse(window.location.search)
    const theme = window.localStorage.getItem('THEME')
    if (theme) setTheme(theme)
    ReactGA.pageview(window.location.pathname)
    const page = history.location.pathname.split('/')[1]
    selectPage(page, { pToken, asset, from, to })
    loadSwapData({ defaultSelection: { pToken, asset, from, to } })
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
                <Banner>
                  Looking for the old dapp? Click{' '}
                  <a
                    style={{ color: 'white' }}
                    href="https://dapp-legacy.ptokens.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </Banner>
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
                <Banner>
                  Looking for the old dapp? Click{' '}
                  <a
                    style={{ color: 'white' }}
                    href="https://dapp-legacy.ptokens.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </Banner>
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
