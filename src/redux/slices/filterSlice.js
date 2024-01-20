import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sort: 'rating'
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    changeSort: (state, action) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const { changeCategoryId, changeSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer