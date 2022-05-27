import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { IMG_URL_BEGIN_INDEX, GuitarQuantityRange  } from '../../const';
import { getGuitarTypeRus } from '../../utils';
import ModalRemoveCart from '../modal-remove-cart/modal-remove-cart';
import { increaseGuitarQuantity, decreaseGuitarQuantity, setGuitarQuantity } from '../../store/action';
import { getGuitarToCountQuantity } from '../../store/cart-reducer/selectors';
import { State } from '../../types/state';

type CartItemProps = {
  guitarInCart: GuitarNoComments;
}

function CartItem(props: CartItemProps): JSX.Element {
  const { guitarInCart } = props;
  const { price, vendorCode, stringCount, type, name, previewImg, uniqID } = guitarInCart;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentGuitarToCountQuantity = useSelector((state: State) => getGuitarToCountQuantity(state, uniqID));

  const dispatch = useDispatch();

  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
  const [ isModalRemoveCart, setIsModalRemoveCart ] = useState(false);

  const totalItemSum = currentGuitarToCountQuantity && currentGuitarToCountQuantity * price;

  const handleModalRemoveEsc = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalRemoveCart(false);
    }
  };

  const handleRemoveButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsModalRemoveCart(true);
  };

  const handleDecreaseButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (Number(inputRef.current?.value) >= GuitarQuantityRange.Min + 1) {
      dispatch(decreaseGuitarQuantity(uniqID));
    }
    if (Number(inputRef.current?.value) === GuitarQuantityRange.Min) {
      handleRemoveButton(evt);
    }
  };

  const handleIncreaseButton = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (Number(inputRef.current?.value) <= GuitarQuantityRange.Max - 1) {
      dispatch(increaseGuitarQuantity(uniqID));
    }
  };

  useEffect(() => {
    if(isModalRemoveCart){
      window.addEventListener('keydown', handleModalRemoveEsc);
      document.body.style.overflow ='hidden';
      return function () {
        window.removeEventListener('keydown', handleModalRemoveEsc);
        document.body.style.overflow ='auto';
      };
    }
  });

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
                dispatch(setGuitarQuantity({uniqID, quantity: currentValue}));
              }
            }}
            value={currentGuitarToCountQuantity}
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
      {isModalRemoveCart &&
      <ModalRemoveCart
        guitar={guitarInCart}
        handleModalRemove={setIsModalRemoveCart}
      />}
    </>
  );
}

export default CartItem;
