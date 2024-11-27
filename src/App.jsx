import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import MainWrapper from './components/atoms/mainWrapper/MainWrapper'
import Notifications from './components/molecules/notifications/Notifications'
import Popup from './components/molecules/popup/Popup'
import RedirectBanner from './components/molecules/popup/RedirectBanner'
import WarningPopup from './components/molecules/popup/Warning'
import SocialLinks from './components/molecules/socials/Socials'
import Version from './components/molecules/version/Version'
import HeaderController from './components/organisms/header/HeaderController'
import MigrationController from './components/pages/migration/MigrationController'
import MigrationHomeController from './components/pages/migrationHome/MigrationHomeController'
import NftsController from './components/pages/nfts/NftsController'
import Risks from './components/pages/risks/Risks'
import SwapController from './components/pages/swap/SwapController'
import SwapOldPntController from './components/pages/swapOldPnt/SwapOldPntController'
import { sendPageView, setPageLocation } from './ga4'
import { loadMigrationData } from './store/migration/migration.actions'
import { selectPage, setTheme } from './store/pages/pages.actions'
import { loadSwapData } from './store/swap/swap.actions'
import { loadSwapOldPntData } from './store/swap-old-pnt/swap-old-pnt.actions'
import history from './utils/history'

history.listen((location) => {
  setPageLocation(location.pathname)
  sendPageView()
})

const mapStateToProps = (_state) => {
  return {
    loading: _state.pages.loading,
  }
}

const mapDispatchToProps = (_dispatch) => {
  return {
    loadSwapData: (_options) => _dispatch(loadSwapData(_options)),
    loadSwapOldPntData: () => _dispatch(loadSwapOldPntData()),
    loadMigrationData: (_opts) => _dispatch(loadMigrationData(_opts)),
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options)),
    setTheme: (_theme) => _dispatch(setTheme(_theme)),
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

const RisksPage = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path} render={() => <Risks />} />
      <Route exact path={`${path}/:strategyId`} render={() => <Risks />} />
    </Switch>
  )
}

const App = ({ loading, setTheme, loadSwapData, loadSwapOldPntData, loadMigrationData, selectPage }) => {
  const [showWarningPopup, setShowWarningPopup] = useState(true)

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
      window.location.hash.split('?').pop()
    )
    const theme = window.localStorage.getItem('THEME')
    if (theme) setTheme(theme)
    sendPageView()
    const urlParts = history.location.pathname.split('/')
    const page = urlParts[1]

    if (page === 'migration') {
      const strategy = urlParts[2]
      selectPage(`${page}${strategy ? '/' + strategy : ''}`)
      loadMigrationData({ strategy })
      return
    }

    selectPage(page, { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol })
    loadSwapData({
      defaultSelection: { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol },
    })
    loadSwapOldPntData()
    loadMigrationData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <MainWrapper>
        <Notifications />
        <HeaderController />
        <RedirectBanner />
        <WarningPopup show={showWarningPopup} onClose={() => setShowWarningPopup(false)} />
        <Switch>
          <Route exact path={'/swap'} render={() => <SwapController />} />
          <Route
            exact
            path={'/nfts'}
            render={() => (
              <React.Fragment>
                <NftsController />
              </React.Fragment>
            )}
          />
          <Route path="/migration">
            <Migrations />
          </Route>
          <Route path="/risks">
            <RisksPage />
          </Route>
          <Route exact path={'/oldpnt-swap'} render={() => <SwapOldPntController />} />
          <Route render={() => <Redirect to="swap" />} />
        </Switch>
      </MainWrapper>
      <Popup
        content={
          <React.Fragment>
            Now the dApp supports host-to-host swaps!
            <br />
            Have a try{' '}
            <a href="https://dapp.p.network/swap?asset=btc&from=algorand&to=eth&algorand_from_assetid=744665252">
              here.
            </a>
          </React.Fragment>
        }
      />
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
  loadNftsData: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
