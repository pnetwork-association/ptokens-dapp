import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import TermsOfService from '../../../components/molecules/popup/TermsOfService'
import { PBTC_ON_ETH_MAINNET_V1_MIGRATION } from '../../../constants'
import { sendEvent } from '../../../ga4'
import { useAssets } from '../../../hooks/use-assets'
import { useSwap } from '../../../hooks/use-swap'
import defaultAssets, { dismissedChains, dismissedToken } from '../../../settings/swap-assets'
import Button from '../../atoms/button/Button'
import Icon from '../../atoms/icon/Icon'
import AddressWarning from '../../molecules/popup/AddressWarning'
import Progress from '../../molecules/progress/Progress'
import AssetListModal from '../../organisms/assetListModal/AssetListModal'
import DepositAddressModal from '../../organisms/depositAddressModal/DepositAddressModal'
import InfoModal from '../../organisms/infoModal/InfoModal'
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

const WarningEta = styled.div`
  padding: 20px;
  background: #ffed8640;
  border: 0.5px solid ${({ theme }) => theme.primary1};
  border-radius: 10px;
  color: ${({ theme }) => theme.primary1};
  text-align: center;
`

const MigrationNotification = styled(InfoEta)`
  width: 460px;
  margin-bottom: 30px;
`

const WarningNotification = styled(WarningEta)`
  width: 460px;
  margin-bottom: 30px;
`

const PnetworkV2Badge = styled.span`
  color: white;
  background: ${({ theme }) => theme.primary1};
  font-size: 11px;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
`

const Link = styled.span`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
`

