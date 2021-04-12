import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import Walletinfo from '../walletInfo/WalletInfo'
import { useWallets } from '../../../hooks/use-wallets'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const ConnectButton = styled.button`
  width: auto;
  color: white;
  background: ${({ theme }) => (theme.type === 'light' ? theme.primary1 : 'rgb(64, 68, 79)')};
  border-radius: 3px;
  font-size: 15px;
  font-weight: 300;
  height: 40px;
  border: 0;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: 500;
  border-radius: 10px;
  outline: none !important;
  border: 1px solid ${({ theme }) => (theme.type === 'light' ? theme.primary1 : 'rgb(64, 68, 79)')};
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`

const ThemeButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin-left: 10px;
  padding: 4px;
  border-radius: 5px;
  background: ${({ theme }) => (theme.type === 'light' ? '#eaeaea' : 'rgb(64, 68, 79)')};
  &:hover {
    background: ${({ theme }) => (theme.type === 'light' ? '#c1bfbf' : '#6f768a')};
  }
`

const Connected = styled.div`
  background: '#66b8ff40;
  color: #475965 !important;
  height: 35px;
  border-radius: 50%;
  width: 35px;
  background: ${({ theme }) => theme.green2};
  border: 1px solid ${({ theme }) => theme.green2};
  cursor: pointer;
`

const Logo = styled.img`
  width: 36px;
  height: 36px;
`

const StyledNavLink = styled(Nav.Link)`
  font-size: 18px;
  padding-left: 15px;
  padding-right: 15px;
  color: ${({ active, theme }) => (active ? theme.text1 : '#ffffff82 ')} !important;
`

const Header = _props => {
  const { selectedPage, theme, connectWithWallet, disconnectFromWallet, selectPage, setTheme } = _props
  //const [showSelectWallet, setShowSelectWallet] = useState(false)
  const [showWalletInfo, setShowWalletInfo] = useState(false)

  const { isConnected, wallets } = useWallets(_props.wallets)

  const onConnectWallet = useCallback(
    _blockchain => {
      setShowWalletInfo(false)
      connectWithWallet(_blockchain)
    },
    [connectWithWallet]
  )

  const onChangeWallet = useCallback(
    _blockchain => {
      setShowWalletInfo(false)
      connectWithWallet(_blockchain)
    },
    [connectWithWallet]
  )

  const onDisconnectWallet = useCallback(
    _blockchain => {
      setShowWalletInfo(false)
      disconnectFromWallet(_blockchain)
    },
    [disconnectFromWallet]
  )

  return (
    <HeaderWrapper>
      <Navbar expand="lg">
        <Navbar.Brand>
          {' '}
          <Logo src="../assets/svg/PNT.svg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <StyledNavLink active={selectedPage === 'swap'} onClick={() => selectPage('swap')}>
              Swap
            </StyledNavLink>
            <StyledNavLink active={selectedPage === 'nfts'} onClick={() => selectPage('nfts')}>
              NFTs
            </StyledNavLink>
          </Nav>
          {isConnected ? (
            <Connected onClick={() => setShowWalletInfo(true)} />
          ) : (
            <ConnectButton onClick={() => setShowWalletInfo(true)}>Connect Wallets</ConnectButton>
          )}
          <ThemeButton
            src={`../assets/svg/${theme === 'light' ? 'sun' : 'moon'}.svg`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          ></ThemeButton>
        </Navbar.Collapse>
      </Navbar>
      <Walletinfo
        show={showWalletInfo}
        wallets={wallets}
        onClose={() => setShowWalletInfo(false)}
        onDisconnect={onDisconnectWallet}
        onChange={onChangeWallet}
        onConnect={onConnectWallet}
      />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  wallets: PropTypes.object.isRequired,
  selectedPage: PropTypes.string.isRequired,
  connectWithWallet: PropTypes.func.isRequired,
  disconnectFromWallet: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
}

export default Header
