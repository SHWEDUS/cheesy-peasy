import React, {useEffect, useState} from 'react';

import Categories from "../components/SmallComponents/Categories";
import Sort from "../components/SmallComponents/Sort";
import SkeletonPizza from "../components/SmallComponents/PizzaBlock/SkeletonPizza";
import PizzaBlock from "../components/SmallComponents/PizzaBlock";

function Main() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://65a6cc5974cf4207b4f0d408.mockapi.io/items')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ?
            [...new Array(6)].map((_, index) => (<SkeletonPizza key={index}/>))
            : items.map((item) => (<PizzaBlock key={item.id} {...item}/>))
        }
      </div>
    </>
  );
}

export default Main;