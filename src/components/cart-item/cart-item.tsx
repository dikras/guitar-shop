import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { IMG_URL_BEGIN_INDEX } from '../../const';
import { getGuitarTypeRus } from '../../utils';
import { removeGuitarFromCart } from '../../store/action';

type CartItemProps = {
  guitarInCart: GuitarNoComments;
}

function CartItem(props: CartItemProps): JSX.Element {
  const { guitarInCart } = props;
  const { price, vendorCode, stringCount, type, name, previewImg } = guitarInCart;
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
  const [ itemQuantity, setItemQuantity ] = useState(1);

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={(evt) => {
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
        <p className="product-info__info">{getGuitarTypeRus(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">
        <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
      </div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={(evt) => {
            evt.preventDefault();
            setItemQuantity((prev) => prev - 1);
          }}
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
            setItemQuantity(Number(evt.target.value));
          }}
          value={itemQuantity}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={(evt) => {
            evt.preventDefault();
            setItemQuantity((prev) => prev + 1);
          }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        <NumberFormat value={itemQuantity*price} displayType="text" thousandSeparator=" " /> ₽
      </div>
    </div>
  );
}

export default CartItem;
