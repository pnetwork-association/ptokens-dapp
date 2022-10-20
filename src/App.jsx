import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadSwapData } from './store/swap/swap.actions'
import { loadMigrationData } from './store/migration/migration.actions'
import { loadSwapOldPntData } from './store/swap-old-pnt/swap-old-pnt.actions'
import { selectPage, setTheme } from './store/pages/pages.actions'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import history from './utils/history'
import ReactGA from 'react-ga4'
import queryString from 'query-string'
import { connect } from 'react-redux'
import MigrationController from './components/pages/migration/MigrationController'
import MigrationHomeController from './components/pages/migrationHome/MigrationHomeController'
import SwapController from './components/pages/swap/SwapController'
import SwapOldPntController from './components/pages/swapOldPnt/SwapOldPntController'
import HeaderController from './components/organisms/header/HeaderController'
import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import Notifications from './components/molecules/notifications/Notifications'
import NftsController from './components/pages/nfts/NftsController'
import Loader from './components/atoms/loader/Loader'
import Popup from './components/molecules/popup/Popup'
import settings from './settings'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.send('pageview')
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
    loadMigrationData: _opts => _dispatch(loadMigrationData(_opts)),
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options)),
    setTheme: _theme => _dispatch(setTheme(_theme))
  }
}

const Migrations = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path} render={() => <MigrationHomeController />} />
      <Route exact path={`${path}/:strategyId`} render={() => <MigrationController />} />
    </Switch>
  )
}

const App = ({ loading, setTheme, loadSwapData, loadSwapOldPntData, loadMigrationData, selectPage }) => {
  useEffect(() => {
    const { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid } = queryString.parse(
      window.location.search
    )
    const theme = window.localStorage.getItem('THEME')
    if (theme) setTheme(theme)
    ReactGA.send('pageview')
    const urlParts = history.location.pathname.split('/')
    const page = urlParts[1]

    if (page === 'migration') {
      const strategy = urlParts[2]
      selectPage(`${page}${strategy ? '/' + strategy : ''}`)
      loadMigrationData({ strategy })
      return
    }

    selectPage(page, { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid })
    loadSwapData({ defaultSelection: { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid } })
    loadSwapOldPntData()
    loadMigrationData()
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
          <Route path="/migration">
            <Migrations />
          </Route>
          <Route exact path={'/oldpnt-swap'} render={() => <SwapOldPntController />} />
          <Route render={() => <Redirect to="swap" />} />
        </Switch>
        <Popup
          content={
            <React.Fragment>
              Now the dApp supports host-to-host swaps!
              <br />
              Have a try{' '}
              <a href="https://dapp.ptokens.io/swap?asset=btc&from=algorand&to=eth&algorand_from_assetid=744665252">
                here.
              </a>
            </React.Fragment>
          }
        />
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
