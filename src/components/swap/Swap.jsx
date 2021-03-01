import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import Process from './process/Process'
import MiniCard from '../utils/MiniCard'
import Alert from '../utils/Alert'
import Input from '../utils/Input'
import Button from '../utils/Button'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'

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
  width: 550px;
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
  font-size: 18px;
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
  background: #33b1f5;
  border: 0;
  border-radius: 20px;
  height: 50px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
`

const Swap = _props => {
  return (
    <div className="container">
      <div className="row">
        <OuterContainerSwap className="mx-auto">
          <ContainerSwap>
            <ContainerInput>
              <div className="row">
                <div className="col-3">
                  {' '}
                  <ContainerImage>
                    <Image src="../assets/BTC.png" />
                    {/*<MiniImage src="../assets/ETH.png"/>*/}
                  </ContainerImage>{' '}
                </div>
                <div className="col-9 text-right my-auto">
                  <AmountInput placeholder="0.0" />
                </div>
              </div>
            </ContainerInput>
            <DescendantImageContainer>
              <DescendantImage src="../assets/descendant.png" />
            </DescendantImageContainer>
            <ContainerInput>
              <div className="row">
                <div className="col-3">
                  <ContainerImage>
                    <Image src="../assets/pBTC-mainnet.png" />
                    <MiniImage src="../assets/ETH.png" />
                  </ContainerImage>{' '}
                </div>
                <div className="col-9 text-right">
                  <BalanceLabel>Balance: 0.001 pBTC</BalanceLabel>
                  <AmountInput placeholder="0.0" disabled={true} />
                </div>
                <ContainerAddressInput>
                  <AddressInput placeholder="to address" />
                </ContainerAddressInput>
              </div>
            </ContainerInput>
            <ContainerButtons>
              <SwapButton>Swap</SwapButton>
            </ContainerButtons>
          </ContainerSwap>
        </OuterContainerSwap>
      </div>
    </div>
  )
}

Swap.propTypes = {}

export default Swap
