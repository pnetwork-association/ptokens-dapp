import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import { blockchainSymbolToCoin } from '../../../utils/maps'
import ReactTooltip from 'react-tooltip'
import { copyToClipboard } from '../../../utils/utils'
import Modal from '../../molecules/modal/Modal'

const ContainerQrCode = styled.div`
  text-align: center;
  padding: 25px;
  & > canvas {
    height: 270px !important;
    width: 270px !important;
  }
  @media (max-width: 767.98px) {
    & > canvas {
      height: 200px !important;
      width: 200px !important;
    }
  }
`

const Info = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.text2};
  @media (max-width: 767.98px) {
    font-size: 14px;
    padding: 25px 0 25px 0;
  }
`

const Address = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 25px;
  width: 100%;
  cursor: pointer;
  border-radius: 20px;
  font-size: 17px;
  background: ${({ theme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }) => theme.secondary4Hovered};
  }
  @media (max-width: 767.98px) {
    font-size: 13px;
  }
`

const OuterContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`

const DepositAddressModal = ({ show, asset, onClose, value }) => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(0)

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <React.Fragment>
      <Modal
        show={show}
        onClose={onClose}
        title={`${asset ? blockchainSymbolToCoin[asset.nativeSymbol] : ''} Deposit Address`}
        body={
          <OuterContainer>
            <ContainerQrCode>
              <QRCode value={value ? value : ''} />
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
              {value ? value : ''}
            </Address>
            <Info>{`Send your ${asset ? asset.nativeSymbol : '-'} to the ${
              asset ? blockchainSymbolToCoin[asset.nativeSymbol] : ''
            } deposit address above. The asset will be made compatibile with your blockchain of choise and directly accredited on the specified destination address.`}</Info>
            <ReactTooltip getContent={() => (isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard')} />
          </OuterContainer>
        }
      />
    </React.Fragment>
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
