import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPage: 'swap',
  loading: {
    isLoading: false,
    text: null,
  },
  theme: 'light',
  infoModal: {
    show: false,
    text: null,
    showMoreText: null,
    showMoreLabel: null,
  },
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    selectPage(state, action) {
      state.selectedPage = action.payload
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    updateInfoModal(state, action) {
      state.infoModal = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const { selectPage, setTheme, updateInfoModal, setLoading } = pagesSlice.actions
export default pagesSlice.reducer
