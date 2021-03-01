import React from 'react'
import PropTypes from 'prop-types'
import settings from '../../settings'

const Sidebar = _props => {
  return (
    <React.Fragment>
      {/*MOBILE*/}
      <nav className="show-mobile container-header-menu-mobile sticky-top pb-1">
        <div className="row ">
          <div className="col-12 pr-0 my-auto">
            <div className="container">
              <div className="row">
                {['home', 'add', 'shape', 'add'].map((_option, _index) => {
                  return (
                    <div
                      key={_index}
                      onClick={() => _props.onChangePage(_index)}
                      className="col-3 d-flex justify-content-center cursor-pointer my-auto pr-0"
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
                },
                {
                  name: 'Swap',
                  icon: 'add'
                }
              ].map(({ name, icon }, _index) => {
                return (
                  <li className="nav-item" key={_index}>
                    <span
                      onClick={() => _props.onChangePage(_index)}
                      className={_props.page === _index ? 'nav-link active' : 'nav-link'}
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
                <a href={settings.telegram} className="text-white text-sm" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-telegram fa-lg" aria-hidden="true" /> Join us on Telegram
                </a>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  page: PropTypes.number,
  onChangePage: PropTypes.func
}

export default Sidebar
