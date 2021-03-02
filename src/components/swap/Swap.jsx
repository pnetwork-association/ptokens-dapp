import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import AssetListModal from './assetListModal/AssetListModal'
import { capitalizeAllLettersExceptFirst } from '../../utils/capitalize'
//import { useSwapAction } from '../../hooks/use-swap-action'
import { useSwap } from '../../hooks/use-swap'
import SwapLine from './swapLine/SwapLine'

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
  width: 530px;
  @media (max-width: 767.98px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const DescendantImageContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  cursor: pointer;
`

const DescendantImage = styled.img`
  width: 24px;
  height: 24px;
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
  }
  &:hover {
    background: #d64848;
  }
`

const Swap = ({ assets, wallets, connectWithWallet }) => {
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
    onChangeFromAmount,
    onChangeToAmount,
    onChangeOrder
  } = useSwap({ wallets, assets })

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

  const onActionClick = useCallback(() => {
    if (action === 'Connect Wallet') {
      connectWithWallet(from.blockchain)
    }
  }, [from, action, connectWithWallet])

  return (
    <React.Fragment>
      <Container>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <SwapLine
                defaultImage="../assets/tokens/BTC.png"
                asset={from}
                amount={fromAmount}
                onChangeAmount={onChangeFromAmount}
                onClickImage={() => setShowModalFrom(true)}
              />
              <DescendantImageContainer>
                <DescendantImage src="../assets/descendant.png" onClick={onChangeOrder} />
              </DescendantImageContainer>
              <SwapLine
                defaultImage="../assets/tokens/pBTC-mainnet.png"
                defaultMiniImage="../assets/tokens/ETH.png"
                asset={to}
                amount={toAmount}
                address={address}
                onChangeAmount={onChangeToAmount}
                onClickImage={() => setShowModalTo(true)}
                onChangeAddress={setAddress}
              />
              <ContainerButtons>
                <ActionButton onClick={onActionClick} disabled={action === 'Loading ...'}>
                  {action}
                </ActionButton>
              </ContainerButtons>
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      <AssetListModal
        title="Swap from ..."
        assets={assets}
        show={showModalFrom}
        onClose={() => setShowModalFrom(false)}
        onSelect={onSelectFrom}
      />
      <AssetListModal
        title="Swap to ..."
        assets={assets}
        show={showModalTo}
        onClose={() => setShowModalTo(false)}
        onSelect={onSelectTo}
      />
    </React.Fragment>
  )
}

Swap.propTypes = {
  wallets: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  connectWithWallet: PropTypes.func
}

export default Swap
