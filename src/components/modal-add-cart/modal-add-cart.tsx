import NumberFormat from 'react-number-format';
import { GuitarNoComments } from '../../types/guitar';
import { IMG_URL_BEGIN_INDEX } from '../../const';
import { addGuitarToCart, addGuitarToCount } from '../../store/action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getGuitarTypeRus } from '../../utils';
import { nanoid } from 'nanoid';

type ModalAddCartProps = {
  guitar: GuitarNoComments;
  handleModalSuccessAdd: (opened: boolean) => void;
  handleModalAdd: (opened: boolean) => void;
}

function ModalAddCart(props: ModalAddCartProps): JSX.Element {
  const { handleModalSuccessAdd, handleModalAdd, guitar } = props;
  const { name, previewImg, vendorCode, stringCount, price, type } = guitar;
  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);

  const dispatch = useDispatch();

  const uniqID = nanoid();
  const guitarToCount = {
    uniqID: uniqID,
    price,
    quantity: 1,
  };

  const handleAddToCartBtnClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    const guitarToCart = {...guitar, uniqID: uniqID};
    dispatch(addGuitarToCart(guitarToCart));
    dispatch(addGuitarToCount(guitarToCount));
    handleModalSuccessAdd(true);
    handleModalAdd(false);
  };

  const handleModalAddCartClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    handleModalAdd(false);
  };


  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleModalAddCartClose}
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
              data-testid="button-add-to-cart"
            >Добавить в корзину
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleModalAddCartClose}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCart;
