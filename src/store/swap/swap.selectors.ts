import { Blockchain } from 'ptokens-constants'

import { AssetId } from '../../constants'
import store from '../index'

const getAssets = () => store.getState().swap.assets

const getAssetsWithAddress = () => Object.values(store.getState().swap.assets).filter(({ address }) => address)

const getAssetsByBlockchain = (_blockchain: Blockchain) =>
  Object.values(store.getState().swap.assets).filter(({ blockchain }) => blockchain === _blockchain)

const getAssetById = (_id: AssetId) => store.getState().swap.assets[_id] || null

export { getAssets, getAssetsWithAddress, getAssetsByBlockchain, getAssetById }
