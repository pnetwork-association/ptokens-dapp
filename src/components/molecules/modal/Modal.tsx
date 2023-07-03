import PropTypes from 'prop-types'
import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

const StyledModalTitle = styled(Modal.Title)`
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 20px;
  }
`

const StyledBody = styled(Modal.Body)`
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`

const StyledHeader = styled(Modal.Header)`
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
  border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.lightGray};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  span {
    color: ${({ theme }: { theme: ITheme }) => theme.text1};
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
  body: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClose: PropTypes.func,
}

export default MyModal
