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
  const { show, assets, onClose, onSelect } = _props

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <StyledHeader>
        <StyledModalTitle>Assets</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {assets.map(_asset => {
          const { name, blockchain, network, formattedBalance, formattedName, withMiniImage, image, miniImage } = _asset
          return (
            <StyledRow key={`${name}-on-${blockchain}-${network}`} onClick={() => onSelect(_asset)}>
              <Col xs={3}>
                <Image src={image} />
                {withMiniImage ? <MiniImage src={miniImage} /> : null}
              </Col>
              <Col xs={6} className="text-center my-auto">
                {formattedName}
              </Col>
              <Col xs={3} className="my-auto text-right">
                {formattedBalance}
              </Col>
            </StyledRow>
          )
        })}
      </StyledBody>
    </Modal>
  )
}

AssetListModal.propTypes = {
  show: PropTypes.bool,
  assets: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func
}

export default AssetListModal
