import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSortedCommentsByDate } from '../../store/comments-reducer/selectors';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Rating, REVIEWS_PER_STEP } from '../../const';
import { Comment } from '../../types/comment';
import ModalReview from '../modal-review/modal-review';
import ModalSuccess from '../modal-success/modal-success';

dayjs.locale('ru');

function Reviews(): JSX.Element {
  const reviews = useSelector(getSortedCommentsByDate);
  const reviewsCount = reviews.length;
  const [ reviewsCountToRender, setReviewsCountToRender ] = useState(REVIEWS_PER_STEP);
  const renderedReviews = reviews.slice(0, Math.min(reviewsCount, reviewsCountToRender));
  const isReviews = reviewsCount !== 0;
  const isMoreButton = reviewsCount > renderedReviews.length;

  const [ isModalReviewOpened, setIsModalReviewOpened ] = useState(false);
  const [ isModalSuccessOpened, setIsModalSuccessOpened ] = useState(false);

  const handleMoreButtonClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setReviewsCountToRender((prev) => prev + REVIEWS_PER_STEP);
  };

  const handleEscButton = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      setIsModalReviewOpened(false);
      setIsModalSuccessOpened(false);
      document.removeEventListener('keydown', handleEscButton);
      document.body.style.overflow ='auto';
    }
  };

  const onSubmitReviewButtonClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsModalReviewOpened(true);
    document.body.style.overflow ='hidden';
    document.addEventListener('keydown', handleEscButton);
  };

  const renderReviews = (reviewsArr: Comment[]) => (
    reviewsArr.map(({userName, advantage, disadvantage, comment, rating, createAt}) => {
      const roundedRating = Math.round(rating);
      return (
        <div key={nanoid()} className="review">
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
            <span className="review__date">{dayjs(createAt).format('D MMMM')}</span>
          </div>
          <div className="rate review__rating-panel" aria-hidden="true">
            <span className="visually-hidden">??????????????:</span>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref={roundedRating >= Rating.One ? '#icon-full-star' : '#icon-star'} />
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref={roundedRating >= Rating.Two ? '#icon-full-star' : '#icon-star'} />
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref={roundedRating >= Rating.Three ? '#icon-full-star' : '#icon-star'} />
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref={roundedRating >= Rating.Four ? '#icon-full-star' : '#icon-star'} />
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref={roundedRating >= Rating.Five ? '#icon-full-star' : '#icon-star'} />
            </svg>
            <span className="rate__count"></span>
            <span className="rate__message"></span>
          </div>
          <h4 className="review__title title title--lesser">??????????????????????:</h4>
          <p className="review__value">{advantage}</p>
          <h4 className="review__title title title--lesser">????????????????????:</h4>
          <p className="review__value">{disadvantage}</p>
          <h4 className="review__title title title--lesser">??????????????????????:</h4>
          <p className="review__value">{comment}</p>
        </div>
      );
    })
  );

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger" data-testid="reviews-title">????????????</h3>
      <a className="button button--red-border button--big reviews__submit-button" href="/#" onClick={onSubmitReviewButtonClick}>???????????????? ??????????</a>
      {isReviews ? renderReviews(renderedReviews) : <p>???? ?????????????? ???????????? ???????? ?????? ??????????????</p>}
      {isMoreButton &&
        <button
          className="button button--medium reviews__more-button"
          onClick={handleMoreButtonClick}
          data-testid="show-more-reviews-button"
        >???????????????? ?????? ????????????
        </button>}
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header" style={{zIndex: 10}}>????????????</a>
      {isModalReviewOpened && <ModalReview handleModalReviewCloseBtn={setIsModalReviewOpened} handleModalSuccessCloseBtn={setIsModalSuccessOpened} />}
      {isModalSuccessOpened && <ModalSuccess handleModalSuccessCloseBtn={setIsModalSuccessOpened} />}
    </section>
  );
}

export default Reviews;
