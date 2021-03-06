import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGuitar, getIsGuitarError } from '../../store/guitars-reducer/selectors';
import { fetchGuitar } from '../../store/api-action';
import {
  STARS_COUNT,
  IMG_URL_BEGIN_INDEX,
  ImageSize,
  INITIAL_TAB_HEIGHT
} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import NumberFormat from 'react-number-format';
import { nanoid } from 'nanoid';
import { fetchComments } from '../../store/api-action';
import { getCommentsTotalCount } from '../../store/comments-reducer/selectors';
import { getGuitarTypeRus } from '../../utils';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import ModalSuccessAddCart from '../modal-success-add-cart/modal-success-add-cart';
import LoadingScreen from '../loading-screen/loading-screen';
import { getIsGuitarLoading } from '../../store/guitars-reducer/selectors';

function ProductContainer(): JSX.Element {
  const guitar = useSelector(getGuitar);
  const commentsTotalCount = useSelector(getCommentsTotalCount);
  const isGuitarError = useSelector(getIsGuitarError);
  const isGuitarLoading = useSelector(getIsGuitarLoading);

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchGuitar(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const [ isCharacteristics, setIsCharacteristics ] = useState(true);
  const [ isDescription, setIsDescription ] = useState(false);
  const [ isOverCharacteristics, setIsOverCharacteristics ] = useState(true);
  const [ isOverDescription, setIsOverDescription ] = useState(false);

  const [ isProductModalAddCart, setIsProductModalAdd ] = useState(false);
  const [ isModalSuccessAddCart, setIsModalSuccessAddCart ] = useState(false);

  const handleCharacteristicsTab = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!isCharacteristics) {
      setIsCharacteristics(true);
    }
    if(isDescription) {
      setIsDescription(false);
    }
  };
  const handleDescriptionTab = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if(isCharacteristics) {
      setIsCharacteristics(false);
    }
    if (!isDescription) {
      setIsDescription(true);
    }
  };

  const handleCharacteristicsOver = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if(isOverCharacteristics) {
      setIsOverCharacteristics(true);
    }
    if (isOverDescription) {
      setIsOverDescription(false);
    }
  };
  const handleDescriptionOver = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if(isOverCharacteristics) {
      setIsOverCharacteristics(false);
    }
    if (isOverDescription) {
      setIsOverDescription(true);
    }
  };

  const handleCharacteristicsLeave = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if(isCharacteristics) {
      setIsOverCharacteristics(true);
    }
  };
  const handleDescriptionLeave = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if(isDescription) {
      setIsOverDescription(true);
    }
  };

  const handleProductEscButton = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsProductModalAdd(false);
      document.removeEventListener('keydown', handleProductEscButton);
      document.body.style.overflow ='auto';
    }
  };

  const handleProductAddToCartClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsProductModalAdd(true);
    document.body.style.overflow ='hidden';
    document.addEventListener('keydown', handleProductEscButton);
  };

  const renderGuitar = () => {
    if (isGuitarLoading) {
      return <LoadingScreen />;
    }

    if (guitar) {
      const {
        name,
        vendorCode,
        type,
        description,
        previewImg,
        stringCount,
        price,
        rating,
      } = guitar;

      const urlImg = previewImg.slice(IMG_URL_BEGIN_INDEX);
      const ratingToStar = Math.floor(rating);

      const iconFullStars: number[] = [];
      for (let i = 1; i <= ratingToStar; i++) {
        iconFullStars.push(i);
      }

      const iconStars: number[] = [];
      for (let i = 1; i <= STARS_COUNT - ratingToStar; i++) {
        iconStars.push(i);
      }

      return (
        <>
          <div className="product-container">
            <img className="product-container__img" src={`/img/content/${urlImg}`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden" data-testid="rating-stars">??????????????:</span>
                {iconFullStars.map(() => (
                  <svg key={nanoid()} width={ImageSize.RatingStarProductCard.Width} height={ImageSize.RatingStarProductCard.Height} aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                ))}
                {iconStars.map(() => (
                  <svg key={nanoid()} width={ImageSize.RatingStarProductCard.Width} height={ImageSize.RatingStarProductCard.Height} aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                ))}
                <span className="rate__count">{commentsTotalCount}</span>
                <span className="rate__message"></span>
              </div>
              <div className="tabs">
                <a
                  className={`button button--medium tabs__button ${isOverCharacteristics ? '' : 'button--black-border'}`}
                  href="#characteristics"
                  onClick={handleCharacteristicsTab}
                  onMouseOver={handleCharacteristicsOver}
                  onMouseLeave={handleCharacteristicsLeave}
                  style={{height: INITIAL_TAB_HEIGHT, borderWidth: 1}}
                  data-testid="tab-characteristics"
                >????????????????????????????
                </a>
                <a
                  className={`button button--medium tabs__button ${isOverDescription ? '' : 'button--black-border'}`}
                  href="#description"
                  onClick={handleDescriptionTab}
                  onMouseOver={handleDescriptionOver}
                  onMouseLeave={handleDescriptionLeave}
                  style={{height: INITIAL_TAB_HEIGHT, borderWidth: 1}}
                >????????????????
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className={`tabs__table ${isCharacteristics ? '' : 'hidden'}`}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">??????????????:</td>
                        <td className="tabs__value">{vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">??????:</td>
                        <td className="tabs__value">{getGuitarTypeRus(type)}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">???????????????????? ??????????:</td>
                        <td className="tabs__value">{stringCount} ????????????????</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={`tabs__product-description ${isDescription ? '' : 'hidden'}`}>{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">????????:</p>
              <p className="product-container__price-info product-container__price-info--value">
                <NumberFormat value={price} displayType="text" thousandSeparator=" " /> ???
              </p>
              <a
                className="button button--red button--big product-container__button"
                href="/#"
                onClick={handleProductAddToCartClick}
              >???????????????? ?? ??????????????
              </a>
            </div>
          </div>
          {isProductModalAddCart &&
          <ModalAddCart
            guitar={guitar}
            handleModalAdd={setIsProductModalAdd}
            handleModalSuccessAdd={setIsModalSuccessAddCart}
          />}
          {isModalSuccessAddCart &&
          <ModalSuccessAddCart
            isMainScreen={false}
            handleModalSuccessAdd={setIsModalSuccessAddCart}
            isModalSuccessOpened={isModalSuccessAddCart}
          />}
        </>
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
