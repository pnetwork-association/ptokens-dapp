import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Image = styled.img`
  position: relative;
  width: 40px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
`

const MiniImage = styled.img`
  position: absolute;
  width: 16px;
  background: white;
  border-radius: 50%;
  margin-top: 27px;
  margin-left: -13px;
  border: 1px solid rgba(71, 89, 101, 0.3);
`

const StyledBody = styled(Modal.Body)`
  height: 600px;
  max-height: 600px;
  overflow: auto;
  background: rgba(71, 89, 101, 0.05);
  color: #475965;
  font-size: 18px;
`

const StyledRow = styled(Row)`
  margin-top: 20px !important;
  cursor: pointer;
`

const StyledHeader = styled(Modal.Header)`
  background: rgba(71, 89, 101, 0.05);
`

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const AssetListModal = _props => {
  const { show, onClose, assets } = _props

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <StyledHeader>
        <StyledModalTitle>Assets</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {assets.map(({ name, blockchain, network, formattedBalance, formattedName }) => (
          <StyledRow key={`${name}-on-${blockchain}-${network}`}>
            <Col xs={2}>
              <Image src={`../assets/${name}-${network}.png`} />
              {blockchain ? <MiniImage src={`../assets/${blockchain}-${network}.png`} /> : null}
            </Col>
            <Col xs={8} className="text-center my-auto">
              <Col xs={12}>{formattedName}</Col>
            </Col>
            <Col xs={2} className="my-auto">
              {formattedBalance}
            </Col>
          </StyledRow>
        ))}
      </StyledBody>
    </Modal>
  )
}

AssetListModal.propTypes = {
  show: PropTypes.bool,
  assets: PropTypes.array,
  onClose: PropTypes.func
}

export default AssetListModal
