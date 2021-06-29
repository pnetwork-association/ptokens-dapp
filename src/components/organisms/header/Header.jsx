import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import Walletinfo from '../walletInfoModal/WalletInfoModal'
import { useWallets } from '../../../hooks/use-wallets'
import Icon from '../../atoms/icon/Icon'
import settings from '../../../settings'

const HeaderWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  @media (max-width: 767.98px) {
    margin-bottom: 15px;
  }
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
  @media (max-width: 767.98px) {
    height: 35px;
  }
`

const ThemeIcon = styled(Icon)`
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

  @media (max-width: 767.98px) {
    height: 35px;
    width: 35px;
  }
`

const ConnectedIcon = styled(ThemeIcon)``

const Logo = styled.img`
  width: 36px;
  height: 36px;
  @media (max-width: 767.98px) {
    height: 30px;
    width: 30px;
  }
`

const StyledNavLink = styled(Nav.Link)`
  font-size: 18px;
  padding-left: 15px;
  padding-right: 15px;
  color: ${({ active, theme }) => (active ? theme.text1 : theme.text3)} !important;
  @media (max-width: 991.98px) {
    margin-left: 10px;
    font-size: 17px;
  }
`

const GoToIcon = styled(Icon)`
  width: 7px;
  height: 7px;
  position: relative;
  margin-top: -10px;
  vertical-align: super;
  svg {
    fill: ${({ active, theme }) => (active ? theme.text1 : theme.text3)} !important;
  }
`

const StyledNav = styled(Nav)`
  @media (max-width: 991.98px) {
    margin-right: 0 !important;
    flex-direction: row !important;
  }
`

const ContainerBottomMobile = styled(Container)`
  display: none;
  position: fixed !important;
  bottom: 0;
  height: 65px;
  width: 100%;
  z-index: 100;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  background-color: ${({ theme }) => theme.bg1} !important;
  @media (max-width: 767.98px) {
    display: block;
  }
`

const ContainerOptions = styled.div`
  margin-left: auto;
  display: flex;
  @media (max-width: 767.98px) {
    display: none;
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
        <StyledNav>
          <StyledNavLink active={selectedPage === 'swap'} onClick={() => selectPage('swap')}>
            Swap
          </StyledNavLink>
          <StyledNavLink active={selectedPage === 'nfts'} onClick={() => selectPage('nfts')}>
            NFTs
          </StyledNavLink>
          <StyledNavLink onClick={() => window.open(settings.links.stats, '_blank')}>
            Stats <GoToIcon icon="arrow-diagonal" />
          </StyledNavLink>
          <StyledNavLink onClick={() => window.open(settings.links.audit, '_blank')}>
            Audits <GoToIcon icon="arrow-diagonal" />
          </StyledNavLink>
          <StyledNavLink onClick={() => window.open(settings.links.coinmarketcap, '_blank')}>
            $PNT <GoToIcon icon="arrow-diagonal" />
          </StyledNavLink>
        </StyledNav>
        <ContainerOptions>
          {isConnected ? (
            <ConnectedIcon icon="wallet" onClick={() => setShowWalletInfo(true)} />
          ) : (
            <ConnectButton onClick={() => setShowWalletInfo(true)}>Connect Wallets</ConnectButton>
          )}
          <ThemeIcon
            icon={theme === 'light' ? 'sun' : 'moon'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          ></ThemeIcon>
        </ContainerOptions>
      </Navbar>
      <Walletinfo
        show={showWalletInfo}
        wallets={wallets}
        onClose={() => setShowWalletInfo(false)}
        onDisconnect={onDisconnectWallet}
        onChange={onChangeWallet}
        onConnect={onConnectWallet}
      />
      <ContainerBottomMobile>
        <Row>
          <Col xs={8}>
            {isConnected ? (
              <ConnectedIcon icon="wallet" onClick={() => setShowWalletInfo(true)} />
            ) : (
              <ConnectButton onClick={() => setShowWalletInfo(true)}>Connect Wallets</ConnectButton>
            )}
          </Col>
          <Col xs={4} className="text-right">
            <ThemeIcon
              icon={theme === 'light' ? 'sun' : 'moon'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            ></ThemeIcon>
          </Col>
        </Row>
      </ContainerBottomMobile>
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
