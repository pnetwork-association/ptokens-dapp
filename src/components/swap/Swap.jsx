import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap'
import AssetListModal from './assetListModal/AssetListModal'
import { capitalizeAllLettersExceptFirst } from '../../utils/capitalize'
import { useSwap } from '../../hooks/use-swap'

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
  background: rgba(71, 89, 101, 0.05);
  height: 100%;
  padding: 30px;
  width: 530px;
  @media (max-width: 767.98px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const ContainerInput = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(71, 89, 101, 0.3);
  padding: 15px;
  display: flex;
`

const AmountInput = styled.input`
  border: 0;
  background: transparent;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  caret-color: #32b1f5;
  text-align: right;
  font-size: 40px;
  color: #475965;
  width: 100%;
`

const ContainerImage = styled.div`
  border-radius: 50%;
`

const Image = styled.img`
  position: relative;
  width: 80px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
`

const MiniImage = styled.img`
  position: absolute;
  width: 22px;
  background: white;
  border-radius: 50%;
  margin-top: 55px;
  margin-left: -18px;
  border: 1px solid rgba(71, 89, 101, 0.3);
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

const BalanceLabel = styled.label`
  font-size: 13px;
  color: #475965;
  margin-bottom: 5px;
`

const AddressInput = styled.input`
  border: 0;
  background: transparent;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  caret-color: #32b1f5;
  text-align: right;
  font-size: 16px;
  color: #475965;
  width: 100%;
`

const ContainerAddressInput = styled.div`
  width: 100%;
  border-top: 1px solid rgba(71, 89, 101, 0.3);
  padding-right: 15px;
  padding-top: 15px;
  margin-top: 5px;
`

const ContainerButtons = styled.div`
  margin-top: 50px;
`

const SwapButton = styled.button`
  width: 100%;
  color: white;
  background: #ff6666;
  border: 0;
  border-radius: 20px;
  height: 50px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
`

const Swap = ({ assets }) => {
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')

  useMemo(() => {
    if (!assetsLoaded) {
      setFrom(assets.find(({ symbol }) => symbol === 'BTC'))
      setTo(assets.find(({ symbol }) => symbol === 'PBTC'))
      setAssetsLoaded(true)
    }
  }, [assets])

  const onSelectFrom = useCallback(_asset => {
    setShowModalFrom(false)
    setFrom(_asset)
  }, [])

  const onSelectTo = useCallback(_asset => {
    setShowModalTo(false)
    setTo(_asset)
  }, [])

  const { fromAssets } = useSwap(assets, from, to)

  console.log(fromAssets)

  return (
    <React.Fragment>
      <Container>
        <Row>
          <OuterContainerSwap className="mx-auto">
            <ContainerSwap>
              <ContainerInput>
                <Row>
                  <Col xs={3}>
                    {' '}
                    <ContainerImage>
                      <Image
                        src={from ? from.image : '../assets/tokens/BTC.png'}
                        onClick={() => setShowModalFrom(true)}
                      />
                      {from && from.withMiniImage ? <MiniImage src={from.miniImage} /> : null}
                    </ContainerImage>{' '}
                  </Col>
                  <Col xs={9} className="text-right my-auto">
                    <AmountInput placeholder="0.0" />
                  </Col>
                </Row>
              </ContainerInput>
              <DescendantImageContainer>
                <DescendantImage src="../assets/descendant.png" />
              </DescendantImageContainer>
              <ContainerInput>
                <Row>
                  <Col xs={3}>
                    <ContainerImage onClick={() => setShowModalTo(true)}>
                      <Image
                        src={to ? to.image : '../assets/tokens/pBTC-mainnet.png'}
                        onClick={() => setShowModalTo(true)}
                      />
                      {(to && to.withMiniImage) || !to ? (
                        <MiniImage src={!to ? '../assets/tokens/ETH.png' : to.miniImage} />
                      ) : null}
                    </ContainerImage>{' '}
                  </Col>
                  <Col xs={9} className="text-right">
                    <BalanceLabel>{`Balance: ${to ? to.formattedBalance : '-'} ${
                      to ? (to.isPtoken ? capitalizeAllLettersExceptFirst(to.symbol) : to.symbol) : 'pBTC'
                    }`}</BalanceLabel>
                    <AmountInput placeholder="0.0" disabled={true} />
                  </Col>
                  <ContainerAddressInput>
                    <AddressInput
                      placeholder="to address"
                      value={address}
                      onChange={_e => setAddress(_e.target.value)}
                    />
                  </ContainerAddressInput>
                </Row>
              </ContainerInput>
              <ContainerButtons>
                <SwapButton>Swap</SwapButton>
              </ContainerButtons>
            </ContainerSwap>
          </OuterContainerSwap>
        </Row>
      </Container>
      <AssetListModal
        assets={assets}
        show={showModalFrom}
        onClose={() => setShowModalFrom(false)}
        onSelect={onSelectFrom}
      />
      <AssetListModal assets={assets} show={showModalTo} onClose={() => setShowModalTo(false)} onSelect={onSelectTo} />
    </React.Fragment>
  )
}

Swap.propTypes = {}

export default Swap
