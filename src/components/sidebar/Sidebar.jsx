import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'react-bootstrap'
import settings from '../../settings'

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  renderpTokensAvatar = () => {
    switch (this.props.pTokenSelected.name) {
      case 'pETH':
        return (
          <img
            src="../assets/pETH.png"
            alt="pETH avatar"
            height="30"
            width="30"
          />
        )
      case 'pBTC':
        return (
          <img
            src={`../assets/pBTC-${this.props.pTokenSelected.network}.png`}
            alt="pBTC avatar"
            height="30"
            width="30"
          />
        )
      case 'pLTC':
        return (
          <img
            src="../assets/pLTC.png"
            alt="pLTC avatar"
            height="30"
            width="30"
          />
        )
      case 'pDAI':
        return (
          <img
            src="../assets/pDAI.png"
            alt="pDAI avatar"
            height="30"
            width="30"
          />
        )
      default:
        return <img src={null} alt="null avatar" />
    }
  }

  renderpTokensList = () => {
    return (
      <ul className="navbar-nav">
        {this.props.pTokensAvailable
          .filter(pToken => pToken.id !== this.props.pTokenSelected.id)
          .map(pToken => {
            return (
              <li
                key={pToken.id}
                onClick={() => {
                  this.props.onChangeSelectedpToken(pToken)
                  this.props.onChangeCollapseState()
                }}
              >
                <span className="pt-5 nav-link pb-5 ml-20 text-xs">
                  {pToken.name} on {pToken.redeemFrom}{' '}
                  {pToken.network === 'testnet' ? '(testnet)' : ''}
                </span>
              </li>
            )
          })}
      </ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        {/*MOBILE*/}
        <nav className="show-mobile container-header-menu-mobile sticky-top pb-1">
          <div className="row ">
            <div className="col-2">
              <div className="container">
                <div className="row">
                  <div className="col-12 d-flex justify-content-left cursor-pointer pl-0 pr-0">
                    <div className="text-center">
                      {
                        <div
                          className={
                            this.props.isCollapseOpened
                              ? 'dropdown show'
                              : 'dropdown'
                          }
                        >
                          <div
                            onClick={e => {
                              e.preventDefault()
                              this.props.onChangeCollapseState()
                            }}
                            className="avatar"
                          >
                            {this.renderpTokensAvatar()}
                            <div
                              className={
                                this.props.isCollapseOpened
                                  ? 'dropdown-menu show'
                                  : 'dropdown-menu'
                              }
                            >
                              {this.renderpTokensList()}
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-10 pr-0 my-auto">
              <div className="container">
                <div className="row">
                  {['home', 'add', 'shape'].map((_option, _index) => {
                    return (
                      <div
                        key={_index}
                        onClick={() => this.props.onChangePage(_index)}
                        className="col-4 d-flex justify-content-center cursor-pointer my-auto pr-0"
                      >
                        <div className="text-center">
                          <i className={`icon ${_option}`}></i>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/*DESKTOP*/}
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md sidebar hidden-mobile">
          <div className="container-fluid">
            <div className="navbar-brand text-white text-xl mt-40">pTokens</div>
            <div className="collapse navbar-collapse">
              <div className="navbar-divider mt-40 mb-10"></div>

              <div className="pTokens">
                <div className="avatar">{this.renderpTokensAvatar()}</div>
                <div className="info">
                  <p
                    className="mb-10"
                    onClick={() => {
                      this.props.onChangeCollapseState()
                    }}
                  >
                    <span>
                      {this.props.pTokenSelected.name} on{' '}
                      {this.props.pTokenSelected.redeemFrom}{' '}
                      {this.props.pTokenSelected.network === 'testnet'
                        ? '(testnet)'
                        : ''}
                      {
                        <b
                          className={
                            this.props.isCollapseOpened
                              ? 'caret rotate-180'
                              : 'caret'
                          }
                        />
                      }
                    </span>
                  </p>
                  <Collapse in={this.props.isCollapseOpened}>
                    {this.renderpTokensList()}
                  </Collapse>
                </div>
              </div>

              <div className="navbar-divider mb-10"></div>
              <ul className="navbar-nav">
                {[
                  {
                    name: 'Dashboard',
                    icon: 'home'
                  },
                  {
                    name: 'Issue & Redeem',
                    icon: 'add'
                  },
                  {
                    name: 'pNetwork',
                    icon: 'shape'
                  }
                ].map(({ name, icon }, _index) => {
                  return (
                    <li className="nav-item" key={_index}>
                      <span
                        onClick={() => this.props.onChangePage(_index)}
                        className={
                          this.props.page === _index
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <i className={`icon ${icon}`}></i>
                        {name}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="navbar-divider mt-10"></div>
            </div>
            <span className="navbar-vertical-logo p-0"></span>
            <ul className="navbar-nav m-0">
              <li className="nav-item">
                <span className="nav-link active text-xxs justify-content-center">
                  <a
                    href={settings.telegram}
                    className="text-white text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-telegram fa-lg" aria-hidden="true" />{' '}
                    Join us on Telegram
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

Sidebar.propTypes = {
  page: PropTypes.number,
  onChangePage: PropTypes.func
}

export default Sidebar
