import React from 'react';
import {Link} from "react-router-dom";
import cheese from '../../../assets/img/cheese.svg'

function EmptyCart(): React.JSX.Element {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая <span>😕</span></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cheese} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
      </div>
    </div>
);
}

export default EmptyCart;