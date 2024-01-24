import React from "react";
import {changeCategoryId, selectFilter} from "../../../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";

const index = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
function Categories() {
  const dispatch = useDispatch();
  const {categoryId} = useSelector(selectFilter)
    return (
        <div className="categories">
            <ul>
                {
                    index.map((category, id) => (
                    <li
                        key={id}
                        className={categoryId === id ? 'active' : 'none'}
                        onClick={() => dispatch(changeCategoryId(id))}>
                        {category}
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;