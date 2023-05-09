const getWeb3ModalTheme = (_theme) => {
  switch (_theme) {
    case 'light': {
      return 'light'
    }
    case 'dark': {
      return {
        background: '#2C313B',
        main: '#ffffff',
        secondary: '#6c7284',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: '#a7aaaf42',
      }
    }
    default:
      throw new Error('Invalid theme')
  }
}

export { getWeb3ModalTheme }
