import store from '../index'

const getAssets = () => store.getState().swap.assets

const getAssetsWithAddress = () => store.getState().swap.assets.filter(({ address }) => address)

export { getAssets, getAssetsWithAddress }
