import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params) => {
    const  { search, category, sorting, currentPage } = params;
    const { data } = await axios.get(`https://65a6cc5974cf4207b4f0d408.mockapi.io/items?page=${currentPage}&limit=4${category}${search}${sorting}&order=desc`)
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success'
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer