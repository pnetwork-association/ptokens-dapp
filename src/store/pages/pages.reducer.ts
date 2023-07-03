import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoading {
  isLoading: boolean
  text: string
}
interface IInfoModal {
  show: boolean
  text: string
  showMoreText: string | null
  showMoreLabel: string | null
}

interface IFace {
  selectedPage: string
  loading: ILoading
  theme: string
  infoModal: IInfoModal
}

const initialState: IFace = {
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
    selectPage: (state, action: PayloadAction<string>) => {
      state.selectedPage = action.payload
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    updateInfoModal: (state, action: PayloadAction<IInfoModal>) => {
      state.infoModal = action.payload
    },
    setLoading: (state, action: PayloadAction<ILoading>) => {
      state.loading = action.payload
    },
  },
})

export const { selectPage, setTheme, updateInfoModal, setLoading } = pagesSlice.actions
export default pagesSlice.reducer
