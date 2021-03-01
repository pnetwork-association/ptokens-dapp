import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../../utils/account-viewer'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: auto;
  background: #ff6666;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
  height: 50px;
  border: 0;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  border-radius: 20px;
  outline: none !important;
  box-shadow: none;
`

const MultiWallet = _props => {
  const { account, pToken, role, isConnected, onChange } = _props
  return (
    <StyledButton onClick={() => onChange()}>
      {isConnected
        ? getCorresponsingVisibleAddressFormat(pToken, role, account)
        : `CONNECT ${role === 'redeemer' ? pToken.redeemFrom : pToken.issueFrom} WALLET`}
    </StyledButton>
  )
}

MultiWallet.propTypes = {
  role: PropTypes.string,
  pToken: PropTypes.object,
  account: PropTypes.string,
  isConnected: PropTypes.bool,
  onChange: PropTypes.func
}

export default MultiWallet
