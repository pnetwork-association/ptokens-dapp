import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import { blockchainSymbolToCoin } from '../../../utils/maps'
import ReactTooltip from 'react-tooltip'
import { copyToClipboard } from '../../../utils/utils'

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
  font-size: 16px;
`

const Address = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
  cursor: pointer;
  background: #e8e8e8;
  border-radius: 20px;
  &:hover {
    background: #d6d4d4;
  }
`

const DepositAddressModal = ({ show, asset, onClose, value }) => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(0)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [isCopiedToClipboard])

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
        <Address
          data-tip={isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard'}
          onClick={() => {
            setIsCopiedToClipboard(true)
            copyToClipboard(value)
            setTimeout(() => {
              setIsCopiedToClipboard(false)
            }, 3000)
          }}
        >
          {value ? `${value.slice(0, 12)}...${value.slice(value.length - 10, value.length)}` : ''}
        </Address>
        <Info>{`Send your ${asset ? blockchainSymbolToCoin[asset.nativeSymbol] : ''} here ecc ecc ecc`}</Info>
      </StyledBody>
      <ReactTooltip />
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
