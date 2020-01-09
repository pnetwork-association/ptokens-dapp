import {
  SET_SELECTED_PAGE,
  SET_SELECTED_PAGE_FROM_PATHNAME,
  SET_COLLAPSE_STATE
} from '../../constants/index'

const initialState = {
  selected: 0,
  isCollapseOpened: false
}

const sidebarReducer = (state = initialState, action) => {
  if (
    action.type === SET_SELECTED_PAGE ||
    action.type === SET_SELECTED_PAGE_FROM_PATHNAME
  ) {
    return Object.assign({}, state,{
      selected: action.payload
    })
  }
  if (action.type === SET_COLLAPSE_STATE) {
    return Object.assign({}, state,{
      isCollapseOpened: action.payload
    })
  }
  return state
}

export default sidebarReducer