const Swap = ({
  assets: _assets,
  migrationAssets: _migrationAssets,
  bpm,
  swappersBalances,
  wallets,
  progress,
  infoModal,
  connectWithWallet,
  depositAddressModal,
  swapButton = {},
  updateSwapButton,
  hideDepositAddressModal,
  swap,
  hideInfoModal,
  selectPage,
}) => {
  const [assets] = useAssets(_assets)
  const [migrationAssets] = useAssets(_migrationAssets)
  const [notifyMigration, setNotifyMigration] = useState()
  const [TosShow, setTosShow] = useState(false)
  const [AddressWarningShow, setAddressWarningShow] = useState(false)

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
    poolAmount,
    onPnetworkV2,
    onChangeFromAmount,
    onChangeToAmount,
    disableToInput,
    disableFromInput,
    curvePoolName,
    curveImpact,
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
    onCloseDepositAddressModal,
    pegoutToTelosEvmAddress,
    setPegoutToTelosEvmAddress,
    ToSRef,
    AddressWarningRef,
    canChangeOrder,
  } = useSwap({
    progress,
    wallets,
    bpm,
    swappersBalances,
    assets,
    connectWithWallet,
    swap,
    swapButton,
    updateSwapButton,
    hideDepositAddressModal,
    setTosShow,
    setAddressWarningShow,
  })

  useEffect(() => {
    const pbtcv1 = migrationAssets.find(({ id }) => id === PBTC_ON_ETH_MAINNET_V1_MIGRATION)
    if (pbtcv1) {
      if (BigNumber(pbtcv1.balance).isGreaterThan(0)) {
        setNotifyMigration('pbtc-v1-v2')
      }
    }
  }, [migrationAssets])

  const onSelectFrom = useCallback(
    (_asset) => {
      setNotifyMigration(null)
      _onSelectFrom(_asset)
    },
    [_onSelectFrom]
  )

  const onSelectTo = useCallback(
    (_asset) => {
      setNotifyMigration(null)
      _onSelectTo(_asset)
    },
    [_onSelectTo]
  )

  const onMigration = useCallback(() => {
    selectPage('migration')
  }, [selectPage])

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            {assets.find(({ id }) => id === 'OLD_PBTC_ON_BSC_MAINNET') &&
              parseFloat(assets.find(({ id }) => id === 'OLD_PBTC_ON_BSC_MAINNET').balance) > 0 &&
              (from.id === 'PBTC_ON_BSC_MAINNET' || to.id === 'PBTC_ON_BSC_MAINNET') && (
                <WarningNotification>
                  The old pBTC-on-BSC pToken (token address 0xed28a457a5a76596ac48d87c0f577020f6ea1c4c) is currently
                  off-peg due to a hack - a compensation plan to recoup value in various crypto assets (not strictly
                  BTC) is being discussed by the community. More details{' '}
                  <a href="https://twitter.com/pNetworkDeFi/status/1439690593211490324" rel="noopener noreferrer">
                    here
                  </a>
                  . A new fully collateralized pBTC-on-BSC token has been launched on pNetwork v2 in late 2022 (token
                  address 0x1003d3574ac79303a5fa0951ecb04cc7acba9747).
                </WarningNotification>
              )}
            {assets.find(({ id }) => id === 'GALA_ON_BSC_MAINNET') &&
              parseFloat(assets.find(({ id }) => id === 'GALA_ON_BSC_MAINNET').balance) > 0 &&
              (from.id === 'GALA_ON_BSC_MAINNET' || to.id === 'GALA_ON_BSC_MAINNET') && (
                <WarningNotification>
                  The old pGALA-on-BSC pToken (token address 0x7ddee176f665cd201f93eede625770e2fd911990) has been
                  affected by an incident in late 2022 and is currently worthless - a recovery plan has been executed.
                  More details{' '}
                  <a href="https://t.me/pGALA_incident_updates" rel="noopener noreferrer">
                    here
                  </a>
                  . After the incident, a new fully collateralized pGALA-on-BSC token has been launched on pNetwork v2
                  (token address 0x419c44c48cd346c0b0933ba243be02af46607c9b).
                </WarningNotification>
              )}
            {notifyMigration ? (
              <MigrationNotification>
                {notifyMigration === 'pbtc-v1-v2' && (
                  <React.Fragment>
                    It looks like you are holding pBTC-v1 tokens on Ethereum or a staked LP asset that includes it (i.e.
                    Curve, Uniswap). That pBTC-v1 token has been superseded by pBTC-v2, to know more about the new
                    version click{' '}
                    <a href="https://t.me/pNetworkDefi" target="_blank" rel="noopener noreferrer">
                      here
                    </a>
                    .<br /> Please <Link onClick={onMigration}>proceed to the migration dashboard</Link> to easily
                    upgrade it.
                  </React.Fragment>
                )}
              </MigrationNotification>
            ) : null}
          </Col>
        </Row>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <Row>
                <Col xs={6}>
                  <SwapLabel>Swap</SwapLabel>
                </Col>
                <Col className="text-right">{onPnetworkV2 ? <PnetworkV2Badge>pNetwork v2</PnetworkV2Badge> : null}</Col>
              </Row>
              <SwapLine
                defaultImage="./assets/svg/BTC.svg"
                title="From"
                asset={from}
                assets={assets.length === 0 ? defaultAssets : assets}
                amount={fromAmount}
                wallet={fromWallet}
                disableInput={disableFromInput}
                selectFrom={onSelectFrom}
                onChangeAmount={onChangeFromAmount}
                onClickImage={() => setShowModalFrom(true)}
                onMax={onFromMax}
              />
              <ArrowContainer>
                {canChangeOrder ? <SortIcon icon="sort" onClick={onChangeOrder} /> : <DisabledSortIcon icon="sort" />}
              </ArrowContainer>
              <SwapLine
                style={{ marginBottom: '20px' }}
                defaultImage="./assets/svg/pBTC.svg"
                defaultMiniImage="./assets/svg/ETH.svg"
                title="To"
                asset={to}
                assets={assets.length === 0 ? defaultAssets : assets}
                amount={toAmount}
                address={address}
                wallet={toWallet}
                disableInput={disableToInput}
                selectTo={onSelectTo}
                onChangeAmount={onChangeToAmount}
                onClickImage={() => setShowModalTo(true)}
                onChangeAddress={setAddress}
                onMax={onToMax}
              />

            
              {progress.show ? (
                <Progress percent={progress.percent} message={progress.message} steps={progress.steps} />
              ) : null}
            
              {from && to && !to.isNative ? (
                <WarningEta>
                  {`pNetwork v2 has been dismissed. Pegin are disabled.`}
                </WarningEta>
              ) : from && to && (from.blockchain === 'TELOS' || to.blockchain === 'TELOS') ? (
                <WarningEta>
                  TELOS pTokens are handled directly by the Telos Foundation.&ensp;
                  <a href="https://x.com/HelloTelos/status/1861371335902908886" target="_blank" rel="noopener noreferrer">
                    More info
                  </a>
                </WarningEta>
              ) : from && to && (from.blockchain === 'ULTRA' || to.blockchain === 'ULTRA') ? (
                <WarningEta>
                  ULTRA pTokens are handled directly by the Ultra Team.&ensp;
                  <a href="https://x.com/pNetworkDeFi/status/1862469316643316070" target="_blank" rel="noopener noreferrer">
                    More info
                  </a>
                </WarningEta>
              ) : from && to && (dismissedToken.includes(to.symbol) || dismissedToken.includes(from.symbol)) ? (
                <WarningEta>
                  EFFECT pTokens are handled directly by Effect AI.&ensp;
                  <a href="https://x.com/effectaix/status/1856381643537228156" target="_blank" rel="noopener noreferrer">
                    More info
                  </a>
                </WarningEta>
              ) :
                <WarningEta>
                  pNetwork v2 has been dismissed. Pegout at your own risk. Please be patient as completion times for redeems are uncertain and may take several days.
                  Expected return amount is only indicative and actual fees cannot be predicted at swap time.
                </WarningEta>
              }
          
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
      <ReactTooltip id="tooltip-gasless" multiline={true} style={{ zIndex: 2 }} />
      <ReactTooltip id="tooltip-fees" multiline={true} style={{ zIndex: 2 }} />
      <AssetListModal
        title="Swap from ..."
        defaultAssets={assets.length === 0 ? defaultAssets : assets}
        assets={assets.length === 0 ? defaultAssets : assets.filter((asset) => !asset.isNative)}
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
  swappersBalances: PropTypes.object.isRequired,
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
  updateSwapButton: PropTypes.func,
  selectPage: PropTypes.func,
}

export default Swap
