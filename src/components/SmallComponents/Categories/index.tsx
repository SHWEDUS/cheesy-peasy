import React, {memo} from "react";

const index = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (id: number) => void
}

const Categories: React.FC<CategoriesProps> = memo(({categoryId, setCategoryId}) => (
  <div className="categories">
    <ul>
      {
        index.map((category, id) => (
          <li
            key={id}
            className={categoryId === id ? 'active' : 'none'}
            onClick={() => setCategoryId(id)}>
            {category}
          </li>
        ))
      }
    </ul>
  </div>
))

export default Categories;