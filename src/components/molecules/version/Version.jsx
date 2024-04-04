import { Web3SettingsButton } from '@p.network/react-web3-settings'
import React from 'react'
import styled from 'styled-components'

const VersionDiv = styled.div`
  background: transparent;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 1rem;
  padding-bottom: 1rem;
`

const ContainerOptions = styled.div`
  justify-content: right !important;
  display: flex;
  @media (max-width: 767.98px) {
    display: none;
  }
`

const VersionButton = styled.button`
  width: auto;
  color: white;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 300;
  height: 40px;
  border: 0;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 400;
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

export default function Version() {
  const githubLink =
    'https://github.com/pnetwork-association/ptokens-dapp/tree/' + import.meta.env.VITE_REACT_APP_GIT_SHA
  return (
    <VersionDiv>
      <ContainerOptions>
        <VersionButton onClick={() => window.open(githubLink, '_blank', 'noopener,noreferrer')}>
          Version: {import.meta.env.VITE_REACT_APP_GIT_SHA}
        </VersionButton>
        <Web3SettingsButton className={'api-button'} iconClassName={'api-icon'}></Web3SettingsButton>
      </ContainerOptions>
    </VersionDiv>
  )
}
