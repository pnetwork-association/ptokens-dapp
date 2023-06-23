import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { migrate, resetProgress, updateMigrateButton } from '../../../store/migration/migration.actions'
import { selectPage, updateInfoModal } from '../../../store/pages/pages.actions'
import { connectWithWallet } from '../../../store/wallets/wallets.actions'

import Migration from './Migration'

const mapStateToProps = (_state) => {
  return {
    assets: _state.migration.assets,
    wallets: _state.wallets,
    progress: _state.migration.progress,
    migrateButton: _state.migration.migrateButton,
    infoModal: _state.pages.infoModal,
  }
}

const mapDispatchToProps = (_dispatch) => {
  return {
    connectWithWallet: (_blockchain) => _dispatch(connectWithWallet(_blockchain)),
    migrate: (_strategy, _amount, _from, _to, _options) => _dispatch(migrate(_strategy, _amount, _from, _to, _options)),
    resetProgress: () => _dispatch(resetProgress()),
    updateMigrateButton: (_text, _disabled) => _dispatch(updateMigrateButton(_text, _disabled)),
    selectPage: (_page) => _dispatch(selectPage(_page)),
    hideInfoModal: () => _dispatch(updateInfoModal({ show: false, message: null })),
  }
}

const MigrationController = (_props) => <Migration {..._props} />

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
  selectPage: PropTypes.func,
  hideInfoModal: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationController)
