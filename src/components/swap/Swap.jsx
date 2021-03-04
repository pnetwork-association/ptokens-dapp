import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Container } from 'react-bootstrap'
import AssetListModal from './assetListModal/AssetListModal'
import Progress from './progress/Progress'
import { useSwap } from '../../hooks/use-swap'
import SwapLine from './swapLine/SwapLine'
import DepositAddressModal from './depositAddressModal/DepositAddressModal'
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
  background: #9e9e9e0d;
  height: 100%;
  padding: 30px;
  width: 420px;
  @media (max-width: 767.98px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const DescendantImageContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
`

const DescendantImage = styled.img`
  width: 18px;
  height: 18px;
`

const ContainerButtons = styled.div`
  margin-top: 30px;
`

const ActionButton = styled.button`
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

const Swap = ({ assets, wallets, progress, connectWithWallet, depositAddressModal, hideDepositAddressModal, swap }) => {
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const {
    action,
    from,
    to,
    setFrom,
    setTo,
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
    onSwap
  } = useSwap({ wallets, assets, connectWithWallet, swap, progress, depositAddress: depositAddressModal.value })

  useMemo(() => {
    if (!assetsLoaded && assets.length > 0) {
      setFrom(assets.find(({ symbol }) => symbol === 'BTC'))
      setTo(assets.find(({ symbol }) => symbol === 'PBTC'))
      setAssetsLoaded(true)
    }
  }, [assets, assetsLoaded, setFrom, setTo])

  const onSelectFrom = useCallback(
    _asset => {
      setShowModalFrom(false)
      setFrom(_asset)
    },
    [setFrom]
  )

  const onSelectTo = useCallback(
    _asset => {
      setShowModalTo(false)
      setTo(_asset)
    },
    [setTo]
  )

  return (
    <React.Fragment>
      <Container>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
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
              <ContainerButtons>
                <ActionButton
                  onClick={onSwap}
                  disabled={
                    action === 'Loading ...' ||
                    action === 'Enter an amount' ||
                    action === 'Invalid Address' ||
                    action === 'Generating ...' ||
                    action === 'Swapping ...' ||
                    action === 'Invalid Swap' ||
                    (address === '' && action !== 'Connect Wallet')
                  }
                >
                  {action}
                </ActionButton>
              </ContainerButtons>
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      <AssetListModal
        title="Swap from ..."
        assets={assets.length === 0 ? defaultAssets : assets}
        filteredAssets={assets.length === 0 ? defaultAssets : assets}
        show={showModalFrom}
        onClose={() => setShowModalFrom(false)}
        onSelect={onSelectFrom}
      />
      <AssetListModal
        title="Swap to ..."
        assets={assets}
        filteredAssets={filteredAssets.length === 0 ? defaultAssets : filteredAssets}
        show={showModalTo}
        onClose={() => setShowModalTo(false)}
        onSelect={onSelectTo}
      />
      <DepositAddressModal
        show={depositAddressModal.show}
        onClose={hideDepositAddressModal}
        asset={depositAddressModal.asset}
        disabled={address === ''}
        value={depositAddressModal.value}
      />
    </React.Fragment>
  )
}

Swap.propTypes = {
  wallets: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  progress: PropTypes.object,
  connectWithWallet: PropTypes.func,
  hideDepositAddressModal: PropTypes.func,
  swap: PropTypes.func
}

export default Swap
