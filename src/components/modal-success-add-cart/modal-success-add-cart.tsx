import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type ModalSuccessAddCartProps = {
  isActive: boolean;
  isMainScreen: boolean;
  handleModalSuccessAddCartCloseBtn: (opened: boolean) => void;
  handleEscModalSuccessAddButton: (e: KeyboardEvent) => void;
}

function ModalSuccessAddCart(props: ModalSuccessAddCartProps): JSX.Element {
  const { isActive, handleModalSuccessAddCartCloseBtn, handleEscModalSuccessAddButton, isMainScreen } = props;

  return (
    <div className={`modal ${isActive ? 'is-active' : ''} modal--success`}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={() => {
            handleModalSuccessAddCartCloseBtn(false);
            document.body.style.overflow ='auto';
            document.removeEventListener('keydown', handleEscModalSuccessAddButton);
          }}
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
              className="button button--small modal__button"
              onClick={() => {
                document.body.style.overflow ='auto';
              }}
            >Перейти в корзину
            </Link>
            {isMainScreen ?
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={() => {
                  handleModalSuccessAddCartCloseBtn(false);
                  document.body.style.overflow ='auto';
                  document.removeEventListener('keydown', handleEscModalSuccessAddButton);
                }}
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
            onClick={() => {
              handleModalSuccessAddCartCloseBtn(false);
              document.body.style.overflow ='auto';
              document.removeEventListener('keydown', handleEscModalSuccessAddButton);
            }}
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
