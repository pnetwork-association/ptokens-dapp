import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import SelectWallet from '../selectWallet/SelectWallet'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const ConnectButton = styled.button`
  width: auto;
  background: #ff6666;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 15px;
  font-weight: 300;
  color: #ffffff;
  height: 40px;
  border: 0;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: bold;
  border-radius: 20px;
  outline: none !important;
  box-shadow: none;
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

const Header = ({ connectWithWallet, selectedPage, selectPage }) => {
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
          <ConnectButton onClick={() => setShowSelectWallet(true)}>Connect Wallets</ConnectButton>
        </Navbar.Collapse>
      </Navbar>
      <SelectWallet show={showSelectWallet} onClose={() => setShowSelectWallet(false)} onSelect={onSelectWallet} />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired
}

export default Header
