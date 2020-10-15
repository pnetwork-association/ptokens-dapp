import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../utils/Button'
import { getCorresponsingVisibleAddressFormat } from '../../../utils/account-viewer'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 5px;
`

const MultiWallet = _props => {
  const { account, pToken, role, isConnected, onChange } = _props
  return (
    <StyledButton
      text={
        isConnected
          ? getCorresponsingVisibleAddressFormat(pToken, role, account)
          : 'CONNECT'
      }
      onClick={() => onChange()}
    />
  )
}

MultiWallet.propTypes = {
  role: PropTypes.string,
  pToken: PropTypes.object,
  account: PropTypes.bool,
  isConnected: PropTypes.bool,
  onChange: PropTypes.func
}

export default MultiWallet
