import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'

import { PBTC_ON_ETH_MAINNET_V2_MIGRATION, PNT_ON_ETH_MAINNET } from '../../../constants'
import { useAssets } from '../../../hooks/use-assets'
import { useMigration } from '../../../hooks/use-migration'
import Button from '../../atoms/button/Button'
import Progress from '../../molecules/progress/Progress'
import InfoModal from '../../organisms/infoModal/InfoModal'
import MigrationInfo from '../../organisms/migrationInfo/MigrationInfo'
import SwapLine from '../../organisms/swapLine/SwapLine'
import {
  OuterContainerSwap,
  ContainerSwap,
  ContainerSwapButton,
  SwapLabel,
  ArrowContainer,
  SortIcon,
} from '../swap/Swap'

const ArrowIcon = styled(SortIcon)`
  cursor: normal !important;
`

const BackButton = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.primary1};
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
`

const Migration = ({
  assets: _assets,
  wallets,
  progress,
  connectWithWallet,
  migrateButton,
  updateMigrateButton,
  migrate,
  selectPage,
  infoModal,
  hideInfoModal,
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
    onChangeFromAmount,
    onChangeToAmount,
    onFromMax,
    onMigrate,
  } = useMigration({
    progress,
    wallets,
    assets,
    connectWithWallet,
    migrate,
    migrateButton,
    updateMigrateButton,
  })

  const getPrefix = (_to) => {
    if (to) return _to.id === PBTC_ON_ETH_MAINNET_V2_MIGRATION || _to.id === PNT_ON_ETH_MAINNET ? '' : '~'
    return ''
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <Row>
                <Col xs={6}>
                  <SwapLabel>Migration</SwapLabel>
                </Col>
              </Row>
              <SwapLine
                defaultImage="./assets/svg/PBTC.svg"
                defaultMiniImage="./assets/svg/ETH.svg"
                title="From"
                asset={from}
                amount={fromAmount}
                wallet={fromWallet}
                onChangeAmount={onChangeFromAmount}
                onMax={onFromMax}
                withTitleLabel
              />
              <ArrowContainer>
                <ArrowIcon icon="arrow-down" />
              </ArrowContainer>
              <SwapLine
                defaultImage="./assets/svg/pBTC.svg"
                defaultMiniImage="./assets/svg/ETH.svg"
                title="To"
                asset={to}
                amount={toAmount}
                address={address}
                wallet={toWallet}
                inputType={'text'}
                onChangeAmount={onChangeToAmount}
                onChangeAddress={setAddress}
                withTitleLabel
                hideMaxButton
                disableInput
                prefix={getPrefix(to)}
              />
              {progress.show ? (
                <Progress percent={progress.percent} message={progress.message} steps={progress.steps} />
              ) : null}
              <ContainerSwapButton>
                <Button
                  onClick={onMigrate}
                  disabled={migrateButton.disabled || (address === '' && migrateButton.text !== 'Connect Wallet')}
                >
                  {migrateButton.text}
                </Button>
              </ContainerSwapButton>
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      {from && from.id === 'ETHPNT_ON_ETH_MAINNET' ? <MigrationInfo from={from} to={to} /> : null}
      <BackButton onClick={() => selectPage('/migration')}>Back</BackButton>
      <InfoModal onClose={hideInfoModal} {...infoModal} />
    </React.Fragment>
  )
}

Migration.propTypes = {
  assets: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  infoModal: PropTypes.object,
  migrateButton: PropTypes.object,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  migrate: PropTypes.func,
  resetProgress: PropTypes.func,
  updateMigrateButton: PropTypes.func,
  selectPage: PropTypes.func,
  hideInfoModal: PropTypes.func,
}

export default Migration
