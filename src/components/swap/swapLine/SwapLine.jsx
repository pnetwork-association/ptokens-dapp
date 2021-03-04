import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { capitalizeAllLettersExceptFirst } from '../../../utils/capitalize'

const SwapLineContainer = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(71, 89, 101, 0.3);
  padding: 12px 15px 12px 15px;
`

const AmountInput = styled.input`
  border: 0;
  background: transparent;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  caret-color: #32b1f5;
  text-align: right;
  font-size: 40px;
  color: #475965;
  width: 100%;
`

const ContainerImage = styled.div`
  border-radius: 50%;
`

const Image = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
  box-shadow: #475965 1px 1px 9px -3px;
`

const MiniImage = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  margin-top: 33px;
  margin-left: -15px;
  border: 1px solid rgba(71, 89, 101, 0.3);
  box-shadow: #475965 1px 1px 9px -3px;
  background: white;
  box-shadow: #475965 1px 1px 9px -3px;
`

const BalanceLabel = styled.label`
  font-size: 13px;
  color: #475965;
  margin-bottom: 5px;
`

const AddressInput = styled.input`
  border: 0;
  background: transparent;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  caret-color: #32b1f5;
  text-align: right;
  font-size: 16px;
  color: #475965;
  width: 100%;
`

const InnerContainerAddressInput = styled.div`
  width: 100%;
  border-top: 1px solid rgba(71, 89, 101, 0.3);
  margin-top: 15px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`

const OuterContainerAddressInput = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`

const ContainerBalance = styled.div`
  display: inline-block;
`

const ContainerAmountInput = styled.div`
  display: inline-block;
`

const ContainerImageAndMaxButton = styled(Col)`
  display: flex;
  margin-bottom: auto !important;
`

const MaxButton = styled.button`
  margin-left: 15px;
  border-radius: 5px;
  border: 0;
  color: #66b8ff;
  background: #66b8ff40;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  height: 25px;
  outline: none !important;
  box-shadow: none;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
  &:hover {
    background: #66b8ff61;
  }
`

const ContainerMaxButton = styled.div`
  position: relative;
  min-height: auto;
`

const ContainerTypeAndBalance = styled(Row)`
  margin-bottom: 10px;
  color: #475965;
`

const SwapLine = ({
  asset,
  amount,
  address,
  defaultImage,
  defaultMiniImage,
  title,
  onChangeAmount,
  onClickImage,
  onChangeAddress,
  onMax
}) => {
  return (
    <SwapLineContainer>
      <ContainerTypeAndBalance>
        <Col xs={6} className="my-auto">
          {title}
        </Col>
        {asset && asset.formattedBalance !== '-' ? (
          <Col xs={6} className="text-right my-auto">
            <ContainerBalance>
              <BalanceLabel>{`Balance: ${asset.formattedBalance} ${
                asset.isPtoken ? capitalizeAllLettersExceptFirst(asset.symbol) : asset.symbol
              }`}</BalanceLabel>
            </ContainerBalance>
          </Col>
        ) : null}
      </ContainerTypeAndBalance>
      <Row>
        <ContainerImageAndMaxButton xs={4} className="my-auto">
          <ContainerImage onClick={() => onClickImage()}>
            <Image src={asset ? asset.image : defaultImage} onClick={() => onClickImage()} />
            {(asset && asset.withMiniImage) || (!asset && defaultMiniImage) ? (
              <MiniImage src={!asset ? defaultMiniImage : asset.miniImage} />
            ) : null}
          </ContainerImage>{' '}
          {asset && asset.formattedBalance !== '-' ? (
            <ContainerMaxButton>
              <MaxButton onClick={onMax}>MAX</MaxButton>
            </ContainerMaxButton>
          ) : null}
        </ContainerImageAndMaxButton>
        <Col xs={8} className="text-right my-auto">
          <ContainerAmountInput>
            <AmountInput
              type="number"
              placeholder="0.0"
              onChange={_e => onChangeAmount(_e.target.value.toString())}
              value={amount}
            />
          </ContainerAmountInput>
        </Col>
      </Row>
      {address || address === '' ? (
        <Row>
          <OuterContainerAddressInput>
            <InnerContainerAddressInput>
              <AddressInput
                placeholder="to address"
                value={address}
                onChange={_e => onChangeAddress(_e.target.value)}
              />
            </InnerContainerAddressInput>
          </OuterContainerAddressInput>
        </Row>
      ) : null}
    </SwapLineContainer>
  )
}

SwapLine.propTypes = {
  asset: PropTypes.object,
  amount: PropTypes.string,
  address: PropTypes.string,
  defaultImage: PropTypes.string,
  defaultMiniImage: PropTypes.string,
  onChangeAmount: PropTypes.func,
  onClickImage: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onMax: PropTypes.func
}

export default SwapLine
