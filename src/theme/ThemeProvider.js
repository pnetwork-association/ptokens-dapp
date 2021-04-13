import React, { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

export function colors(_darkMode) {
  return {
    white: '#FFFFFF',
    black: '#000000',

    text1: _darkMode ? '#FFFFFF' : '#475965',
    text2: _darkMode ? '#c3c5cb' : '#475965ab',
    text3: _darkMode ? '#6c7284' : '#475965ab',

    bg1: _darkMode ? '#2C313B' : '#FFFFFF',
    bg2: _darkMode ? '#a7aaaf42' : '#ececec',

    primary1: _darkMode ? '#32b1f5' : '#ff6666',
    primary1Transparentized: _darkMode ? '#32b1f594' : '#ff666675',
    primary1Hovered: _darkMode ? '#015b8c' : '#d64848',

    primary2: _darkMode ? '#3680E7' : '#66b8ff',
    primary3: _darkMode ? '#66b8ff61' : '#66b8ff61',

    secondary1: _darkMode ? '#FFFFFF' : '#475965',
    secondary2: _darkMode ? '#6c7284' : '#d5d9dc',

    secondary3: _darkMode ? '#212429' : '#FFFFFF',
    secondary3Transparentized: _darkMode ? '#21242980' : '#FFFFFF',

    secondary4: _darkMode ? '#40444f' : '#eaeaea',
    secondary4Hovered: _darkMode ? '#6f768a' : '#c1bfbf',

    lightGray: '#4759654d',
    blue: '#66b8ff'
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
  background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0,0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
}
`
