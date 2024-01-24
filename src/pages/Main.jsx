import React, {useContext, useEffect, useRef} from 'react';

import Categories from "../components/SmallComponents/Categories";
import Sort, {sortItems} from "../components/SmallComponents/Sort";
import SkeletonPizza from "../components/SmallComponents/PizzaBlock/SkeletonPizza";
import PizzaBlock from "../components/SmallComponents/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

function Main() {
  const navigate = useNavigate();

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const {items, status} = useSelector(state => state.pizza)
  const dispatch = useDispatch();

  const {searchValue} = useContext(SearchContext);
  const pizzas = items && items.filter((obj) => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  }).map((item) => (<PizzaBlock key={item.id} {...item}/>))

  const isMounted = useRef(false);

  const sortType = sort.sort;

  const getPizzas = async () => {

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sorting = `&sortBy=${sortType}`;

    dispatch(fetchPizzas({
      search,
      category,
      sorting,
      currentPage
    }))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortItems.find(obj => obj.sort === params.sort)
      dispatch(setFilters({
        ...params,
        sort
      }))
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)

    getPizzas()

  }, [categoryId, searchValue, currentPage, sortType]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, currentPage, sort.sort]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
          <div className="content__error-info">
            <h2>Упс... Пиццы не найдены... <span>😕</span></h2>
            <p>
              Не переживайте! Возможно, в будущем мы сделаем такую пиццу.<br/>
              Отличное название!
            </p>
          </div>
        ) : (
          <div className="content__items">
            {
              status === 'loading' ?
                [...new Array(6)].map((_, index) => (<SkeletonPizza key={index}/>))
                : pizzas
            }
          </div>
        )
      }
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage}/>
    </div>
  );
}

export default Main;