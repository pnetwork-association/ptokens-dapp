import store from '../index'

const getTheme = () => store.getState().pages.theme

const getIsLoading = () => store.getState().pages.loading.isLoading

export { getTheme, getIsLoading }
