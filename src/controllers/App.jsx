import React, { useEffect } from 'react'
import SwapController from './swap/SwapController'
import HeaderController from './header/HeaderController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/mainWrapper/MainWrapper'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { setNode, getValidators } from '../actions/pNetwork/'
import { setSelectedPage, enableTestnetInstances, showHiddenPtokens } from '../actions/sidebar'
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
    setNode: _pToken => _dispatch(setNode(_pToken)),
    setSelectedPage: (_selected, _pToken) => _dispatch(setSelectedPage(_selected, _pToken)),
    enableTestnetInstances: () => _dispatch(enableTestnetInstances()),
    showHiddenPtokens: () => _dispatch(showHiddenPtokens()),
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

const App = ({ getValidators, showHiddenPtokens, enableTestnetInstances, loadSwapData }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)

    getValidators()

    //getting only the ptoken type -> ../pbtc-on-eth-testnet/....
    const splittedUrl = history.location.pathname.split('/')[1].split('-')
    const pTokenNetworkSelected = splittedUrl[3] === 'testnet' ? 'testnet' : 'mainnet'

    // const page = history.location.pathname.split('/')[2]

    const { withTestnetInstances, iamthomas } = queryString.parse(window.location.search)
    if (Boolean(iamthomas) === true) {
      showHiddenPtokens()
    }

    loadSwapData(withTestnetInstances)

    if (withTestnetInstances || pTokenNetworkSelected === 'testnet') {
      enableTestnetInstances()
    }

    /*if (!page) {
      setSelectedPage(3, pTokenSelected)
    } else {
      setSelectedPage(pageNameToNumbers[page], pTokenSelected)
    }*/
  }, [getValidators, showHiddenPtokens, enableTestnetInstances, loadSwapData])

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
  setSelectedPage: PropTypes.func,
  enableTestnetInstances: PropTypes.func,
  showHiddenPtokens: PropTypes.func,
  getValidators: PropTypes.func,
  loadSwapData: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
