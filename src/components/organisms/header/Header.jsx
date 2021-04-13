import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import Walletinfo from '../walletInfoModal/WalletInfoModal'
import { useWallets } from '../../../hooks/use-wallets'
import Icon from '../../atoms/icon/Icon'
import settings from '../../../settings'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`

const ConnectButton = styled.button`
  width: auto;
  color: white;
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
  background: ${({ theme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }) => theme.secondary4Hovered};
  }
  color: ${({ theme }) => theme.text1};
`

const StyledIcon = styled(Icon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
  padding: 6px;
  border-radius: 10px;
  background: ${({ theme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }) => theme.secondary4Hovered};
  }

  svg {
    fill: ${({ theme }) => theme.text1};
  }
`

const Connected = styled.div`
  background: #66b8ff40;
  height: 35px;
  border-radius: 50%;
  width: 35px;
  background: #a8f7b5;
  border: 1px solid #a8f7b5;
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
  color: ${({ active, theme }) => (active ? theme.text1 : theme.text3)} !important;
`

const GoToIcon = styled(Icon)`
  width: 8px;
  height: 8px;
  position: relative;
  margin-top: -10px;
  /* margin-left: 0px; */
  vertical-align: super;
  svg {
    fill: ${({ active, theme }) => (active ? theme.text1 : theme.text3)} !important;
  }
`

const Header = _props => {
  const { selectedPage, theme, connectWithWallet, disconnectFromWallet, selectPage, setTheme } = _props
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
            <StyledNavLink onClick={() => window.open(settings.ptokensWebsite, '_blank')}>
              Stats <GoToIcon icon="arrow-diagonal" />
            </StyledNavLink>
            <StyledNavLink onClick={() => window.open(settings.auditLinks, '_blank')}>
              Audits <GoToIcon icon="arrow-diagonal" />
            </StyledNavLink>
          </Nav>
          {isConnected ? (
            <Connected onClick={() => setShowWalletInfo(true)} />
          ) : (
            <ConnectButton onClick={() => setShowWalletInfo(true)}>Connect Wallets</ConnectButton>
          )}
          <StyledIcon
            icon={theme === 'light' ? 'sun' : 'moon'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          ></StyledIcon>
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
