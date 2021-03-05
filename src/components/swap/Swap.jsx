import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Container } from 'react-bootstrap'
import AssetListModal from './assetListModal/AssetListModal'
import Progress from './progress/Progress'
import { useSwap } from '../../hooks/use-swap'
import SwapLine from './swapLine/SwapLine'
import DepositAddressModal from './depositAddressModal/DepositAddressModal'
import InfoModal from './infoModal/InfoModal'
import defaultAssets from '../../settings/swap-assets'

const OuterContainerSwap = styled.div`
  @media (max-width: 767.98px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const ContainerSwap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  border: 0;
  border-radius: 20px;
  background: white;
  height: 100%;
  padding: 15px;
  width: 460px;
  @media (max-width: 767.98px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const DescendantImageContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
`

const DescendantImage = styled.img`
  width: 18px;
  height: 18px;
`

const ContainerSwapButton = styled.div`
  margin-top: 30px;
`

const SwapButton = styled.button`
  width: 100%;
  color: white;
  background: #ff6666;
  border: 0;
  border-radius: 20px;
  height: 70px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #ff666675;
    &:hover {
      background: #ff666675;
    }
  }
  &:hover {
    background: #d64848;
  }
`

const SwapLabel = styled.label`
  color: #475965;
  margin-bottom: 20px;
  margin-left: 14px;
`

const Swap = ({
  assets,
  wallets,
  progress,
  connectWithWallet,
  depositAddressModal,
  infoModal,
  swapButton,
  updateSwapButton,
  hideDepositAddressModal,
  swap,
  /*resetProgress*/
  hideInfoModal
}) => {
  const {
    from,
    to,
    address,
    setAddress,
    fromAmount,
    toAmount,
    filteredAssets,
    onChangeFromAmount,
    onChangeToAmount,
    onChangeOrder,
    onFromMax,
    onToMax,
    onSwap,
    onSelectFrom,
    onSelectTo,
    showModalFrom,
    showModalTo,
    setShowModalFrom,
    setShowModalTo,
    onCloseDepositAddressModal
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
                defaultImage="../assets/svg/BTC.svg"
                title="From"
                asset={from}
                amount={fromAmount}
                onChangeAmount={onChangeFromAmount}
                onClickImage={() => setShowModalFrom(true)}
                onMax={onFromMax}
              />
              <DescendantImageContainer>
                <DescendantImage src="../assets/png/descendant.png" onClick={onChangeOrder} />
              </DescendantImageContainer>
              <SwapLine
                defaultImage="../assets/svg/pBTC.svg"
                defaultMiniImage="../assets/svg/ETH.svg"
                title="To"
                asset={to}
                amount={toAmount}
                address={address}
                onChangeAmount={onChangeToAmount}
                onClickImage={() => setShowModalTo(true)}
                onChangeAddress={setAddress}
                onMax={onToMax}
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
      <AssetListModal
        title="Swap from ..."
        defaultAssets={assets.length === 0 ? defaultAssets : assets}
        assets={assets.length === 0 ? defaultAssets : assets}
        show={showModalFrom}
        onClose={() => setShowModalFrom(false)}
        onSelect={onSelectFrom}
      />
      <AssetListModal
        title="Swap to ..."
        defaultAssets={assets.length === 0 ? defaultAssets : assets}
        assets={filteredAssets.length === 0 ? defaultAssets : filteredAssets}
        show={showModalTo}
        onClose={() => setShowModalTo(false)}
        onSelect={onSelectTo}
      />
      <DepositAddressModal
        show={depositAddressModal.show}
        onClose={onCloseDepositAddressModal}
        asset={depositAddressModal.asset}
        disabled={address === ''}
        value={depositAddressModal.value}
      />
      <InfoModal show={infoModal.show} message={infoModal.message} image={infoModal.image} onClose={hideInfoModal} />
    </React.Fragment>
  )
}

Swap.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  depositAddressModal: PropTypes.object,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  hideDepositAddressModal: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func
}

export default Swap
