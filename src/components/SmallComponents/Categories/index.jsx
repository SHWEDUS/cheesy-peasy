import React, {useState} from "react";

const index = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
function Categories() {
    const [chosenCategoryId, setChosenCategoryId] = useState(0)
    function handleClickCategory(id) {
        setChosenCategoryId(id)
    }
    return (
        <div className="categories">
            <ul>
                {
                    index.map((category, id) => (
                    <li
                        key={id}
                        className={chosenCategoryId === id ? 'active' : 'none'}
                        onClick={() => handleClickCategory(id)}>
                        {category}
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;