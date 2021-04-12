import React, { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
//import { useIsDarkMode } from '../state/user/hooks'

const white = '#FFFFFF'
const black = '#000000'

export function colors(_darkMode) {
  return {
    white,
    black,

    text1: _darkMode ? '#FFFFFF' : '#475965',
    text2: _darkMode ? '#C3C5CB' : '#475965ab',

    bg1: _darkMode ? '#212429' : '#FFFFFF',

    primary1: _darkMode ? '#2172E5' : '#ff6666',
    primary1Transparentized: _darkMode ? '#ff666675' : '#ff666675',
    primary1Hovered: _darkMode ? '#d64848' : '#d64848',

    primary2: _darkMode ? '#3680E7' : '#66b8ff',

    primary3: _darkMode ? '#66b8ff61' : '#66b8ff61',

    secondary1: _darkMode ? '#FFFFFF' : '#475965',
    secondary2: _darkMode ? '#C3C5CB' : '#475965ab',
    secondary3: _darkMode ? '#d5d9dc' : '#d5d9dc',

    // general
    green1: '#66b8ff40',
    green2: '#a8f7b5',

    hovered1: _darkMode ? '#ececec' : '#ececec'
  }
}

export function theme(_darkMode) {
  return {
    ...colors(_darkMode)
  }
}

export default function ThemeProvider({ children }) {
  const _darkMode = false //useIsDarkMode()
  const themeObject = useMemo(() => theme(_darkMode), [_darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
body {
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg1} !important;
}
`
