import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sort: 'rating'
  }
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
  },
})

export const { changeCategoryId, changeSort} = filterSlice.actions

export default filterSlice.reducer