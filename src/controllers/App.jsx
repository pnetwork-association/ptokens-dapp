import React, { useEffect } from 'react'
import MainController from './main/MainController'
import PNetworkController from './pNetwork/pNetworkController'
import SidebarController from './sidebar/SidebarController'
//import PTokensController from './pTokens/pTokensController'
import PTokensControllerV2 from './pTokens/pTokensControllerV2'
import SettingsController from './settings/SettingsController'
import NodeDetectorController from './nodeDetector/NodeDetectorController'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainWrapper from '../components/utils/MainWrapper'
import history from './../utils/history'
import ReactGA from 'react-ga'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { setNodeManually, setNode, getValidators } from '../actions/pNetwork/'
import { setSelectedPage, enableTestnetInstances, showHiddenPtokens } from '../actions/sidebar'
import { setSelectedpToken, setCustomRpc } from '../actions/pTokens'
import PropTypes from 'prop-types'
import Notifications from '../components/utils/Notifications'

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const mapStateToProps = state => {
  return {
    pTokensAvailable: state.pTokens.available
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNodeManually: (_pToken, _endpoint) => dispatch(setNodeManually(_pToken, _endpoint)),
    setNode: _pToken => dispatch(setNode(_pToken)),
    setSelectedPage: (_selected, _pToken) => dispatch(setSelectedPage(_selected, _pToken)),
    setSelectedpToken: (_pToken, _withNodeSelection) => dispatch(setSelectedpToken(_pToken, _withNodeSelection)),
    setCustomRpc: (_rpc, _type) => dispatch(setCustomRpc(_rpc, _type)),
    enableTestnetInstances: () => dispatch(enableTestnetInstances()),
    showHiddenPtokens: () => dispatch(showHiddenPtokens()),
    getValidators: () => dispatch(getValidators())
  }
}

const pageNameToNumbers = {
  '': 0,
  'issue-redeem': 1,
  enclave: 2,
  settings: 3
}

