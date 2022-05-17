import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import SwapLine from '../../organisms/swapLine/SwapLine'
import { useMigration } from '../../../hooks/use-migration'
import { useAssets } from '../../../hooks/use-assets'
import {
  OuterContainerSwap,
  ContainerSwap,
  ContainerSwapButton,
  SwapLabel,
  ArrowContainer,
  SortIcon
} from '../swap/Swap'
import Button from '../../atoms/button/Button'
import Progress from '../../molecules/progress/Progress'
import InfoModal from '../../organisms/infoModal/InfoModal'

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

const Alert = styled.div`
  margin-top: 30px;
  padding: 20px;
  margin-botton: 10px;
  background: #66b8ff40;
  border: 0.5px solid ${({ theme }) => theme.blue};
  border-radius: 10px;
  color: ${({ theme }) => theme.blue};
  text-align: center;
  width: 460px;
  margin-bottom: 30px;
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
    onChangeFromAmount,
    onChangeToAmount,
    onFromMax,
    onMigrate
  } = useMigration({
    progress,
    wallets,
    assets,
    connectWithWallet,
    migrate,
    migrateButton,
    updateMigrateButton
  })

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            {to &&
            (to.id === 'IDLE_CDO_AA_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION' ||
              to.id === 'IDLE_CDO_BB_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION') ? (
              <Alert>
                <React.Fragment>
                  Please note that the Junior and Senior Idle tranches have different profile risks and dynamics. To
                  know more please click{' '}
                  <a
                    href="https://docs.idle.finance/products/perpetual-yield-tranches/guide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .
                </React.Fragment>
              </Alert>
            ) : null}
          </Col>
        </Row>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <Row>
                <Col xs={6}>
                  <SwapLabel>Migration</SwapLabel>
                </Col>
              </Row>
              <SwapLine
                defaultImage="../assets/svg/PBTC.svg"
                defaultMiniImage="../assets/svg/ETH.svg"
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
                defaultImage="../assets/svg/pBTC.svg"
                defaultMiniImage="../assets/svg/ETH.svg"
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
            <BackButton onClick={() => selectPage('/migration')}>Back</BackButton>
          </OuterContainerSwap>
        </Row>
      </Container>
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
  hideInfoModal: PropTypes.func
}

export default Migration
