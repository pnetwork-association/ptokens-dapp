import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import { blockchainSymbolToCoin } from '../../../utils/maps'

const StyledBody = styled(Modal.Body)`
  color: #475965;
  font-size: 18px;
  padding-left: 0;
  padding-top: 45px;
  padding-bottom: 45px;
  padding-right: 0;
  margin: auto;
`

const StyledHeader = styled(Modal.Header)``

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const ContainerQrCode = styled.div`
  padding: 25px;
`

const Info = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
`

const DepositAddressModal = ({ show, asset, onClose, value }) => {
  return (
    <Modal show={show} aria-labelledby="contained-modal-deposit-address" centered onHide={onClose}>
      <StyledHeader>
        {/*NOTE: blockchainSymbolToCoin works because we use deposit addresses to wrap ONLY native assets*/}
        <StyledModalTitle>{`${
          asset ? blockchainSymbolToCoin[asset.nativeSymbol] : ''
        } Deposit Address`}</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        <ContainerQrCode>
          <QRCode value={value ? value : ''} size={'170'} />
        </ContainerQrCode>
        <Info>{`Send your ${asset ? blockchainSymbolToCoin[asset.nativeSymbol] : ''} here ecc ecc ecc`}</Info>
      </StyledBody>
    </Modal>
  )
}

DepositAddressModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  asset: PropTypes.object,
  value: PropTypes.string,
  assets: PropTypes.array,
  onClose: PropTypes.func
}

export default DepositAddressModal
