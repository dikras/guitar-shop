/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { IMG_URL_BEGIN_INDEX, GuitarQuantityRange  } from '../../const';
import { getGuitarTypeRus } from '../../utils';
import ModalRemoveCart from '../modal-remove-cart/modal-remove-cart';
// import { addSumToCart } from '../../store/action';

type CartItemProps = {
  guitarInCart: GuitarNoComments;
}

function CartItem(props: CartItemProps): JSX.Element {
  const { guitarInCart } = props;
  const { price, vendorCode, stringCount, type, name, previewImg } = guitarInCart;
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const dispatch = useDispatch();

  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
  const [ itemQuantity, setItemQuantity ] = useState(1);
  const [ isModalRemoveCart, setIsModalRemoveCart ] = useState(false);

  const totalItemSum = itemQuantity * price;

  /* const cartItemGuitar = {
    quantity: itemQuantity + 1,
    price: price,
  }; */

  const handleEscButton = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalRemoveCart(false);
      document.removeEventListener('keydown', handleEscButton);
      document.body.style.overflow ='auto';
    }
  };

  const handleRemoveButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsModalRemoveCart(true);
    document.addEventListener('keydown', handleEscButton);
  };

  const handleDecreaseButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setItemQuantity((prev) => (prev >= GuitarQuantityRange.Min + 1) ? prev - 1 : prev);
    if (Number(inputRef.current?.value) === GuitarQuantityRange.Min) {
      handleRemoveButton(evt);
    }
  };

  const handleIncreaseButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setItemQuantity((prev) => (prev <= GuitarQuantityRange.Max - 1) ? prev + 1 : prev);
    // dispatch(addSumToCart(price));
  };

  return (
    <>
      <div className="cart-item">
        <button
          className="cart-item__close-button button-cross"
          type="button"
          aria-label="Удалить"
          onClick={handleRemoveButton}
          data-testid="button-close-cart-item"
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
          <p className="product-info__info">{getGuitarTypeRus(type)}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">
          <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
        </div>
        <div className="quantity cart-item__quantity">
          <button
            className="quantity__button"
            aria-label="Уменьшить количество"
            onClick={handleDecreaseButton}
          >
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input
            className="quantity__input"
            type="number"
            placeholder="1"
            id="2-count"
            name="2-count"
            max="99"
            ref={inputRef}
            onChange={(evt) => {
              const currentValue = Number(evt.target.value);
              if (currentValue >= GuitarQuantityRange.Min || currentValue <= GuitarQuantityRange.Max) {
                setItemQuantity(currentValue);
              }
            }}
            value={itemQuantity}
          />
          <button
            className="quantity__button"
            aria-label="Увеличить количество"
            onClick={handleIncreaseButton}
            data-testid="button-increase-quantity"
          >
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">
          <NumberFormat value={totalItemSum} displayType="text" thousandSeparator=" " /> ₽
        </div>
      </div>
      <ModalRemoveCart
        isActive={isModalRemoveCart}
        guitar={guitarInCart}
        handleModalRemoveCartCloseBtn={setIsModalRemoveCart}
        handleEscButton={handleEscButton}
      />
    </>
  );
}

export default CartItem;
