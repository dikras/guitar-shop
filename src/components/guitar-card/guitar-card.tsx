import NumberFormat from 'react-number-format';
import { Guitar } from '../../types/guitar';
import { ImageSize, IMG_URL_BEGIN_INDEX, FULL_STARS_COUNT, NUMBER_TO_ROUND } from '../../const';
import { nanoid } from 'nanoid';

type GuitarProps = {
  guitar: Guitar;
};

function GuitarCard(props: GuitarProps): JSX.Element {
  const { guitar } = props;
  const { previewImg, name, price, comments } = guitar;
  const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);

  const ratingStars = [];
  for (let i = 1; i <= FULL_STARS_COUNT; i++) {
    ratingStars.push(i);
  }

  return (
    <div className="product-card" data-testid="guitar-card">
      <img src={`img/content/${urlImg}`} width={ImageSize.GuitarCard.Width} height={ImageSize.GuitarCard.Height} alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {ratingStars.map(() => (
            <svg key={nanoid(NUMBER_TO_ROUND)} width={ImageSize.RatingStar.Width} height={ImageSize.RatingStar.Height} aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ))}
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>
          <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="/#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
