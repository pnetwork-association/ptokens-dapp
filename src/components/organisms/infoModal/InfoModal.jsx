import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '../../molecules/modal/Modal'

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
    <Modal
      show={show}
      onClose={onClose}
      title={''}
      body={
        <React.Fragment>
          {' '}
          <SuccessImage src={`../assets/svg/${image}.svg`} />
          <Message>{'Pegin happened successfully!'}</Message>
        </React.Fragment>
      }
    />
  )
}

InfoModal.propTypes = {
  message: PropTypes.string,
  image: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
}

export default InfoModal
