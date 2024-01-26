import {calcTotalPrice} from "./calcTotalPrice";
import {calcTotalCount} from "./calcTotalCount";

export const getCartFromLA = () => {
  const items = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalPrice = calcTotalPrice(items)
  const totalCount = calcTotalCount(items)

  return {
    items, totalCount, totalPrice
  }
}