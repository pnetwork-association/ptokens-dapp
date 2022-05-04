import React from 'react'
import { connect } from 'react-redux'
import MigrationHome from './MigrationHome'
import PropTypes from 'prop-types'
import { selectPage } from '../../../store/pages/pages.actions'
import { loadMigrationData } from '../../../store/migration/migration.actions'

const mapStateToProps = _state => {
  return {}
}
const mapDispatchToProps = _dispatch => {
  return {
    loadMigrationData: _options => _dispatch(loadMigrationData(_options)),
    selectPage: (_page, _options) => _dispatch(selectPage(_page, _options))
  }
}

const MigrationHomeController = _props => {
  return <MigrationHome {..._props} />
}

MigrationHomeController.propTypes = {
  selectPage: PropTypes.func.isRequired,
  loadMigrationData: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationHomeController)
