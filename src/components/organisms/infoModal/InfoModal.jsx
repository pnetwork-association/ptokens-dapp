import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const StyledBody = styled(Modal.Body)`
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  padding-left: 0;
  padding-right: 0;
  text-align: center;
`

const StyledHeader = styled(Modal.Header)`
  border-bottom: 0px;
`

const Message = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
  font-size: 16px;
`

const SuccessImage = styled.img`
  width: 150px;
  height: 150px;
`

const InfoModal = ({ show, message, image, onClose }) => {
  return (
    <Modal show={show} aria-labelledby="contained-modal-success" centered onHide={onClose}>
      <StyledHeader closeButton></StyledHeader>
      <StyledBody>
        <SuccessImage src={`../assets/svg/${image}.svg`} />
        <Message>{'Pegin happened successfully!'}</Message>
      </StyledBody>
      <ReactTooltip />
    </Modal>
  )
}

InfoModal.propTypes = {
  message: PropTypes.string,
  image: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
}

export default InfoModal