const App = ({
  getValidators,
  pTokensAvailable,
  showHiddenPtokens,
  enableTestnetInstances,
  setSelectedpToken,
  setSelectedPage,
  setCustomRpc,
  setNodeManually,
  setNode
}) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)

    getValidators()

    //getting only the ptoken type -> ../pbtc-on-eth-testnet/....
    const splittedUrl = history.location.pathname.split('/')[1].split('-')

    const pTokenNameSelected = splittedUrl[0]
    const pTokenRedeemFromSelected = splittedUrl[2]
    const pTokenNetworkSelected = splittedUrl[3] === 'testnet' ? 'testnet' : 'mainnet'

    const page = history.location.pathname.split('/')[2]
    const pToken = pTokensAvailable.find(
      pToken =>
        pToken.name.toLowerCase() === pTokenNameSelected &&
        pToken.network === pTokenNetworkSelected &&
        pToken.redeemFrom === pTokenRedeemFromSelected.toUpperCase()
    )

    const pTokenSelected = pToken ? pToken : pTokensAvailable[0]

    const { node, hostRpc, withTestnetInstances, iamthomas } = queryString.parse(window.location.search)
    if (Boolean(iamthomas) === true) {
      showHiddenPtokens()
    }

    if (withTestnetInstances || pTokenNetworkSelected === 'testnet') {
      enableTestnetInstances()
    }

    //if node is present not load the node
    setSelectedpToken(pTokenSelected, node ? false : true)

    if (!page) {
      setSelectedPage(0, pTokenSelected)
    } else {
      setSelectedPage(pageNameToNumbers[page], pTokenSelected)
    }

    // after setSelectedpToken since it reloads data
    if (hostRpc) {
      setCustomRpc(hostRpc, 'host')
    }

    if (node) {
      setNodeManually(pTokenSelected, node.includes('https://') ? node : `https://${node}`)
      return
    }

    setNode(pTokenSelected)
  }, [
    enableTestnetInstances,
    getValidators,
    pTokensAvailable,
    setCustomRpc,
    setNode,
    setNodeManually,
    setSelectedPage,
    setSelectedpToken,
    showHiddenPtokens
  ])

  return (
    <Switch>
      <Route
        exact
        path={
          '/(pbtc-on-eth|pltc-on-eth|pbtc-on-eth-testnet|pltc-on-eth-testnet|pbtc-on-eos-testnet|pbtc-on-eos|pbtc-on-telos|pltc-on-eos|peth-on-eos|pmkr-on-eos|plink-on-eos|pnt-on-eos|pyfi-on-eos|pteria-on-eos|puni-on-eos|pband-on-eos|pbal-on-eos|pcomp-on-eos|psnx-on-eos|pomg-on-eos|pdai-on-eos|pant-on-eos|plrc-on-eos|puos-on-eos|pbat-on-eos|prep-on-eos|pzrx-on-eos|ppnk-on-eos|pdoge-on-eth|peos-on-eth|pbtc-on-bsc|peos-on-polygon|pbtc-on-xdai)'
        }
        render={() => {
          return (
            <React.Fragment>
              <SidebarController />
              <MainWrapper>
                <Notifications />
                <SettingsController />
                <NodeDetectorController />
                <MainController />
              </MainWrapper>
            </React.Fragment>
          )
        }}
      />
      <Route
        exact
        path={
          '/(pbtc-on-eth|pltc-on-eth|pbtc-on-eth-testnet|pltc-on-eth-testnet|pbtc-on-eos-testnet|pbtc-on-eos|pbtc-on-telos|pltc-on-eos|peth-on-eos|pmkr-on-eos|plink-on-eos|pnt-on-eos|pyfi-on-eos|pteria-on-eos|puni-on-eos|pband-on-eos|pbal-on-eos|pcomp-on-eos|psnx-on-eos|pomg-on-eos|pdai-on-eos|pant-on-eos|plrc-on-eos|puos-on-eos|pbat-on-eos|prep-on-eos|pzrx-on-eos|ppnk-on-eos|pdoge-on-eth|peos-on-eth|pbtc-on-bsc|peos-on-polygon|pbtc-on-xdai)/pnetwork'
        }
        render={() => {
          return (
            <React.Fragment>
              <SidebarController />
              <MainWrapper>
                <Notifications />
                <SettingsController />
                <NodeDetectorController />
                <PNetworkController />
              </MainWrapper>
            </React.Fragment>
          )
        }}
      />
      <Route
        exact
        path={
          '/(pbtc-on-eth|pltc-on-eth|pbtc-on-eth-testnet|pltc-on-eth-testnet|pbtc-on-eos-testnet|pbtc-on-eos|pbtc-on-telos|pltc-on-eos|peth-on-eos|pmkr-on-eos|plink-on-eos|pnt-on-eos|pyfi-on-eos|pteria-on-eos|puni-on-eos|pband-on-eos|pbal-on-eos|pcomp-on-eos|psnx-on-eos|pomg-on-eos|pdai-on-eos|pant-on-eos|plrc-on-eos|puos-on-eos|pbat-on-eos|prep-on-eos|pzrx-on-eos|ppnk-on-eos|pdoge-on-eth|peos-on-eth|pbtc-on-bsc|peos-on-polygon|pbtc-on-xdai)/issue-redeem'
        }
        render={() => {
          return (
            <React.Fragment>
              <SidebarController />
              <MainWrapper>
                <Notifications />
                <SettingsController />
                <NodeDetectorController />
                <PTokensControllerV2 />
              </MainWrapper>
            </React.Fragment>
          )
        }}
      />
      <Route render={() => <Redirect to="pbtc-on-eth" />} />
    </Switch>
  )
}

SidebarController.propTypes = {
  pTokensAvailable: PropTypes.array,
  setSelectedPage: PropTypes.func,
  setSelectedpToken: PropTypes.func,
  setNodeManually: PropTypes.func,
  setNode: PropTypes.func,
  setCustomRpc: PropTypes.func,
  connectWithSpecificWallet: PropTypes.func,
  enableTestnetInstances: PropTypes.func,
  showHiddenPtokens: PropTypes.func,
  getValidators: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
