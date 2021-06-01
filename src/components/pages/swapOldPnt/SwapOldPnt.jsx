import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Container } from 'react-bootstrap'
import Progress from '../../molecules/progress/Progress'
import { useSwap } from '../../../hooks/use-old-pnt-swap'
import SwapLine from '../../organisms/swapLine/SwapLine'
import { useAssets } from '../../../hooks/use-assets'
import InfoModal from '../../organisms/infoModal/InfoModal'
import { OuterContainerSwap, ContainerSwap, SwapLabel, ContainerSwapButton, SwapButton } from '../swap/Swap'

const Divider = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  @media (max-width: 767.98px) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
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
              <Divider />
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
                <SwapButton
                  onClick={onSwap}
                  disabled={swapButton.disabled || (address === '' && swapButton.text !== 'Connect Wallet')}
                >
                  {swapButton.text}
                </SwapButton>
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
