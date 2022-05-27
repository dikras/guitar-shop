/* eslint-disable no-console */
import NumberFormat from 'react-number-format';
import { Guitar } from '../../types/guitar';
import { ImageSize, IMG_URL_BEGIN_INDEX, Rating, AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import ModalSuccessAddCart from '../modal-success-add-cart/modal-success-add-cart';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getGuitarsInCartIDs } from '../../store/cart-reducer/selectors';

type GuitarCardProps = {
  guitar: Guitar;
  isMainScreen: boolean;
};

function GuitarCard(props: GuitarCardProps): JSX.Element {
  const { guitar, isMainScreen } = props;
  const { previewImg, name, price, comments, id, rating } = guitar;
  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);

  const guitarsInCartIDs = useSelector(getGuitarsInCartIDs);

  const isGuitarInCart = guitarsInCartIDs.includes(guitar.id);

  const roundedRating = Math.round(rating);

  const [ isModalAddCart, setIsModalAddCart ] = useState(false);
  const [ isModalSuccessAddCart, setIsModalSuccessAddCart ] = useState(false);

  const handleModalAddEsc = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalAddCart(false);
    }
  };

  const handleAddToCartClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsModalAddCart(true);
  };

  useEffect(() => {
    if(isModalAddCart){
      window.addEventListener('keydown', handleModalAddEsc);
      document.body.style.overflow ='hidden';
      return function () {
        window.removeEventListener('keydown', handleModalAddEsc);
        document.body.style.overflow ='auto';
      };
    }
  });

  return (
    <>
      <div className="product-card" data-testid="guitar-card">
        <img src={`/img/content/${urlImg}`} width={ImageSize.GuitarCard.Width} height={ImageSize.GuitarCard.Height} alt={name} />
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true">
            <span className="visually-hidden">Рейтинг:</span>
            <svg width="12" height="11" aria-hidden="true">
              <use
                xlinkHref={roundedRating >= Rating.One ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use
                xlinkHref={roundedRating >= Rating.Two ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use
                xlinkHref={roundedRating >= Rating.Three ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use
                xlinkHref={roundedRating >= Rating.Four ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use
                xlinkHref={roundedRating >= Rating.Five ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
            <span className="rate__count">{comments?.length}</span>
            <span className="rate__message" />
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>
            <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <Link
            to={`${id}`}
            className="button button--mini"
            data-testid="button-details"
          >
            Подробнее
          </Link>
          {isGuitarInCart ?
            <Link
              to={AppRoute.Cart}
              className="button button--red-border button--mini button--in-cart"
            >В корзине
            </Link> :
            <a
              className="button button--red button--mini button--add-to-cart"
              href="/#"
              onClick={handleAddToCartClick}
            >Купить
            </a>}
        </div>
      </div>
      {isModalAddCart &&
      <ModalAddCart
        guitar={guitar}
        handleModalAdd={setIsModalAddCart}
        handleModalSuccessAdd={setIsModalSuccessAddCart}
      />}
      {isModalSuccessAddCart &&
      <ModalSuccessAddCart
        isMainScreen={isMainScreen}
        handleModalSuccessAdd={setIsModalSuccessAddCart}
        isModalSuccessOpened={isModalSuccessAddCart}
      />}
    </>
  );
}

export default GuitarCard;
