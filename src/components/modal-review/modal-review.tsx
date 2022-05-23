import { useSelector, useDispatch } from 'react-redux';
import { getGuitar } from '../../store/guitars-reducer/selectors';
import { useEffect, useRef, useState } from 'react';
import { uploadReview } from '../../store/api-action';
import { useParams } from 'react-router-dom';
import { RATING_STARS, NUMBER_TO_ROUND } from '../../const';
import { nanoid } from 'nanoid';

type ModalReviewProps = {
  handleModalReviewCloseBtn: (opened: boolean) => void;
  handleModalSuccessCloseBtn: (opened: boolean) => void;
}

function ModalReview(props: ModalReviewProps): JSX.Element {
  const { handleModalReviewCloseBtn, handleModalSuccessCloseBtn } = props;
  const guitar = useSelector(getGuitar);
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const ratingRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonSubmitRef = useRef<HTMLButtonElement | null>(null);
  const buttonCloseRef = useRef<HTMLButtonElement | null>(null);

  const { id } = useParams<{ id: string }>();

  const [ review, setReview ] = useState({
    guitarId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const getFocus = () => {
    const focusableElements = [
      nameRef.current,
      ratingRef.current,
      advantageRef.current,
      disadvantageRef.current,
      commentRef.current,
      buttonSubmitRef.current,
      buttonCloseRef.current,
    ];
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    document.addEventListener('keydown', (evt: KeyboardEvent) => {
      const isTabPressed = evt.key === 'Tab';

      if (!isTabPressed) {
        return;
      }

      if (evt.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          evt.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          evt.preventDefault();
        }
      }
    });
  };

  useEffect(() => {
    getFocus();
  });

  const [ isName, setIsName ] = useState(true);
  const [ isRating, setIsRating ] = useState(true);

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (
      review.userName
      && (review.rating !== 0)
      && review.advantage
      && review.disadvantage
      && review.comment
    ) {
      dispatch(uploadReview(review, id));
      handleModalReviewCloseBtn(false);
      handleModalSuccessCloseBtn(true);
    }
    if (!review.userName) {
      setIsName(false);
    } else {
      setIsName(true);
    }
    if (review.rating === 0) {
      setIsRating(false);
    } else {
      setIsRating(true);
    }
  };

  return (
    <div className="modal is-active modal--review" data-testid="review-modal">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={() => {
            handleModalReviewCloseBtn(false);
            document.body.style.overflow ='auto';
          }}
        >
        </div>
        <div className="modal__content" data-testid="modal-container">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar?.name}</h3>
          <form
            className="form-review"
            action="#"
            method="post"
            onSubmit={handleFormSubmit}
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  ref={nameRef}
                  onChange={({target}) => {
                    const value = target.value;
                    setReview({
                      ...review,
                      userName: value,
                    });
                  }}
                  data-testid="input-name"
                />
                <span className="form-review__warning" style={{height: '15px'}}>{isName ? '' : 'Заполните поле'}</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {RATING_STARS.map(({description, value, starId}) => (
                    <>
                      <input
                        className="visually-hidden"
                        key={nanoid(NUMBER_TO_ROUND)}
                        type="radio"
                        id={`${starId}`}
                        name="rate"
                        value={`${value}`}
                        onChange={({target}) => {
                          const valueStar = target.value;
                          setReview({
                            ...review,
                            rating: Number(valueStar),
                          });
                        }}
                        ref={ratingRef}
                      />
                      <label
                        className="rate__label"
                        key={nanoid(NUMBER_TO_ROUND)}
                        htmlFor={`${starId}`}
                        title={`${description}`}
                        tabIndex={0}
                      >
                      </label>
                    </>
                  ))}
                  <span className="rate__count"></span>
                  <span className="rate__message">{isRating ? '' : 'Поставьте оценку'}</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="pros">Достоинства</label>
            <input
              className="form-review__input"
              id="pros" type="text"
              autoComplete="off"
              ref={advantageRef}
              onChange={({target}) => {
                const value = target.value;
                setReview({
                  ...review,
                  advantage: value,
                });
              }}
              data-testid="input-pros"
            />
            <label className="form-review__label" htmlFor="contras">Недостатки</label>
            <input
              className="form-review__input"
              id="contras"
              type="text"
              autoComplete="off"
              ref={disadvantageRef}
              onChange={({target}) => {
                const value = target.value;
                setReview({
                  ...review,
                  disadvantage: value,
                });
              }}
            />
            <label className="form-review__label" htmlFor="comment-text">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment-text"
              rows={10}
              autoComplete="off"
              ref={commentRef}
              onChange={({target}) => {
                const value = target.value;
                setReview({
                  ...review,
                  comment: value,
                });
              }}
            >
            </textarea>
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
              data-testid="button-send-review"
              ref={buttonSubmitRef}
            >Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button" aria-label="Закрыть"
            onClick={(evt) => {
              evt.preventDefault();
              handleModalReviewCloseBtn(false);
              document.body.style.overflow ='auto';
            }}
            ref={buttonCloseRef}
          >
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalReview;
