import { NFTS_DATA_LOADED } from '../../constants/index'

const initialState = {
  all: []
}

const nftsReducer = (_state = initialState, _action) => {
  const { type, payload } = _state
  if (type === NFTS_DATA_LOADED) {
    const { nfts } = payload
    return Object.assign({}, _state, {
      all: nfts,
      ..._state
    })
  }
  return _state
}

export default nftsReducer
