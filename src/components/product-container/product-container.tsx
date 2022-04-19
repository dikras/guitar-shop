import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGuitar, getIsGuitarError } from '../../store/guitars-reducer/selectors';
import { fetchGuitar } from '../../store/api-action';
import { FULL_STARS_COUNT, IMG_URL_BEGIN_INDEX, NUMBER_TO_ROUND, ImageSize } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import NumberFormat from 'react-number-format';
import { nanoid } from 'nanoid';

function ProductContainer(): JSX.Element {
  const guitar = useSelector(getGuitar);
  const isGuitarError = useSelector(getIsGuitarError);
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const ratingStars: number[] = [];
  for (let i = 1; i <= FULL_STARS_COUNT; i++) {
    ratingStars.push(i);
  }

  useEffect(() => {
    dispatch(fetchGuitar(id));
  }, [dispatch, id]);

  const renderGuitar = () => {

    if (guitar) {
      const {
        name,
        vendorCode,
        description,
        previewImg,
        stringCount,
        price,
      } = guitar;

      const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);

      return (
        <div className="product-container">
          <img className="product-container__img" src={`/img/content/${urlImg}`} width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
            <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              {ratingStars.map(() => (
                <svg key={nanoid(NUMBER_TO_ROUND)} width={ImageSize.RatingStarProductCard.Width} height={ImageSize.RatingStarProductCard.Height} aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
              ))}
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count"></span><span className="rate__message"></span>
            </div>
            <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">Электрогитара</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringCount} струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description hidden">{description}</p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">
              <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ₽
            </p>
            <a className="button button--red button--big product-container__button" href="/#">Добавить в корзину</a>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {isGuitarError ?
        <NotFoundScreen /> :
        renderGuitar()}
    </div>
  );
}

export default ProductContainer;
