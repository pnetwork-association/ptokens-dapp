import store from '../index'

const getTheme = () => store.getState().pages.theme

export { getTheme }
