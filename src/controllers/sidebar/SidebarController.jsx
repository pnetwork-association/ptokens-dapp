import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  setSelectedPage,
  setSelectedPageFromPathname,
  setCollapseState
} from '../../actions/sidebar'
import { setSelectedpToken, resetParams } from '../../actions/pTokens'
import { disconnectFromSpecificWallet } from '../../actions/wallets'
import * as Enclave from '../../actions/enclave'
import history from '../../utils/history'

const mapStateToProps = state => {
  return {
    selected: state.sidebar.selected,
    isCollapseOpened: state.sidebar.isCollapseOpened,
    pTokenSelected: state.pTokens.selected,
    pTokensAvailable: state.pTokens.available
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedPage: selected => dispatch(setSelectedPage(selected)),
    setSelectedPageFromPathname: pathname =>
      dispatch(setSelectedPageFromPathname(pathname)),
    setCollapseState: state => dispatch(setCollapseState(state)),
    setSelectedpToken: pToken => dispatch(setSelectedpToken(pToken)),
    resetEnclaveData: () => dispatch(Enclave.resetData()),
    disconnectFromSpecificWallet: (pTokenName, role) =>
      dispatch(disconnectFromSpecificWallet(pTokenName, role)),
    resetParams: () => dispatch(resetParams())
  }
}

export class SidebarController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}

    this.props.setSelectedPageFromPathname(history.location.pathname)
  }

  render() {
    return (
      <Sidebar
        page={this.props.selected}
        pTokenSelected={this.props.pTokenSelected}
        pTokensAvailable={this.props.pTokensAvailable}
        onChangePage={this.props.setSelectedPage}
        onChangeCollapseState={state => {
          !state
            ? this.props.setCollapseState(!this.props.isCollapseOpened)
            : this.props.setCollapseState(state)
        }}
        onChangeSelectedpToken={pToken => {
          this.props.disconnectFromSpecificWallet(
            this.props.pTokenSelected.name,
            'issuer'
          )

          //reset token page params
          this.props.resetParams()

          this.props.resetEnclaveData()
          this.props.setSelectedpToken(pToken)
        }}
        isCollapseOpened={this.props.isCollapseOpened}
      />
    )
  }
}

SidebarController.propTypes = {
  selected: PropTypes.number,
  isCollapseOpened: PropTypes.bool,
  pTokenSelected: PropTypes.object,
  pTokensAvailable: PropTypes.array,
  setSelectedPage: PropTypes.func,
  setSelectedPageFromPathname: PropTypes.func,
  setCollapseState: PropTypes.func,
  setSelectedpToken: PropTypes.func,
  resetParams: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarController)
