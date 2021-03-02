import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
//import MultiWallet from './multiWallet/MultiWallet'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import SelectWallet from '../selectWallet/SelectWallet'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding-right: 50px;
  padding-left: 50px;
`

const ConnectButton = styled.button`
  width: auto;
  background: #ff6666;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  height: 50px;
  border: 0;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bold;
  border-radius: 20px;
  outline: none !important;
  box-shadow: none;
`

const ContainerConnectButton = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`

const Logo = styled.img`
  width: 36px;
  height: 36px;
`

const Header = ({ connectWithWallet }) => {
  const [showSelectWallet, setShowSelectWallet] = useState(false)

  const onSelectWallet = useCallback(
    _symbol => {
      setShowSelectWallet(false)
      connectWithWallet(_symbol)
    },
    [connectWithWallet]
  )

  return (
    <HeaderWrapper>
      <Row>
        <Col xs={6} className="my-auto">
          <Logo src="../assets/tokens/pnetwork.png" />
        </Col>
        <Col xs={6} className="text-right">
          <ContainerConnectButton>
            <ConnectButton onClick={() => setShowSelectWallet(true)}>Connect Wallets</ConnectButton>
          </ContainerConnectButton>
        </Col>
      </Row>
      <SelectWallet show={showSelectWallet} onClose={() => setShowSelectWallet(false)} onSelect={onSelectWallet} />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  connectWithWallet: PropTypes.func
}

export default Header
