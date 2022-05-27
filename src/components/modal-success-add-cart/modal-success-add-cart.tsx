import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type ModalSuccessAddCartProps = {
  isMainScreen: boolean;
  // handleModalSuccessAddCartCloseBtn: (opened: boolean) => void;
  // handleEscModalSuccessAddButton: (e: KeyboardEvent) => void;
  handleModalSuccessAdd: (opened: boolean) => void;
  isModalSuccessOpened: boolean;
}

function ModalSuccessAddCart(props: ModalSuccessAddCartProps): JSX.Element {
  const {
    // handleModalSuccessAddCartCloseBtn,
    // handleEscModalSuccessAddButton,
    handleModalSuccessAdd,
    isModalSuccessOpened,
    isMainScreen,
  } = props;

  const [ isOverButtonToCart, setIsOverButtonToCart ] = useState(true);
  const [ isOverButtonToCatalog, setIsOverButtonToCatalog ] = useState(false);

  const handleButtonToCart = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (isOverButtonToCart) {
      setIsOverButtonToCart(true);
    }
    if (isOverButtonToCatalog) {
      setIsOverButtonToCatalog(false);
    }
  };

  const handleButtonToCatalog = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (isOverButtonToCart) {
      setIsOverButtonToCart(false);
    }
    if (isOverButtonToCatalog) {
      setIsOverButtonToCatalog(true);
    }
  };

  const handleModalAddSuccessEsc = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      handleModalSuccessAdd(false);
    }
  };

  const handleModalAddSuccessClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    handleModalSuccessAdd(false);
  };

  useEffect(() => {
    if(isModalSuccessOpened){
      window.addEventListener('keydown', handleModalAddSuccessEsc);
      document.body.style.overflow ='hidden';
      return function () {
        window.removeEventListener('keydown', handleModalAddSuccessEsc);
        document.body.style.overflow ='auto';
      };
    }
  });

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleModalAddSuccessClose}
        >
        </div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <Link
              to={AppRoute.Cart}
              className={`button button--small modal__button ${isOverButtonToCart ? '' : 'button--black-border'}`}
              onClick={() => {
                document.body.style.overflow ='auto';
              }}
              onMouseOver={handleButtonToCart}
              data-testid="button-go-to-cart"
            >Перейти в корзину
            </Link>
            {isMainScreen ?
              <button
                className={`button button--small modal__button modal__button--right ${isOverButtonToCart ? '' : 'button--black-border'}`}
                onClick={handleModalAddSuccessClose}
                onMouseOver={handleButtonToCatalog}
              >Продолжить покупки
              </button> :
              <Link to={AppRoute.Main}
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={() => {
                  document.body.style.overflow ='auto';
                }}
              >Продолжить покупки
              </Link>}
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleModalAddSuccessClose}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessAddCart;
