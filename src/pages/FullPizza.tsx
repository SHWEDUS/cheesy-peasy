import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FullPizza(): React.JSX.Element | string {
  const {id} = useParams();
  const [pizza, setPizza] = useState<PizzaResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://65a6cc5974cf4207b4f0d408.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (e) {
        alert('Ошибка! Нет такой пиццы :(')
        navigate('/')
      }
    }

    fetchPizza()
  }, []);

  if (!pizza) {
    return 'Загрузка...'
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={pizza.title}/>
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price} ₽</p>
    </div>
  );
}

export default FullPizza;