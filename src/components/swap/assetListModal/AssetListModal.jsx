import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const AssetListModal = _props => {
  const { show, onClose } = _props

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Hello!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Hello</Modal.Body>
    </Modal>
  )
}

AssetListModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func
}

export default AssetListModal
