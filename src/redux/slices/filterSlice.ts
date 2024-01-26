import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/src/redux/store";

export type SortType = {
  name: string;
  sort: 'rating' | 'price' | 'title'}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: '',
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
    changeCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = action.payload.categoryId
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    }
  },
})

export const selectFilter = (state: RootState) => state.filter

export const { changeCategoryId, changeSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer