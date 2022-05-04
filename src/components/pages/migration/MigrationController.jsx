import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Migration from './Migration'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'
import { migrate, resetProgress, updateMigrateButton } from '../../../store/migration/migration.actions'
import { selectPage } from '../../../store/pages/pages.actions'

const mapStateToProps = _state => {
  return {
    assets: _state.migration.assets,
    wallets: _state.wallets,
    progress: _state.migration.progress,
    migrateButton: _state.migration.migrateButton
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    connectWithWallet: _blockchain => _dispatch(connectWithWallet(_blockchain)),
    migrate: (_from, _to, _amount, _address, _options) => _dispatch(migrate(_from, _to, _amount, _address, _options)),
    resetProgress: () => _dispatch(resetProgress()),
    updateMigrateButton: (_text, _disabled) => _dispatch(updateMigrateButton(_text, _disabled)),
    selectPage: _page => _dispatch(selectPage(_page))
  }
}

const MigrationController = _props => <Migration {..._props} />

MigrationController.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  infoModal: PropTypes.object,
  migrateButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  migrate: PropTypes.func,
  resetProgress: PropTypes.func,
  updateMigrateButton: PropTypes.func,
  selectPage: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationController)
