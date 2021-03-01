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
`

const StyledRow = styled(Row)`
  margin-top: 10px !important;
  cursor: pointer;
`

const AssetListModal = _props => {
  const { show, onClose, assets } = _props

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Assets</Modal.Title>
      </Modal.Header>
      <StyledBody>
        {assets.map(({ name, redeemFrom, network }) => (
          <StyledRow key={`${name}-on-${redeemFrom}-${network}`}>
            <Col xs={2}>
              <Image src={`../assets/${name}-${network}.png`} />
              {redeemFrom ? <MiniImage src={`../assets/${redeemFrom}-${network}.png`} /> : null}
            </Col>
            <Col xs={8}>
              <Col xs={12}>
                {name === 'BTC' || name === 'EOS' || name === 'LTC' || name === 'ETH'
                  ? name
                  : `${name} on ${redeemFrom}`}
              </Col>
            </Col>
            <Col xs={2}>{name === 'BTC' || name === 'LTC' ? '-' : '0.00'}</Col>
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
