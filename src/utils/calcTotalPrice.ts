export const calcTotalPrice = (items: PizzaCartType[]) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0)
}