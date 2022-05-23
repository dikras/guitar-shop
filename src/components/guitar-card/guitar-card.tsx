import NumberFormat from 'react-number-format';
import { Guitar } from '../../types/guitar';
import { ImageSize, IMG_URL_BEGIN_INDEX, NUMBER_TO_ROUND, STARS_COUNT, AppRoute } from '../../const';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import { useState } from 'react';
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

  const ratingToStar = Math.floor(rating);

  const iconFullStars: number[] = [];
  for (let i = 1; i <= ratingToStar; i++) {
    iconFullStars.push(i);
  }

  const iconStars: number[] = [];
  for (let i = 1; i <= STARS_COUNT - ratingToStar; i++) {
    iconStars.push(i);
  }

  const [ isModalAddCart, setIsModalAddCart ] = useState(false);

  const handleEscButton = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalAddCart(false);
      document.removeEventListener('keydown', handleEscButton);
      document.body.style.overflow ='auto';
    }
  };

  const handleAddToCartClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsModalAddCart(true);
    document.body.style.overflow ='hidden';
    document.addEventListener('keydown', handleEscButton);
  };

  return (
    <>
      <div className="product-card" data-testid="guitar-card">
        <img src={`/img/content/${urlImg}`} width={ImageSize.GuitarCard.Width} height={ImageSize.GuitarCard.Height} alt={name} />
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
            {iconFullStars.map(() => (
              <svg key={nanoid(NUMBER_TO_ROUND)} width={ImageSize.RatingStar.Width} height={ImageSize.RatingStar.Height} aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
            ))}
            {iconStars.map(() => (
              <svg key={nanoid(NUMBER_TO_ROUND)} width={ImageSize.RatingStar.Width} height={ImageSize.RatingStar.Height} aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
            ))}
            <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
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
      <ModalAddCart
        isActive={isModalAddCart}
        handleModalAddCartCloseBtn={setIsModalAddCart}
        handleEscButton={handleEscButton}
        guitar={guitar}
        isMainScreen={isMainScreen}
      />
    </>
  );
}

export default GuitarCard;
