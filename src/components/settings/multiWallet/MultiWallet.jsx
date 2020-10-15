import React from 'react'
import PropTypes from 'prop-types'
import { getCorresponsingVisibleAddressFormat } from '../../../utils/account-viewer'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: auto;
  background: #33B1F5;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 300;
  color: #FFFFFF;
  height: 40px;
  border: 0;
  margin-left: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
`

const MultiWallet = _props => {
  const { account, pToken, role, isConnected, onChange } = _props
  return (
    <StyledButton
      onClick={() => onChange()}
    >
      {isConnected
          ? getCorresponsingVisibleAddressFormat(pToken, role, account)
          : `CONNECT ${role === 'redeemer' ? pToken.redeemFrom : pToken.issueFrom} WALLET`}
    </StyledButton>
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
