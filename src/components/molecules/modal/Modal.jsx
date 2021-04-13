import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledModalTitle = styled(Modal.Title)`
  color: ${({ theme }) => theme.text1};
`

const StyledBody = styled(Modal.Body)`
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
  background: ${({ theme }) => theme.bg1};
`

const StyledHeader = styled(Modal.Header)`
  background: ${({ theme }) => theme.bg1};
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};

  span {
    color: ${({ theme }) => theme.text1};
  }
`

const MyModal = ({ show, title, body, onClose }) => {
  return (
    <Modal show={show} aria-labelledby="modal" centered onHide={onClose}>
      <StyledHeader closeButton>
        <StyledModalTitle>{title}</StyledModalTitle>
      </StyledHeader>
      <StyledBody>{body}</StyledBody>
    </Modal>
  )
}

MyModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  body: PropTypes.object,
  onClose: PropTypes.func
}

export default MyModal
