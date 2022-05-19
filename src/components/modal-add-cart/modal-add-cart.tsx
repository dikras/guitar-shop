/* eslint-disable no-console */
import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { IMG_URL_BEGIN_INDEX } from '../../const';
import { addGuitarToCart } from '../../store/action';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalSuccessAddCart from '../modal-success-add-cart/modal-success-add-cart';
import { getGuitarTypeRus } from '../../utils';
import { nanoid } from 'nanoid';

type ModalAddCartProps = {
  isActive: boolean;
  handleModalAddCartCloseBtn: (opened: boolean) => void;
  handleEscButton: (e: KeyboardEvent) => void;
  guitar: GuitarNoComments;
  isMainScreen: boolean;
}

function ModalAddCart(props: ModalAddCartProps): JSX.Element {
  const { isActive, handleModalAddCartCloseBtn, handleEscButton, guitar, isMainScreen } = props;
  const { name, previewImg, vendorCode, stringCount, price, type } = guitar;
  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);

  const dispatch = useDispatch();

  const [ isModalSuccessAddCart, setIsModalSuccessAddCart ] = useState(false);

  const handleEscModalSuccessAddButton = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalSuccessAddCart(false);
      document.body.style.overflow ='auto';
      document.removeEventListener('keydown', handleEscButton);
    }
  };

  const handleAddToCartBtnClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    const guitarToCart = {...guitar, uniqID: nanoid()};
    dispatch(addGuitarToCart(guitarToCart));
    setIsModalSuccessAddCart(true);
    handleModalAddCartCloseBtn(false);
    document.body.style.overflow ='hidden';
    document.addEventListener('keydown', handleEscModalSuccessAddButton);
  };

  return (
    <>
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            data-close-modal
            onClick={() => {
              handleModalAddCartCloseBtn(false);
              document.body.style.overflow ='auto';
              document.removeEventListener('keydown', handleEscButton);
            }}
          >
          </div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/img/content/${urlImg}`} width="67" height="137" alt={name} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{getGuitarTypeRus(type)}, {stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">
                    <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
                  </span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--red button--big modal__button modal__button--add"
                onClick={handleAddToCartBtnClick}
              >Добавить в корзину
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={() => {
                handleModalAddCartCloseBtn(false);
                document.body.style.overflow ='auto';
                document.removeEventListener('keydown', handleEscButton);
              }}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
      <ModalSuccessAddCart
        isActive={isModalSuccessAddCart}
        handleModalSuccessAddCartCloseBtn={setIsModalSuccessAddCart}
        handleEscModalSuccessAddButton={handleEscModalSuccessAddButton}
        isMainScreen={isMainScreen}
      />
    </>
  );
}

export default ModalAddCart;
