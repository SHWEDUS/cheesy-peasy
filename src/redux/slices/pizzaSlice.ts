import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "@/src/redux/store";

export type FetchPizzasArgs = {
  search: string;
  category: string;
  sorting: string;
  currentPage: number
}

export const fetchPizzas = createAsyncThunk<PizzaResponse[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async (params) => {
    const  { search, category, sorting, currentPage } = params;
    const { data } = await axios.get<PizzaResponse[]>(`https://65a6cc5974cf4207b4f0d408.mockapi.io/items?page=${currentPage}&limit=4${category}${search}${sorting}&order=desc`)
    return data
  }
)

enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
}

interface PizzaSliceState {
  items: PizzaResponse[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaResponse[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer