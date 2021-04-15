import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '../../molecules/modal/Modal'
import Icon from '../../atoms/icon/Icon'

const Message = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
  font-size: 16px;
`

const ContainerCenter = styled.div`
  text-align: center;
`

const StyledIcon = styled(Icon)`
  width: 150px;
  height: 150px;
`

const InfoModal = ({ show, text, icon, onClose }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={''}
      body={
        <ContainerCenter>
          {' '}
          {icon ? <StyledIcon icon={icon} /> : null}
          <Message>{text}</Message>
        </ContainerCenter>
      }
    />
  )
}

InfoModal.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
}

export default InfoModal
