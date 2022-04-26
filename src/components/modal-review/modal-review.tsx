/* eslint-disable no-console */
import { useSelector, useDispatch } from 'react-redux';
import { getGuitar } from '../../store/guitars-reducer/selectors';
import { useEffect, useRef, useState } from 'react';
import { uploadReview } from '../../store/api-action';
import { useParams } from 'react-router-dom';

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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
    document.addEventListener('keydown', (evt: KeyboardEvent) => {
      if (evt.key === 'Tab') {
        if (document.activeElement === buttonRef.current) {
          nameRef.current?.focus();
          evt.preventDefault();
        }
      }
    });
  });


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
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  required
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
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично" tabIndex={0}></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо" tabIndex={0}></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально" tabIndex={0}></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо" tabIndex={0}></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно" tabIndex={0}></label>
                  <span className="rate__count"></span>
                  <span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="pros">Достоинства</label>
            <input
              className="form-review__input"
              id="pros" type="text"
              autoComplete="off"
              required
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
              required
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
              required
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
              onClick={() => {
                if (
                  nameRef.current?.validity.valid
                  && ratingRef.current?.validity.valid
                  && advantageRef.current?.validity.valid
                  && disadvantageRef.current?.validity.valid
                  && commentRef.current?.validity.valid
                ) {
                  handleModalReviewCloseBtn(false);
                  handleModalSuccessCloseBtn(true);
                  dispatch(uploadReview(review, id));
                }
              }}
              data-testid="button-send-review"
              ref={buttonRef}
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
          >
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalReview;
