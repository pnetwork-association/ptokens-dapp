import React, { useContext } from 'react'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'

const CustomSwitch = ({ checked, onChange, ..._props }) => {
  const theme = useContext(ThemeContext)

  return (
    <Switch
      offColor={theme.secondary2}
      onColor={theme.primary1}
      offHandleColor={theme.white}
      onHandleColor={theme.white}
      checkedIcon={false}
      uncheckedIcon={false}
      checked={checked}
      onChange={onChange ? onChange : () => {}}
      {..._props}
    />
  )
}

export default CustomSwitch
