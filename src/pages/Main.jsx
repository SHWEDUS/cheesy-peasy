import React, {useCallback, useContext, useEffect, useState} from 'react';

import Categories from "../components/SmallComponents/Categories";
import Sort from "../components/SmallComponents/Sort";
import SkeletonPizza from "../components/SmallComponents/PizzaBlock/SkeletonPizza";
import PizzaBlock from "../components/SmallComponents/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";
import axios from "axios";
import debounce from 'lodash.debounce'

function Main() {
  const {categoryId, sort} = useSelector(state => state.filter);
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const {searchValue} = useContext(SearchContext);
  const pizzas = items && items.filter((obj) => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  }).map((item) => (<PizzaBlock key={item.id} {...item}/>))
  const sortType = sort.sort;


  useEffect(() => {
    setIsLoading(true)

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sorting = `&sortBy=${sortType}`;

    axios.get(`https://65a6cc5974cf4207b4f0d408.mockapi.io/items?page=${currentPage}&limit=4${category}${search}${sorting}&order=desc`)
      .then((response) => {
        setItems(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, currentPage, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ?
            [...new Array(6)].map((_, index) => (<SkeletonPizza key={index}/>))
            : pizzas
        }
      </div>
      <Pagination setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default Main;