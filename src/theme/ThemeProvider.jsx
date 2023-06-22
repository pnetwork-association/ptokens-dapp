import React, { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

export const colors = (_darkMode) => ({
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
  blue: '#66b8ff',
})

export const theme = (_darkMode) => ({
  ...colors(_darkMode),
  type: _darkMode ? 'dark' : 'light',
})

export default function ThemeProvider({ children }) {
  const currentTheme = useSelector((_state) => _state.pages.theme)
  const darkMode = currentTheme === 'dark'
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
html * {
  font-family: 'Chivo', sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

/* Firefox */
input[type=number] {
-moz-appearance: textfield;
}

.modal-content {
  border-radius: 20px !important;
  @media (max-width: 767.98px) {
    padding: 15px;
    background: transparent;
  }
}

.modal-wallet {
  max-width: 450px !important;
  margin: 1.75rem auto;
}

.modal-tos {
  margin: 1.75rem auto;
}

.alert-dismissible {
  padding-right: 2.6rem;
}

.alert-dismissible .close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding-top: 0rem;
  padding-right: 0.75rem;
  padding-bottom: 0rem;
  padding-left: 0.5rem;
  color: inherit;
  line-height: 0.9;
}

.api-icon {
  stroke-width: 1;
  height: 28px;
  width: 28px;
}

.api-icon-mobile {
  stroke-width: 1;
  height: 23px;
  width: 23px;
}

.api-button {
  width: 40px;
  color: white;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 300;
  height: 40px;
  border: 0;
  margin-left: 10px;
  font-weight: 500;
  border-radius: 10px;
  outline: none !important;
  background: ${({ theme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }) => theme.secondary4Hovered};
  }
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    height: 35px;
  }
}

.api-button-mobile {
  width: 35px;
  color: white;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 300;
  height: 35px;
  border: 0;
  padding: 0;
  margin-left: 10px;
  font-weight: 500;
  border-radius: 10px;
  outline: none !important;
  background: ${({ theme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }) => theme.secondary4Hovered};
  }
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    height: 35px;
  }
}

.navbar-nav .dropdown-menu {
  position: absolute;
  float: none;
}

.dropdown-toggle.nav-link {
  color: ${({ active, theme }) => (active ? theme.text1 : theme.text3)} !important;
}

body {
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg1} !important;
  background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0,0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
}
`
