import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { capitalizeAllLettersExceptFirst } from '../../../utils/capitalize'
import AssetInfo from '../assetInfo/AssetInfo'
import Icon from '../../atoms/icon/Icon'

const SwapLineContainer = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  padding: 12px 15px 12px 15px;
  @media (max-width: 767.98px) {
    padding: 10px 15px 10px 15px;
  }
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
  color: ${({ theme }) => theme.text1};
  width: 100%;
  @media (max-width: 767.98px) {
    font-size: 35px;
  }
`

export const ContainerImage = styled.div`
  border-radius: 50%;
`

export const Image = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => (theme.type === 'light' ? 'white' : 'transparent')};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => (theme.type === 'light' ? theme.lightGray : 'transparent')};
  cursor: ${({ onClickImage }) => (onClickImage ? 'pointer' : 'normal')};
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
  @media (max-width: 767.98px) {
    width: 40px;
    height: 40px;
  }
`

export const MiniImage = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 33px;
  margin-left: -15px;
  border: 1px solid ${({ theme }) => (theme.type === 'light' ? theme.lightGray : 'transparent')};
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
  background: white;
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
  @media (max-width: 767.98px) {
    width: 16px;
    height: 16px;
    margin-top: 29px;
    margin-left: -13px;
  }
`

const BalanceLabel = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.text1};
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
  color: ${({ theme }) => theme.text1};
  width: 100%;
  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`

const InnerContainerAddressInput = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.lightGray};
  margin-top: 15px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: 767.98px) {
    margin-top: 10px;
    padding-top: 5px;
  }
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
  color: ${({ theme }) => theme.blue};
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
  @media (max-width: 767.98px) {
    font-size: 10px;
    height: 22px;
  }
`

const ContainerMaxButton = styled.div`
  position: relative;
  min-height: auto;
  margin-bottom: 10px;
`

const ContainerTypeAndBalance = styled(Row)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    margin-bottom: 0px;
  }
`

const ContainerTitle = styled(Col)`
  color: ${({ theme }) => theme.text2};
  margin-bottom: auto !important;
  font-size: 14px;
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const ExpandContainer = styled(Col)`
  text-align: right;
  margin-top: 5px;
`

const Expand = styled.span`
  color: ${({ theme }) => theme.text2};
  font-size: 12px;
  cursor: pointer;
`

const Arrow = styled(Icon)`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  svg {
    fill: ${({ theme }) => (theme.type === 'light' ? theme.text1 : 'white')};
  }
`

const SwapLine = ({
  asset,
  amount,
  address,
  defaultImage,
  defaultMiniImage,
  title,
  wallet,
  hideMaxButton,
  onChangeAmount,
  onClickImage,
  onChangeAddress,
  onMax,
  withTitleLabel,
  disableInput = false,
  inputType = 'number',
  inputPlaceholder = '0.0',
  ..._props
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [id, setId] = useState(false)

  // NOTE: avoid to close show info when asset is reloaded with the balance
  useEffect(() => {
    if (asset && asset.id !== id) {
      setShowInfo(false)
      setId(asset.id)
    }
  }, [asset, id])

  const formattedTitle = useMemo(() => {
    if (!withTitleLabel || !asset || !asset.titleLabel) return title

    return `${title}: ${asset.titleLabel}`
  }, [title, asset, withTitleLabel])

  return (
    <SwapLineContainer {..._props}>
      <ContainerTypeAndBalance>
        <ContainerTitle xs={6}>{formattedTitle}</ContainerTitle>
        {asset && asset.formattedBalance !== '-' ? (
          <Col xs={6} className="text-right my-auto">
            <ContainerBalance>
              <BalanceLabel>{`Balance: ${asset.formattedBalance} ${
                asset.symbolToDisplay
                  ? asset.symbolToDisplay
                  : !asset.isNative && !asset.isSpecial
                  ? capitalizeAllLettersExceptFirst(asset.symbol)
                  : asset.symbol
              }`}</BalanceLabel>
            </ContainerBalance>
          </Col>
        ) : null}
      </ContainerTypeAndBalance>
      <Row>
        <ContainerImageAndMaxButton xs={4} className="my-auto">
          <ContainerImage onClick={() => onClickImage && onClickImage()}>
            <Image src={asset ? asset.image : defaultImage} onClick={() => onClickImage && onClickImage()} />
            {(asset && asset.withMiniImage) || (!asset && defaultMiniImage) ? (
              <MiniImage src={!asset ? defaultMiniImage : asset.miniImage} />
            ) : null}
          </ContainerImage>{' '}
          {asset && asset.formattedBalance !== '-' && !hideMaxButton ? (
            <ContainerMaxButton>
              <MaxButton onClick={onMax}>MAX</MaxButton>
            </ContainerMaxButton>
          ) : null}
        </ContainerImageAndMaxButton>
        <Col xs={8} className="text-right my-auto pl-0">
          <ContainerAmountInput>
            <AmountInput
              type={inputType}
              placeholder={inputPlaceholder}
              disabled={disableInput}
              onChange={_e => onChangeAmount(_e.target.value.toString())}
              value={amount}
            />
          </ContainerAmountInput>
        </Col>
      </Row>
      <Row>
        <ExpandContainer>
          <Expand onClick={() => setShowInfo(!showInfo)}>
            {asset && asset.address ? (
              <React.Fragment>
                <Arrow icon={showInfo ? 'arrow-up' : 'arrow-down'} />
              </React.Fragment>
            ) : (
              ''
            )}
          </Expand>
        </ExpandContainer>
      </Row>
      {address || address === '' ? (
        <Row>
          <OuterContainerAddressInput>
            <InnerContainerAddressInput>
              <AddressInput
                placeholder="destination address"
                value={address}
                onChange={_e => onChangeAddress(_e.target.value)}
              />
            </InnerContainerAddressInput>
          </OuterContainerAddressInput>
        </Row>
      ) : null}
      {showInfo ? <AssetInfo asset={asset} wallet={wallet} /> : null}
    </SwapLineContainer>
  )
}

SwapLine.propTypes = {
  asset: PropTypes.object,
  amount: PropTypes.string,
  address: PropTypes.string,
  wallets: PropTypes.object,
  defaultImage: PropTypes.string,
  defaultMiniImage: PropTypes.string,
  hideMaxButton: PropTypes.bool,
  onChangeAmount: PropTypes.func,
  onClickImage: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onMax: PropTypes.func,
  withTitleLabel: PropTypes.bool,
  disableInput: PropTypes.bool,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string
}

SwapLine.defaultProps = {
  hideMaxButton: false
}

export default SwapLine
