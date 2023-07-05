import { ReactElement, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'

import { RootState } from '../store'

export interface ITheme {
  white: string
  black: string
  text1: string
  text2: string
  text3: string
  bg1: string
  bg2: string
  primary1: string
  primary1Transparentized: string
  primary1Hovered: string
  primary2: string
  primary3: string
  secondary1: string
  secondary2: string
  secondary3: string
  secondary3Transparentized: string
  secondary4: string
  secondary4Hovered: string
  lightGray: string
  blue: string
  type?: 'dark' | 'light'
}

export const colors = (_darkMode: boolean): ITheme => ({
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

export const theme = (_darkMode: boolean) => ({
  ...colors(_darkMode),
  type: _darkMode ? 'dark' : 'light',
})

export default function ThemeProvider({ children }: { children: ReactElement }) {
  const currentTheme = useSelector((_state: RootState) => _state.pages.theme)
  const darkMode = currentTheme === 'dark'
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const buttonSaveStyle = {
  color: 'white',
  background: 'rgb(255, 102, 102)',
  fontSize: '16px',
  borderRadius: '10px',
  border: '0',
  padding: '5px 10px 5px 10px',
}

export const buttonResetStyle = {
  color: 'white',
  background: 'rgb(213, 217, 220)',
  fontSize: '16px',
  borderRadius: '10px',
  border: '0',
  padding: '5px 10px 5px 10px',
  marginLeft: '10px',
}

export const titleStyle = {
  color: 'rgb(71, 89, 101)',
  fontSize: '1.5rem',
  fontWeight: '500',
}

export const headerStyle = {
  paddingBottom: '0px',
}

export const inputStyle = {
  border: '0',
  outline: '0px !important',
  WebkitAppearance: 'none',
  boxShadow: 'none !important',
  textAlign: 'left',
  fontSize: '16px',
  color: '#475965',
  width: '100%',
  background: '#eaeaea',
  borderRadius: '5px',
}

export const sectionLabelStyle = {
  fontSize: '1.25rem',
  fontWeight: '350',
  marginBottom: '0px',
}

export const sectionRowStyle = {
  marginTop: '2.5rem',
}

export const settingRowStyle = {
  marginTop: '1rem',
}

export const buttonAreaStyle = {
  position: 'absolute',
  bottom: '0px',
  right: '1rem',
  marginBottom: '1rem',
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
  appearance: auto;
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
  background: ${({ theme }: { theme: ITheme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.secondary4Hovered};
  }
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
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
  background: ${({ theme }: { theme: ITheme }) => theme.secondary4};
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.secondary4Hovered};
  }
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  @media (max-width: 767.98px) {
    height: 35px;
  }
}

.navbar-nav .dropdown-menu {
  position: absolute;
  float: none;
}

.dropdown-toggle.nav-link {
  color: ${({ active, theme }: { active: boolean; theme: ITheme }) => (active ? theme.text1 : theme.text3)} !important;
}

body {
  min-height: 100vh;
  background-color: ${({ theme }: { theme: ITheme }) => theme.bg1} !important;
  background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0,0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
}
`
