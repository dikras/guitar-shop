import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGuitarsInCart,
  getTotalSumByCartItem
} from '../../store/cart-reducer/selectors';
import { getDiscount } from '../../store/cart-reducer/selectors';
import CartItem from '../cart-item/cart-item';
import { NUMBER_TO_ROUND, COUPON_VALUES } from '../../const';
import { fetchDiscount } from '../../store/api-action';

function CartContainer(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const totalSum = useSelector(getTotalSumByCartItem);
  const inputCouponRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const discountNumber = useSelector(getDiscount);
  const discountSum = discountNumber / 100 * totalSum;

  const [ couponMessage, setCouponMessage ] = useState(<p></p>);
  const [ isDiscountGet, setIsDiscountGet ] = useState(false);

  const handleApplyPromocode = (evt?: React.MouseEvent) => {
    evt && evt.preventDefault();
    const inputValue = inputCouponRef.current?.value;
    const validMessageElement = <p className="form-input__message form-input__message--success">Промокод принят</p>;
    const notValidMessageElement = <p className="form-input__message form-input__message--error">Неверный промокод</p>;

    if (inputValue) {
      inputValue.includes('') && setCouponMessage(notValidMessageElement);
      COUPON_VALUES.includes(inputValue) ?
        setCouponMessage(validMessageElement) :
        setCouponMessage(notValidMessageElement);
      if (COUPON_VALUES.includes(inputValue)) {
        dispatch(fetchDiscount({coupon: inputValue}));
        setIsDiscountGet(true);
      }
    }
  };

  return (
    <div className="cart">
      {guitarsInCart.map((guitarInCart) => <CartItem key={nanoid(NUMBER_TO_ROUND)} guitarInCart={guitarInCart} />)}
      <div className="cart__footer">
        <div className="cart__coupon coupon">
          <h2 className="title title--little coupon__title">Промокод на скидку</h2>
          <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
          <form className="coupon__form" id="coupon-form" method="post" action="/">
            <div className="form-input coupon__input">
              <label className="visually-hidden">Промокод</label>
              <input
                type="text"
                placeholder="Введите промокод"
                id="coupon" name="coupon"
                ref={inputCouponRef}
                onChange={(evt) => {
                  !evt.target.value && setCouponMessage(<p></p>);
                }}
                data-testid="coupon-input"
              />
              {couponMessage}
            </div>
            <button
              className="button button--big coupon__button"
              onClick={handleApplyPromocode}
            >Применить
            </button>
          </form>
        </div>
        <div className="cart__total-info">
          <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span>
            <span className="cart__total-value">
              <NumberFormat value={totalSum} displayType="text" thousandSeparator=" " /> ₽
            </span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">Скидка:</span>
            <span className={`cart__total-value ${isDiscountGet ? 'cart__total-value--bonus' : ''}`}>
              - <NumberFormat value={discountSum} displayType="text" thousandSeparator=" " /> ₽
            </span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">К оплате:</span>
            <span className="cart__total-value cart__total-value--payment">
              <NumberFormat value={totalSum - discountSum} displayType="text" thousandSeparator=" " /> ₽
            </span>
          </p>
          <button className="button button--red button--big cart__order-button" data-testid="button-cart-order">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
