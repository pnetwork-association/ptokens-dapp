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
  padding: 0;
`

const StyledHeader = styled(Modal.Header)`
  background: rgba(71, 89, 101, 0.05);
`

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const ContainerInnerRow = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
  &:hover {
    background: #ececec;
  }
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
          <ContainerInnerRow key={`${name}-${symbol}`}>
            <Row onClick={() => onSelect(symbol)}>
              <Col xs={2} className="my-auto">
                <ImageBordered src={`../assets/tokens/${symbol}-mainnet.png`} />
              </Col>
              <Col xs={8} className="my-auto">
                {name}
              </Col>
              <Col xs={2} className="text-right my-auto">
                <ArrowImage src={`../assets/right-arrow.png`} />
              </Col>
            </Row>
          </ContainerInnerRow>
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
