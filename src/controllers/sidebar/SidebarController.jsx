import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSelectedPage, setCollapseState } from '../../actions/sidebar'
import { setSelectedpToken, resetParams } from '../../actions/pTokens'
import { disconnectFromSpecificWallet } from '../../actions/wallets'
import { resetData } from '../../actions/pNetwork'
import { useSidebarPtokensAvailable } from '../../hooks/use-sidebar-ptokens-available'

const mapStateToProps = state => {
  return {
    selected: state.sidebar.selected,
    withTestnetInstances: state.sidebar.withTestnetInstances,
    isCollapseOpened: state.sidebar.isCollapseOpened,
    pTokenSelected: state.pTokens.selected,
    pTokensAvailable: state.pTokens.available,
    showHiddenPtokens: state.sidebar.showHiddenPtokens
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedPage: (_selected, _pToken) => dispatch(setSelectedPage(_selected, _pToken)),
    setCollapseState: state => dispatch(setCollapseState(state)),
    setSelectedpToken: (_pToken, _withNodeSelection) => dispatch(setSelectedpToken(_pToken, _withNodeSelection)),
    pNetworkDataReset: () => dispatch(resetData()),
    disconnectFromSpecificWallet: (pTokenName, role) => dispatch(disconnectFromSpecificWallet(pTokenName, role)),
    resetParams: () => dispatch(resetParams())
  }
}

const SidebarController = _props => {
  const {
    selected,
    pTokenSelected,
    setSelectedPage,
    setCollapseState,
    disconnectFromSpecificWallet,
    isCollapseOpened,
    resetParams,
    setSelectedpToken,
    showHiddenPtokens,
    pNetworkDataReset,
    detectedRedeemerNetwork,
    withTestnetInstances
  } = _props

  const [pTokensAvailable] = useSidebarPtokensAvailable(
    _props.pTokensAvailable,
    showHiddenPtokens,
    withTestnetInstances
  )

  return (
    <Sidebar
      page={selected}
      pTokenSelected={pTokenSelected}
      pTokensAvailable={pTokensAvailable}
      onChangePage={_page => setSelectedPage(_page, pTokenSelected)}
      onChangeCollapseState={state => {
        !state ? setCollapseState(!isCollapseOpened) : setCollapseState(state)
      }}
      onChangeSelectedpToken={pToken => {
        disconnectFromSpecificWallet(pTokenSelected.name, 'issuer')

        //reset token page params
        resetParams()

        pNetworkDataReset()
        setSelectedpToken(pToken, detectedRedeemerNetwork)

        setSelectedPage(selected, pToken)
      }}
      isCollapseOpened={isCollapseOpened}
    />
  )
}

SidebarController.propTypes = {
  selected: PropTypes.number,
  isCollapseOpened: PropTypes.bool,
  pTokenSelected: PropTypes.object,
  pTokensAvailable: PropTypes.array,
  showHiddenPtokens: PropTypes.bool,
  withTestnetInstances: PropTypes.bool,
  setSelectedPage: PropTypes.func,
  setSelectedPageFromPathname: PropTypes.func,
  setCollapseState: PropTypes.func,
  setSelectedpToken: PropTypes.func,
  resetParams: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarController)
