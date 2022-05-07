/* eslint-disable no-console */
import React from 'react';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import { getGuitarsInCart, getTotalSum } from '../../store/cart-reducer/selectors';
import { removeGuitarFromCart } from '../../store/action';
import { nanoid } from 'nanoid';
import { NUMBER_TO_ROUND, IMG_URL_BEGIN_INDEX } from '../../const';
import { getGuitarTypeRus } from '../../utils';

function CartContainer(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const dispatch = useDispatch();

  const totalSum = useSelector(getTotalSum);

  return (
    <div className="cart">
      {guitarsInCart.map((guitarInCart) => {
        const { price, vendorCode, stringCount, type, name, previewImg } = guitarInCart;
        const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
        return (
          <div key={nanoid(NUMBER_TO_ROUND)} className="cart-item">
            <button
              className="cart-item__close-button button-cross"
              type="button"
              aria-label="Удалить"
              onClick={(evt: React.MouseEvent) => {
                evt.preventDefault();
                dispatch(removeGuitarFromCart(guitarInCart));
              }}
            >
              <span className="button-cross__icon"></span>
              <span className="cart-item__close-button-interactive-area"></span>
            </button>
            <div className="cart-item__image">
              <img src={`/img/content/${urlImg}`} width="55" height="130" alt={`${getGuitarTypeRus(type)} ${name}`} />
            </div>
            <div className="product-info cart-item__info">
              <p className="product-info__title">{getGuitarTypeRus(type)} {name}</p>
              <p className="product-info__info">Артикул: {vendorCode}</p>
              <p className="product-info__info">Электрогитара, {stringCount} струнная</p>
            </div>
            <div className="cart-item__price">
              <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
            </div>
            <div className="quantity cart-item__quantity">
              <button className="quantity__button" aria-label="Уменьшить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
              <button className="quantity__button" aria-label="Увеличить количество">
                <svg width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
            <div className="cart-item__price-total">
              <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
            </div>
          </div>
        );
      })}
      <div className="cart__footer">
        <div className="cart__coupon coupon">
          <h2 className="title title--little coupon__title">Промокод на скидку</h2>
          <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
          <form className="coupon__form" id="coupon-form" method="post" action="/">
            <div className="form-input coupon__input">
              <label className="visually-hidden">Промокод</label>
              <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
              <p className="form-input__message form-input__message--success">Промокод принят</p>
            </div>
            <button className="button button--big coupon__button">Применить</button>
          </form>
        </div>
        <div className="cart__total-info">
          <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span>
            <span className="cart__total-value">
              <NumberFormat value={totalSum} displayType="text" thousandSeparator=" " /> ₽
            </span>
          </p>
          <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
          <button className="button button--red button--big cart__order-button">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
