export const calcTotalCount = (items: PizzaCartType[]) => {
  return items.reduce((acc, item) => {
    return acc + item.count;
  }, 0)
}