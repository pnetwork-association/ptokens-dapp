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
    setSelectedPage: (_selected, _pToken) =>
      dispatch(setSelectedPage(_selected, _pToken)),
    setSelectedPageFromPathname: (_pathname, _pToken) =>
      dispatch(setSelectedPageFromPathname(_pathname, _pToken)),
    setCollapseState: state => dispatch(setCollapseState(state)),
    setSelectedpToken: pToken => dispatch(setSelectedpToken(pToken)),
    resetEnclaveData: () => dispatch(Enclave.resetData()),
    disconnectFromSpecificWallet: (pTokenName, role) =>
      dispatch(disconnectFromSpecificWallet(pTokenName, role)),
    resetParams: () => dispatch(resetParams())
  }
}

const pageNameToNumbers = {
  '': 0,
  'issue-redeem': 1,
  enclave: 2,
  settings: 3
}

export class SidebarController extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}

    const pTokenNameSelected = history.location.pathname
      .split('/')[1]
      .split('-')[0]
    const page = history.location.pathname.split('/')[2]
    const pToken = this.props.pTokensAvailable.find(
      pToken => pToken.name.toLowerCase() === pTokenNameSelected
    )
    this.props.setSelectedPageFromPathname(history.location.pathname, pToken)
    this.props.setSelectedpToken(pToken)
    this.props.setSelectedPage(pageNameToNumbers[page], pToken)
  }

  render() {
    return (
      <Sidebar
        page={this.props.selected}
        pTokenSelected={this.props.pTokenSelected}
        pTokensAvailable={this.props.pTokensAvailable}
        onChangePage={_page =>
          this.props.setSelectedPage(_page, this.props.pTokenSelected)
        }
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

          this.props.setSelectedPage(this.props.selected, pToken)
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
