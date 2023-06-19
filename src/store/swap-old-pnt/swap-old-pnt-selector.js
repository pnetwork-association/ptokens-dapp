import store from '../index'
import { PTokenId } from '../../constants'

const getOldPnt = () => store.getState().swapOldPnt.assets.find(({ id }) => id === PTokenId.PNT_ON_BSC_MAINNET_OLD)

const getNewPnt = () => store.getState().swapOldPnt.assets.find(({ id }) => id === PTokenId.PNT_ON_BSC_MAINNET)

export { getOldPnt, getNewPnt }
