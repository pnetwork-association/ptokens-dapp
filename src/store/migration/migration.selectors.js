import store from '../index'

const getAssets = () => store.getState().migration.assets

const getAssetsWithAddress = () => store.getState().migration.assets.filter(({ address }) => address)

const getAssetsByBlockchain = (_blockchain) =>
  store.getState().migration.assets.filter(({ blockchain }) => blockchain.toUpperCase() === _blockchain.toUpperCase())

const getAssetById = (_id) => store.getState().migration.assets.find(({ id }) => id === _id)

export { getAssets, getAssetsWithAddress, getAssetsByBlockchain, getAssetById }
