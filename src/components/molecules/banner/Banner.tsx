import React, { ReactNode, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'

import { ITheme } from '../../../theme/ThemeProvider'
import Icon from '../../atoms/icon/Icon'

const ContainerBanner = styled(Container)`
  width: 100%;
  text-align: center;
  line-height: 40px;
  color: white;
  display: inline-block;
  vertical-align: middle;
  background: ${({ theme }: { theme: ITheme }) => theme.primary1};
  max-width: 100%;
`

const ContainerText = styled(Col)`
  text-align: center;
  font-size: 15px;
  @media (max-width: 767.98px) {
    font-size: 13px;
  }
`

const ContainerCloseIcon = styled(Col)`
  text-align: right;
`

const CloseIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  cursor: pointer;
`

type BannerProps = {
  children: ReactNode
}

const Banner = ({ children }: BannerProps) => {
  const [show, setShow] = useState(true)

  return show ? (
    <ContainerBanner>
      <Row>
        <Col xs={2} />
        <ContainerText xs={8}>{children}</ContainerText>
        <ContainerCloseIcon xs={2}>
          {' '}
          <CloseIcon icon="close" onClick={() => setShow(false)} />
        </ContainerCloseIcon>
      </Row>
    </ContainerBanner>
  ) : null
}

export default Banner
