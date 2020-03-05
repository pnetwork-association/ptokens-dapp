import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSelectedPage, setCollapseState } from '../../actions/sidebar'
import { setSelectedpToken, resetParams } from '../../actions/pTokens'
import { disconnectFromSpecificWallet } from '../../actions/wallets'
import { resetData } from '../../actions/pNetwork'
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
    setCollapseState: state => dispatch(setCollapseState(state)),
    setSelectedpToken: (pToken, _redeemerNetwork) =>
      dispatch(setSelectedpToken(pToken, _redeemerNetwork)),
    pNetworkDataReset: () => dispatch(resetData()),
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

    //getting only the ptoken type -> ../pbtc-on-eth-testnet/....
    const splittedUrl = history.location.pathname.split('/')[1].split('-')

    const pTokenNameSelected = splittedUrl[0]
    const pTokenNetworkSelected =
      splittedUrl[3] === 'testnet' ? 'testnet' : 'mainnet'

    const page = history.location.pathname.split('/')[2]
    const pToken = this.props.pTokensAvailable.find(
      pToken =>
        pToken.name.toLowerCase() === pTokenNameSelected &&
        pToken.network === pTokenNetworkSelected
    )

    this.props.setSelectedpToken(pToken, pTokenNetworkSelected)

    if (!page) {
      this.props.setSelectedPage(0, pToken)
    } else {
      this.props.setSelectedPage(pageNameToNumbers[page], pToken)
    }
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

          this.props.pNetworkDataReset()
          this.props.setSelectedpToken(
            pToken,
            this.props.detectedRedeemerNetwork
          )

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
