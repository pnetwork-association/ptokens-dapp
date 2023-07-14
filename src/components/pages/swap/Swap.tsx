import PropTypes from 'prop-types'
import { Blockchain } from 'ptokens-constants'
import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import TermsOfService from '../../../components/molecules/popup/TermsOfService'
import { AssetId } from '../../../constants'
import { sendEvent } from '../../../ga4'
import { updateAssets } from '../../../hooks/use-assets'
import { useSwap } from '../../../hooks/use-swap'
import defaultAssets, { Asset, AssetWithAddress, UpdatedAsset } from '../../../settings/swap-assets'
import { AppThunk } from '../../../store'
import { IInfoModal } from '../../../store/pages/pages.reducer'
import { IBpm, IProgress, ISwapButton } from '../../../store/swap/swap.reducer'
import { Wallets } from '../../../store/wallets/wallets.reducer'
import { ITheme } from '../../../theme/ThemeProvider'
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
  background: ${({ theme }: { theme: ITheme }) => theme.secondary3};
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
    fill: ${({ theme }: { theme: ITheme }) => theme.primary1};
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
    fill: ${({ theme }: { theme: ITheme }) => theme.lightGray};
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
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
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
  border: 0.5px solid ${({ theme }: { theme: ITheme }) => theme.blue};
  border-radius: 10px;
  color: ${({ theme }: { theme: ITheme }) => theme.blue};
  text-align: center;
`

const ProvisionalSafemoonBox = styled(InfoEta)``

const PnetworkV3Badge = styled.span`
  color: white;
  background: ${({ theme }: { theme: ITheme }) => theme.primary1};
  font-size: 11px;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
`

type SwapProps = {
  assets: Partial<Record<AssetId, AssetWithAddress>>
  bpm: IBpm
  wallets: Wallets
  progress: IProgress
  swapButton: ISwapButton
  infoModal: IInfoModal
  connectWithWallet: (_blockchain: Blockchain) => void
  updateSwapButton: (_text: string, _disabled?: boolean, _link?: string | null) => void
  hideInfoModal: () => void
  swap: (_from: Asset, _to: Asset, _amount: string, _address: string) => AppThunk<Promise<void>>
}

const Swap = ({
  assets: _assets,
  bpm,
  wallets,
  progress,
  infoModal,
  connectWithWallet,
  swapButton,
  updateSwapButton,
  swap,
  hideInfoModal,
}: SwapProps) => {
  const [assets, setAssets] = useState<Partial<Record<AssetId, UpdatedAsset>>>({})

  useEffect(() => {
    const _updateAssets = async () => {
      const ret = await updateAssets(_assets)
      setAssets(ret)
    }
    _updateAssets()
  }, [_assets])

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
    assets,
    connectWithWallet,
    swap,
    swapButton,
    updateSwapButton,
    setTosShow,
    setAddressWarningShow,
    bpm,
  })

  const onSelectFrom = useCallback(
    (_asset: UpdatedAsset) => {
      _onSelectFrom(_asset)
    },
    [_onSelectFrom]
  )

  const onSelectTo = useCallback(
    (_asset: UpdatedAsset) => {
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
                address={null}
                onChangeAddress={null}
              />
              <ArrowContainer>
                {canChangeOrder ? <SortIcon icon="sort" onClick={onChangeOrder} /> : <DisabledSortIcon icon="sort" />}
              </ArrowContainer>
              <SwapLine
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
              {eta && (eta === -1 || eta > 15) ? (
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
      {from && to ? <SwapInfo from={from} to={to} amount={fromAmount} fees={fees} bpm={bpm} /> : null}
      <ReactTooltip id="tooltip-fees" multiline={true} style={{ zIndex: 2 }} />
      <AssetListModal
        title="Swap from ..."
        defaultAssets={Object.values(assets).length === 0 ? defaultAssets : assets}
        assets={Object.values(assets).length === 0 ? defaultAssets : assets}
        show={showModalFrom}
        onClose={() => setShowModalFrom(false)}
        onSelect={onSelectFrom}
      />
      <AssetListModal
        title="Swap to ..."
        defaultAssets={Object.values(assets).length === 0 ? defaultAssets : assets}
        assets={Object.values(filteredAssets).length === 0 ? defaultAssets : filteredAssets}
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
}

export default Swap
