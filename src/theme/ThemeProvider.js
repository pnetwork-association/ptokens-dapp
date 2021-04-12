import React, { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

export function colors(_darkMode) {
  return {
    white: '#FFFFFF',
    black: '#000000',

    text1: _darkMode ? '#FFFFFF' : '#475965',
    text2: _darkMode ? '#FFFFFF' : '#475965ab',

    bg1: _darkMode ? '#2C313B' : '#FFFFFF',

    primary1: _darkMode ? '#32b1f5' : '#ff6666',
    primary1Transparentized: _darkMode ? '#32b1f54f' : '#ff666675',
    primary1Hovered: _darkMode ? '#015b8c' : '#d64848',

    primary2: _darkMode ? '#3680E7' : '#66b8ff',
    primary3: _darkMode ? '#66b8ff61' : '#66b8ff61',

    secondary1: _darkMode ? '#FFFFFF' : '#475965',
    secondary2: _darkMode ? '#d5d9dc' : '#d5d9dc',

    secondary5: _darkMode ? 'rgb(33, 36, 41)' : 'white',
    secondary5Transparentized: _darkMode ? '#21242980' : 'white'
  }
}

export function theme(_darkMode) {
  return {
    ...colors(_darkMode),
    type: _darkMode ? 'dark' : 'light'
  }
}

export default function ThemeProvider({ children }) {
  const currentTheme = useSelector(_state => _state.pages.theme)
  const darkMode = currentTheme === 'dark'
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
body {
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg1} !important;
}
`
