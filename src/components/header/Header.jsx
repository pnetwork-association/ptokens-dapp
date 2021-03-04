import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import SelectWallet from '../selectWallet/SelectWallet'
import { useWallets } from '../../hooks/use-wallets'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const ConnectButton = styled.button`
  width: auto;
  background: #ff666624;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 15px;
  font-weight: 300;
  color: #ff6666;
  height: 40px;
  border: 0;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: bold;
  border-radius: 10px;
  outline: none !important;
  box-shadow: none;
  &:hover {
    border: 1px solid #ff6666;
  }
`

const Connected = styled.div`
  background: #e8e8e8;
  color: #475965 !important;
  height: 35px;
  border-radius: 50%;
  width: 35px;
  background: #d8f6dd;
  border: 1px solid #a8f7b5;
  cursor: pointer;
`

const Logo = styled.img`
  width: 36px;
  height: 36px;
`

const StyledNavLink = styled(Nav.Link)`
  font-size: 20px;
  padding-left: 15px;
  padding-rigth: 15px;
  color: ${({ active }) => (active ? '#475965 !important' : 'inherit')};
`

const Header = ({ connectWithWallet, selectedPage, selectPage, wallets }) => {
  const [showSelectWallet, setShowSelectWallet] = useState(false)

  const onSelectWallet = useCallback(
    _symbol => {
      setShowSelectWallet(false)
      connectWithWallet(_symbol)
    },
    [connectWithWallet]
  )

  const { isConnected, connectedWallets } = useWallets(wallets)

  return (
    <HeaderWrapper>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          {' '}
          <Logo src="../assets/tokens/pnetwork.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <StyledNavLink active={selectedPage === 'swap'} onClick={() => selectPage('swap')}>
              Swap
            </StyledNavLink>
            <StyledNavLink active={selectedPage === 'stats'} onClick={() => selectPage('stats')}>
              Stats
            </StyledNavLink>
            <StyledNavLink active={selectedPage === 'nft'} onClick={() => selectPage('nft')}>
              NFTs
            </StyledNavLink>
          </Nav>
          {isConnected ? (
            <Connected />
          ) : (
            <ConnectButton onClick={() => setShowSelectWallet(true)}>Connect Wallets</ConnectButton>
          )}
        </Navbar.Collapse>
      </Navbar>
      <SelectWallet show={showSelectWallet} onClose={() => setShowSelectWallet(false)} onSelect={onSelectWallet} />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  wallets: PropTypes.object.isRequired,
  selectedPage: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired
}

export default Header
