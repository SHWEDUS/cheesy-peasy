import React, {useContext, useEffect, useRef, useState} from 'react';

import Categories from "../components/SmallComponents/Categories";
import Sort, {sortItems} from "../components/SmallComponents/Sort";
import SkeletonPizza from "../components/SmallComponents/PizzaBlock/SkeletonPizza";
import PizzaBlock from "../components/SmallComponents/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from "qs";
import {useNavigate} from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const {searchValue} = useContext(SearchContext);
  const pizzas = items && items.filter((obj) => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  }).map((item) => (<PizzaBlock key={item.id} {...item}/>))

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const sortType = sort.sort;


  const fetchPizzas = () => {
    setIsLoading(true)

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sorting = `&sortBy=${sortType}`;
    console.log(category, sorting)

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

    fetchPizzas()

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
      <div className="content__items">
        {
          isLoading ?
            [...new Array(6)].map((_, index) => (<SkeletonPizza key={index}/>))
            : pizzas
        }
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage}/>
    </div>
  );
}

export default Main;