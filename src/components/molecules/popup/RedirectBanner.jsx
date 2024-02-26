import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Row } from 'react-bootstrap'
import styled from 'styled-components'

import Icon from '../../atoms/icon/Icon'
import { OuterContainerSwap } from '../../pages/swap/Swap'

const DISMISSED_DOMAIN = 'ptokens.io'

const StyledAlert = styled(Alert)`
  // background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0.5rem;
`

const WarningIcon = styled(Icon)`
  height: 20px;
  width: 20px;
  margin: 5px;
  vertical-align: top;
  color: #475965;
`

const Paragraph = styled.div`
  text-align: center;
  margin: 0rem;
  margin-left: 2px;
`

const getDomain = () => {
  try {
    const currentUrl = new URL(window.location.href)
    return currentUrl.hostname
  } catch (_err) {
    // Handle error in case of use with ipns/ipfs enabled browsers
    console.error('Error while retreiving url', _err.message)
    return null
  }
}

const RedirectBanner = () => {
  const domain = getDomain()
  return (
    <>
      {domain && domain.includes(DISMISSED_DOMAIN) ? (
        <Row>
          <OuterContainerSwap className="mx-auto">
            <StyledAlert variant="info">
              <Paragraph>
                <WarningIcon icon="info" />
                <br />
                You are using an old domain that will be dismissed in the future.
                <br />
                Please use <a href="https://dapp.p.network">dapp.p.network</a>
              </Paragraph>
            </StyledAlert>
          </OuterContainerSwap>
        </Row>
      ) : null}
    </>
  )
}

export default RedirectBanner
