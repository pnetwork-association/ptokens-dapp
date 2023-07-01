import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import TermsOfService from '../../../components/molecules/popup/TermsOfService'
import { sendEvent } from '../../../ga4'
import { useAssets } from '../../../hooks/use-assets'
import { useSwap } from '../../../hooks/use-swap'
import defaultAssets from '../../../settings/swap-assets'
import Button from '../../atoms/button/Button'
import Icon from '../../atoms/icon/Icon'
import AddressWarning from '../../molecules/popup/AddressWarning'
import WarningPopup from '../../molecules/popup/Warning'
import Progress from '../../molecules/progress/Progress'
import AssetListModal from '../../organisms/assetListModal/AssetListModal'
import InfoModal from '../../organisms/infoModal/InfoModal'
import SwapInfo from '../../organisms/swapInfo/SwapInfo'
import SwapLine from '../../organisms/swapLine/SwapLine'

export const OuterContainerSwap = styled.div`
  @media (max-width: 767.98px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

export const ContainerSwap = styled.div`
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

export const ArrowContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  @media (max-width: 767.98px) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

export const SortIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.primary1};
  }
  @media (max-width: 767.98px) {
    width: 12px;
    height: 12px;
  }
`

export const DisabledSortIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  user-select: none;
  pointer-events: none;
  svg {
    fill: ${({ theme }) => theme.lightGray};
  }
  @media (max-width: 767.98px) {
    width: 12px;
    height: 12px;
  }
`

export const ContainerSwapButton = styled.div`
  margin-top: 20px;
`

export const ContainerTermOfService = styled.div`
  margin-top: 10px;
  text-align: center;
  align-items: center;
`

export const SwapLabel = styled.label`
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
  margin-bottom: 10px;
  background: #66b8ff40;
  border: 0.5px solid ${({ theme }) => theme.blue};
  border-radius: 10px;
  color: ${({ theme }) => theme.blue};
  text-align: center;
`

const ProvisionalSafemoonBox = styled(InfoEta)``

const PnetworkV3Badge = styled.span`
  color: white;
  background: ${({ theme }) => theme.primary1};
  font-size: 11px;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
`

const Swap = ({
  assets: _assets,
  bpm,
  wallets,
  progress,
  infoModal,
  connectWithWallet,
  swapButton = {},
  updateSwapButton,
  swap,
  hideInfoModal,
  selectPage,
}) => {
  const [assets] = useAssets(_assets)
  const [TosShow, setTosShow] = useState(false)
  const [AddressWarningShow, setAddressWarningShow] = useState(false)
  const [showWarningPopup, setShowWarningPopup] = useState(true)

  const {
    from,
    to,
    fees,
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
    disableToInput,
    disableFromInput,
    curvePoolName,
    onChangeOrder,
    onFromMax,
    onToMax,
    onSwap,
    onSelectFrom: _onSelectFrom,
    onSelectTo: _onSelectTo,
    showModalFrom,
    showModalTo,
    setShowModalFrom,
    setShowModalTo,
    ToSRef,
    AddressWarningRef,
    canChangeOrder,
  } = useSwap({
    progress,
    wallets,
    bpm,
    assets,
    connectWithWallet,
    swap,
    swapButton,
    updateSwapButton,
    setTosShow,
    setAddressWarningShow,
  })

  const onSelectFrom = useCallback(
    (_asset) => {
      _onSelectFrom(_asset)
    },
    [_onSelectFrom]
  )

  const onSelectTo = useCallback(
    (_asset) => {
      _onSelectTo(_asset)
    },
    [_onSelectTo]
  )

  return (
    <React.Fragment>
      <Container>
        <WarningPopup show={showWarningPopup} onClose={() => setShowWarningPopup(false)} />
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <Row>
                <Col xs={6}>
                  <SwapLabel>Swap</SwapLabel>
                </Col>
                <Col className="text-right">{<PnetworkV3Badge>pNetwork v3</PnetworkV3Badge>}</Col>
              </Row>
              <SwapLine
                title="From"
                asset={from}
                amount={fromAmount}
                wallet={fromWallet}
                disableInput={disableFromInput}
                onChangeAmount={onChangeFromAmount}
                onClickImage={() => setShowModalFrom(true)}
                onMax={onFromMax}
              />
              <ArrowContainer>
                {canChangeOrder ? <SortIcon icon="sort" onClick={onChangeOrder} /> : <DisabledSortIcon icon="sort" />}
              </ArrowContainer>
              <SwapLine
                style={{ marginBottom: '20px' }}
                title="To"
                asset={to}
                amount={toAmount}
                address={address}
                wallet={toWallet}
                disableInput={disableToInput}
                onChangeAmount={onChangeToAmount}
                onClickImage={() => setShowModalTo(true)}
                onChangeAddress={setAddress}
                onMax={onToMax}
              />

              {progress.show ? (
                <Progress percent={progress.percent} message={progress.message} steps={progress.steps} />
              ) : null}
              {eta === -1 || eta > 15 ? (
                <InfoEta>
                  {eta > 15 && eta < 45
                    ? 'Please note that this operation may take longer than usual to get processed as the bridge is experiencing some delays.'
                    : 'Please note that this operation may take longer than usual to get processed as the bridge is experiencing major delays.'}
                </InfoEta>
              ) : null}
              {from && to && (from.symbol.toUpperCase() === 'SAFEMOON' || to.symbol.toUpperCase() === 'SAFEMOON') ? (
                <ProvisionalSafemoonBox>
                  Using this bridge requires a SFM transfer on BSC so a transfer fee may apply
                </ProvisionalSafemoonBox>
              ) : null}
              <ContainerSwapButton>
                <Button
                  onClick={() =>
                    swapButton.link
                      ? sendEvent('external_redirect', {
                          link: swapButton.link,
                        }) || window.open(swapButton.link, '_self')
                      : onSwap()
                  }
                  disabled={
                    swapButton.link
                      ? false
                      : swapButton.disabled || (address === '' && swapButton.text !== 'Connect Wallet')
                  }
                >
                  {swapButton.text}
                </Button>
              </ContainerSwapButton>
              <TermsOfService
                show={TosShow}
                onHide={() => {
                  ToSRef.current = { isAccepted: false, isRefused: true }
                  setTosShow(false)
                }}
                onClose={() => {
                  ToSRef.current = { isAccepted: true, isRefused: false }
                  setTosShow(false)
                }}
              />
              <AddressWarning
                show={AddressWarningShow}
                onHide={() => {
                  AddressWarningRef.current.doNotProceed = true
                  setAddressWarningShow(false)
                }}
                onClose={() => {
                  AddressWarningRef.current.proceed = true
                  setAddressWarningShow(false)
                }}
              />
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      <SwapInfo from={from} to={to} amount={fromAmount} bpm={bpm} curvePoolName={curvePoolName} fees={fees} />
      <ReactTooltip id="tooltip-fees" multiline={true} style={{ zIndex: 2 }} />
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
      <InfoModal onClose={hideInfoModal} {...infoModal} />
    </React.Fragment>
  )
}

Swap.propTypes = {
  assets: PropTypes.array.isRequired,
  bpm: PropTypes.object.isRequired,
  wallets: PropTypes.object.isRequired,
  defaultSelection: PropTypes.object,
  infoModal: PropTypes.object,
  swapButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  swap: PropTypes.func,
  resetProgress: PropTypes.func,
  hideInfoModal: PropTypes.func,
  updateSwapButton: PropTypes.func,
  selectPage: PropTypes.func,
}

export default Swap
