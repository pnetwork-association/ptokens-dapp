import store from '../index'
import { PNT_ON_BSC_MAINNET_OLD, PNT_ON_BSC_MAINNET } from '../../constants'

const getOldPnt = () => store.getState().swapOldPnt.assets.find(({ id }) => id === PNT_ON_BSC_MAINNET_OLD)

const getNewPnt = () => store.getState().swapOldPnt.assets.find(({ id }) => id === PNT_ON_BSC_MAINNET)

export { getOldPnt, getNewPnt }
