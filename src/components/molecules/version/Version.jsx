import React from 'react'
import * as dotenv from 'dotenv'
import styled from 'styled-components'

const VersionDiv = styled.div`
  background: transparent;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 30px;
  padding-bottom: 10px;
`

const VersionContainer = styled.p`
  justify-content: right !important;
  display: flex;
  color: ${({ theme }) => theme.text2};
  font-size: 13px;
`

export default function Version() {
  dotenv.config()
  return (
    <VersionDiv className="version-div">
      <VersionContainer className="version-container">
        Version: {import.meta.env.VITE_REACT_APP_GIT_SHA}
      </VersionContainer>
    </VersionDiv>
  )
}
