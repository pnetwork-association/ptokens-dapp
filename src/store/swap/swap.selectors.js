import store from '../index'

const getAssets = () => store.getState().swap.assets

const getAssetsWithAddress = () => store.getState().swap.assets.filter(({ address }) => address)

const getAssetsByBlockchain = (_blockchain) =>
  store.getState().swap.assets.filter(({ blockchain }) => blockchain === _blockchain)

const getAssetById = (_id) => store.getState().swap.assets.find(({ id }) => id === _id)

export { getAssets, getAssetsWithAddress, getAssetsByBlockchain, getAssetById }
