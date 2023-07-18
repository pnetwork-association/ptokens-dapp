import React, { useContext } from 'react'
import Switch, { ReactSwitchProps } from 'react-switch'
import { ThemeContext } from 'styled-components'

import { ITheme } from '../../../theme/ThemeProvider'

const CustomSwitch = (_props: ReactSwitchProps) => {
  const theme = useContext(ThemeContext) as ITheme
  return (
    <Switch
      offColor={theme.secondary2}
      onColor={theme.primary1}
      offHandleColor={theme.white}
      onHandleColor={theme.white}
      checkedIcon={false}
      uncheckedIcon={false}
      {..._props}
    />
  )
}

CustomSwitch.defaultProps = {
  onchange: () => {
    return
  },
}

export default CustomSwitch
