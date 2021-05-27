import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Container } from 'react-bootstrap'
import AssetListModal from '../../organisms/assetListModal/AssetListModal'
import Progress from '../../molecules/progress/Progress'
import { useSwap } from '../../../hooks/use-swap'
import SwapLine from '../../organisms/swapLine/SwapLine'
import DepositAddressModal from '../../organisms/depositAddressModal/DepositAddressModal'
import SwapInfo from '../../organisms/swapInfo/SwapInfo'
import defaultAssets from '../../../settings/swap-assets'
import { useAssets } from '../../../hooks/use-assets'
import Icon from '../../atoms/icon/Icon'
import InfoModal from '../../organisms/infoModal/InfoModal'

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
  background: ${({ theme }) => theme.secondary3};
  height: 100%;
  padding: 15px;
  width: 460px;
  z-index: 1;
  @media (max-width: 767.98px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const ArrowContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  @media (max-width: 767.98px) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

const SortIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  svg {
    fill: ${({ theme }) => theme.primary1};
  }
  @media (max-width: 767.98px) {
    width: 12px;
    height: 12px;
  }
`

const ContainerSwapButton = styled.div`
  margin-top: 30px;
  @media (max-width: 767.98px) {
    margin-top: 20px;
  }
`

const SwapButton = styled.button`
  width: 100%;
  color: white;
  background: ${({ theme }) => theme.primary1};
  border: 0;
  border-radius: 20px;
  height: 70px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: ${({ theme }) => theme.primary1Transparentized};
    &:hover {
      background: ${({ theme }) => theme.primary1Transparentized};
    }
  }
  &:hover {
    background: ${({ theme }) => theme.primary1Hovered};
  }
  @media (max-width: 767.98px) {
    height: 60px;
    font-size: 20px;
  }
`

const SwapLabel = styled.label`
  color: ${({ theme }) => theme.text1};
  margin-bottom: 20px;
  margin-left: 14px;
  @media (max-width: 767.98px) {
    margin-bottom: 10px;
    font-size: 14px;
  }
`

const InfoEta = styled.div`
  margin-top: 30px;
  padding: 20px;
  margin-botton: 10px;
  background: #66b8ff40;
  border: 0.5px solid ${({ theme }) => theme.blue};
  border-radius: 10px;
  color: ${({ theme }) => theme.blue};
  text-align: center;
`

const Swap = ({
  assets: _assets,
  bpm,
  wallets,
  progress,
  infoModal,
  connectWithWallet,
  depositAddressModal,
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
    filteredAssets,
    fromWallet,
    toWallet,
    eta,
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
    bpm,
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
                wallet={fromWallet}
                onChangeAmount={onChangeFromAmount}
                onClickImage={() => setShowModalFrom(true)}
                onMax={onFromMax}
              />
              <ArrowContainer>
                <SortIcon icon="sort" onClick={onChangeOrder} />
              </ArrowContainer>
              <SwapLine
                defaultImage="../assets/svg/pBTC.svg"
                defaultMiniImage="../assets/svg/ETH.svg"
                title="To"
                asset={to}
                amount={toAmount}
                address={address}
                wallet={toWallet}
                onChangeAmount={onChangeToAmount}
                onClickImage={() => setShowModalTo(true)}
                onChangeAddress={setAddress}
                onMax={onToMax}
              />
              {progress.show ? (
                <Progress percent={progress.percent} message={progress.message} steps={progress.steps} />
              ) : null}
              {eta < 0 || eta > 15 ? (
                <InfoEta>
                  {eta > 15
                    ? 'Please note that this operation may take longer than usual to get processed as the bridge is experiencing some delays.'
                    : 'Please note that this operation may take longer than usual to get processed as the bridge is experiencing major delays.'}
                </InfoEta>
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
      <SwapInfo from={from} to={to} bpm={bpm} />
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
      <InfoModal onClose={hideInfoModal} {...infoModal} />
    </React.Fragment>
  )
}

Swap.propTypes = {
  assets: PropTypes.array.isRequired,
  bpm: PropTypes.object.isRequired,
  wallets: PropTypes.object.isRequired,
  depositAddressModal: PropTypes.object,
  defaultSelection: PropTypes.object,
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
