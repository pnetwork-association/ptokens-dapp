import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Container, Col } from 'react-bootstrap'
import Progress from '../../molecules/progress/Progress'
import { useSwap } from '../../../hooks/use-old-pnt-swap'
import SwapLine from '../../organisms/swapLine/SwapLine'
import { useAssets } from '../../../hooks/use-assets'
import InfoModal from '../../organisms/infoModal/InfoModal'
import {
  OuterContainerSwap,
  ContainerSwap,
  SwapLabel,
  ContainerSwapButton,
  ArrowContainer,
  SortIcon
} from '../swap/Swap'
import Button from '../../atoms/button/Button'

const StyledArrowContainer = styled(ArrowContainer)`
  cursor: default;
`

const StyledSortIcon = styled(SortIcon)`
  cursor: default;
`

const TitleCol = styled(Col)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text1};
  font-size: 20px;
`

const SwapOldPnt = ({
  assets: _assets,
  wallets,
  progress,
  infoModal,
  connectWithWallet,
  swapButton,
  updateSwapButton,
  hideDepositAddressModal,
  swap,
  hideInfoModal
}) => {
  const [assets] = useAssets(_assets)

  const {
    from,
    to,
    address,
    setAddress,
    fromAmount,
    toAmount,
    fromWallet,
    toWallet,
    onChangeAmount,
    onMax,
    onSwap
  } = useSwap({
    progress,
    wallets,
    assets,
    connectWithWallet,
    swap,
    swapButton,
    updateSwapButton,
    hideDepositAddressModal
  })

  return (
    <React.Fragment>
      <Container>
        <Row>
          <TitleCol>{'PNT Converter (binance bridge -> pnetwork bridge)'}</TitleCol>
        </Row>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <SwapLabel>Swap</SwapLabel>
              <SwapLine
                title="From"
                asset={from}
                amount={fromAmount}
                wallet={fromWallet}
                onChangeAmount={onChangeAmount}
                onClickImage={() => ({})}
                onMax={onMax}
              />
              <StyledArrowContainer>
                <StyledSortIcon icon="down-arrow" />
              </StyledArrowContainer>
              <SwapLine
                title="To"
                asset={to}
                amount={toAmount}
                address={address}
                wallet={toWallet}
                hideMaxButton={true}
                onChangeAmount={onChangeAmount}
                onClickImage={() => ({})}
                onChangeAddress={setAddress}
              />
              {progress.show ? (
                <Progress percent={progress.percent} message={progress.message} steps={progress.steps} />
              ) : null}
              <ContainerSwapButton>
                <Button
                  onClick={swapButton.link ? window.open(swapButton.link, '_blank', 'noopener,noreferrer') : onSwap}
                  disabled={
                    swapButton.link
                      ? false
                      : swapButton.disabled || (address === '' && swapButton.text !== 'Connect Wallet')
                  }
                >
                  {swapButton.text}
                </Button>
              </ContainerSwapButton>
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      <InfoModal onClose={hideInfoModal} {...infoModal} />
    </React.Fragment>
  )
}

SwapOldPnt.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func
}

export default SwapOldPnt
