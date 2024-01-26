import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/src/redux/store";

interface CartSliceState {
  totalPrice: number;
  items: PizzaCartType[];
  totalCount: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaCartType>) {
      const findItem = state.items.find((item) => item.id === action.payload.id)

      findItem ? findItem.count++ : state.items.push({
        ...action.payload,
        count: 1
      })
      state.totalPrice += action.payload.price
      state.totalCount += 1
    },
    removeItem(state, action: PayloadAction<PizzaCartType>) {
      const findItem = state.items.find((item) => item.id === action.payload.id)
      findItem.count > 1 ? findItem.count-- : state.items = state.items.filter(obj => obj.id !== action.payload.id)
      state.totalPrice -= action.payload.price
      state.totalCount -= 1
    },
    destroyItem(state, acton: PayloadAction<PizzaCartType>) {
      state.items = state.items.filter(obj => obj.id !== acton.payload.id)
      state.totalPrice -= acton.payload.price * acton.payload.count
      state.totalCount -= acton.payload.count
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(item => item.id === id)

export const { addItem, clearItems, removeItem, destroyItem } = cartSlice.actions

export default cartSlice.reducer