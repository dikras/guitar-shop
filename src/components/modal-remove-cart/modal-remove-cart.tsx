/* eslint-disable no-console */
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { getGuitarTypeRus } from '../../utils';
import { IMG_URL_BEGIN_INDEX } from '../../const';
import { useDispatch } from 'react-redux';
import { removeGuitarFromCart } from '../../store/action';

type ModalRemoveCartProps = {
  guitar: GuitarNoComments;
  handleModalRemove: (opened: boolean) => void;
}

function ModalRemoveCart(props: ModalRemoveCartProps): JSX.Element {
  const { guitar, handleModalRemove } = props;
  const { name, previewImg, vendorCode, stringCount, price, type } = guitar;
  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
  const dispatch = useDispatch();

  const [ isOverButtonRemoveFromCart, setIsOverButtonRemoveFromCart ] = useState(true);
  const [ isOverButtonToCart, setIsOverButtonToCart ] = useState(false);

  const handleModalRemoveCartClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    handleModalRemove(false);
  };

  const handleRemoveFromCartButton =(evt: React.MouseEvent) => {
    evt.preventDefault();
    document.body.style.overflow ='auto';
    dispatch(removeGuitarFromCart(guitar));
  };

  const handleOverButtonRemoveFromCart = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (isOverButtonRemoveFromCart) {
      setIsOverButtonRemoveFromCart(true);
    }
    if (isOverButtonToCart) {
      setIsOverButtonToCart(false);
    }
  };

  const handleOverButtonToCart = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (isOverButtonRemoveFromCart) {
      setIsOverButtonRemoveFromCart(false);
    }
    if (isOverButtonToCart) {
      setIsOverButtonToCart(true);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleModalRemoveCartClose}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">?????????????? ???????? ???????????</h2>
          <div className="modal__info">
            <img className="modal__img" src={`/img/content/${urlImg}`} width="67" height="137" alt={name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">???????????? {name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">??????????????: {vendorCode}</p>
              <p className="modal__product-params">{getGuitarTypeRus(type)}, {stringCount} ????????????????</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">????????:</span>
                <span className="modal__price">
                  <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ???
                </span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className={`button button--small modal__button ${isOverButtonRemoveFromCart ? '' : 'button--black-border'}`}
              onClick={handleRemoveFromCartButton}
              onMouseOver={handleOverButtonRemoveFromCart}
              data-testid="button-remove-cart-item"
            >?????????????? ??????????
            </button>
            <button
              className={`button button--small modal__button modal__button--right ${isOverButtonToCart ? '' : 'button--black-border'}`}
              onClick={handleModalRemoveCartClose}
              onMouseOver={handleOverButtonToCart}
            >???????????????????? ??????????????
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="??????????????"
            onClick={handleModalRemoveCartClose}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRemoveCart;
