import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { loadMigrationData } from '../../../store/migration/migration.actions'
import { selectPage } from '../../../store/pages/pages.actions'

import MigrationHome from './MigrationHome'

const mapStateToProps = (_state) => {
  return {
    apys: _state.migration.apys,
  }
}
const mapDispatchToProps = (_dispatch) => {
  return {
    loadMigrationData: (_options) => _dispatch(loadMigrationData(_options)),
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options)),
  }
}

const MigrationHomeController = (_props) => {
  return <MigrationHome {..._props} />
}

MigrationHomeController.propTypes = {
  selectPage: PropTypes.func.isRequired,
  loadMigrationData: PropTypes.func.isRequired,
  apys: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationHomeController)
