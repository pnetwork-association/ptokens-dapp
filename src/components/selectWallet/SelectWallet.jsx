import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import settings from '../../settings'

const ImageBordered = styled.img`
  position: relative;
  width: 40px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
`

const ArrowImage = styled.img`
  position: relative;
  width: 16px;
  cursor: pointer;
`

const StyledBody = styled(Modal.Body)`
  height: auto;
  background: rgba(71, 89, 101, 0.05);
  color: #475965;
  font-size: 18px;
`

const StyledHeader = styled(Modal.Header)`
  background: rgba(71, 89, 101, 0.05);
`

const StyledRow = styled(Row)`
  margin-top: 20px !important;
  cursor: pointer;
`

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const SelectWallet = _props => {
  const { show, onClose, onSelect } = _props

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <StyledHeader>
        <StyledModalTitle>Select The Blockchain</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {settings.supportedBlockchains.map(({ name, symbol }) => (
          <StyledRow key={`${name}-${symbol}`} onClick={() => onSelect(symbol)}>
            <Col xs={2}>
              <ImageBordered src={`../assets/tokens/${symbol}-mainnet.png`} />
            </Col>
            <Col xs={8} className="text-center my-auto">
              {name}
            </Col>
            <Col xs={2} className="text-right">
              <ArrowImage src={`../assets/right-arrow.png`} />
            </Col>
          </StyledRow>
        ))}
      </StyledBody>
    </Modal>
  )
}

SelectWallet.propTypes = {
  show: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func
}

export default SelectWallet
