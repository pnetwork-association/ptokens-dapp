import { Update } from 'history'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { AnyAction } from 'redux'

import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import Notifications from './components/molecules/notifications/Notifications'
import SocialLinks from './components/molecules/socials/Socials'
import Version from './components/molecules/version/Version'
import HeaderController from './components/organisms/header/HeaderController'
import Risks from './components/pages/risks/Risks'
import SwapController from './components/pages/swap/SwapController'
import { sendPageView, setPageLocation } from './ga4'
import { AppDispatch, RootState } from './store'
import { selectPage, setTheme } from './store/pages/pages.actions'
import { ILoading } from './store/pages/pages.reducer'
import { loadSwapData } from './store/swap/swap.actions'
import history from './utils/history'

history.listen((update: Update) => {
  setPageLocation(update.location.pathname)
  sendPageView()
})

const mapStateToProps = (_state: RootState) => {
  return {
    loading: _state.pages.loading,
  }
}

const mapDispatchToProps = (_dispatch: AppDispatch) => {
  return {
    setTheme: (_theme: string) => _dispatch(setTheme(_theme)),
    loadSwapData: (opts: Record<string, unknown>) => _dispatch(loadSwapData(opts)),
    selectPage: (page: string, opts: Record<string, unknown>) => _dispatch(selectPage(page, opts)),
  }
}

const RisksPage = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path} render={() => <Risks />} />
      <Route exact path={`${path}/:strategyId`} render={() => <Risks />} />
    </Switch>
  )
}

type AppProps = {
  loading: ILoading
  setTheme: (theme: string) => AnyAction
  loadSwapData: (opts: Record<string, unknown>) => Promise<void>
  selectPage: (page: string, opts: Record<string, unknown>) => AnyAction
}

const App = ({ setTheme, loadSwapData, selectPage }: AppProps) => {
  useEffect(() => {
    /* window.location.search -> window.location.hash
     * window.location.search not available in HashRouter
     *
     * Example:
     * window.location.search = '?asset=btc&from=btc&to=eth'
     * window.location.hash = '#/swap?asset=btc&from=btc&to=eth'
     * window.location.hash.split('?').pop() -> 'asset=btc&from=btc&to=eth'
     *
     * '?' is not retained with the new solution but if present gets removed by the parser anyways.
     */
    const { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = queryString.parse(
      window.location.pathname
    )
    const theme = window.localStorage.getItem('THEME')
    if (theme) setTheme(theme)
    sendPageView()
    const urlParts = history.location.pathname.split('/')
    const page = urlParts[1]

    selectPage(page, { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol })
    loadSwapData({
      defaultSelection: { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol },
    })
  }, [loadSwapData, selectPage, setTheme])

  return (
    <React.Fragment>
      <MainWrapper>
        <Notifications />
        <HeaderController />
        <Switch>
          <Route exact path={'/swap'} render={() => <SwapController />} />
          <Route path="/risks">
            <RisksPage />
          </Route>
          <Route render={() => <Redirect to="swap" />} />
        </Switch>
      </MainWrapper>
      <SocialLinks />
      <Version />
    </React.Fragment>
  )
}

App.propTypes = {
  loading: PropTypes.object,
  loadSwapData: PropTypes.func,
  selectPage: PropTypes.func,
  setTheme: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
