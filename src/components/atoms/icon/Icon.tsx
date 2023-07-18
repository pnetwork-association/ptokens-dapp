import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import getIconSource from './icon-importer'

const commonCss = css`
  color: ${({ color }: IconProps) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
  }
  ${({ isGreyScale }: IconProps) => (isGreyScale ? 'filter: grayscale(100%); opacity: 0.25;' : '')}
`
const StyledSpan = styled.span`
  ${commonCss};
`

const StyledImg = styled.img`
  ${commonCss};
`

type IconProps = {
  icon: string
  isGreyScale?: boolean
  color?: string
  fontSize?: string
  onClick?: () => void
}

const Icon = (props: IconProps) => {
  if (props.icon.startsWith('data:') || props.icon.startsWith('http') || props.icon.startsWith('asset:')) {
    const asset = props.icon.startsWith('asset:') && `src/app/assets/icons/${props.icon.split(':')[1]}`
    return <StyledImg alt="" src={asset || props.icon} {...props} />
  }

  const svg = getIconSource(props.icon)
  return <StyledSpan {...props} dangerouslySetInnerHTML={{ __html: svg }} />
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  isGreyScale: PropTypes.bool,
  fontSize: PropTypes.string,
  color: PropTypes.string,
}

Icon.defaultProps = {
  isGreyScale: false,
  fontSize: 'sizeIconBase',
  color: 'white',
}

export default Icon
