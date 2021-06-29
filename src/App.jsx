import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadSwapData } from './store/swap/swap.actions'
import { loadSwapOldPntData } from './store/swap-old-pnt/swap-old-pnt.actions'
import { selectPage, setTheme } from './store/pages/pages.actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import SwapController from './components/pages/swap/SwapController'
import SwapOldPntController from './components/pages/swapOldPnt/SwapOldPntController'
import HeaderController from './components/organisms/header/HeaderController'
import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import Notifications from './components/molecules/notifications/Notifications'
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
    loadSwapOldPntData: () => _dispatch(loadSwapOldPntData()),
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options)),
    setTheme: _theme => _dispatch(setTheme(_theme))
  }
}

const App = ({ loading, setTheme, loadSwapData, loadSwapOldPntData, selectPage }) => {
  useEffect(() => {
    const { pToken, asset, from, to } = queryString.parse(window.location.search)
    const theme = window.localStorage.getItem('THEME')
    if (theme) setTheme(theme)
    ReactGA.pageview(window.location.pathname)
    const page = history.location.pathname.split('/')[1]
    selectPage(page, { pToken, asset, from, to })
    loadSwapData({ defaultSelection: { pToken, asset, from, to } })
    loadSwapOldPntData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <MainWrapper>
        <Notifications />
        <HeaderController />
        <Switch>
          <Route exact path={'/swap'} render={() => <SwapController />} />
          <Route
            exact
            path={'/nfts'}
            render={() => (
              <React.Fragment>
                <Loader loading={loading} />
                <NftsController />
              </React.Fragment>
            )}
          />
          <Route exact path={'/oldpnt-swap'} render={() => <SwapOldPntController />} />
          <Route render={() => <Redirect to="swap" />} />
        </Switch>
      </MainWrapper>
    </React.Fragment>
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
