/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { GuitarType, StringCount, FilterQueryParam } from '../../const';
import { addFilterAction, changeGuitarType, changeStringCount, removeFilterAction } from '../../store/action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const [ isAcousticChecked, setIsAcousticChecked ] = useState(false);
  const [ isElectricChecked, setIsElectricChecked ] = useState(false);
  const [ isUkuleleChecked, setIsUkuleleChecked ] = useState(false);

  const [ isFourStringsChecked, setIsFourStringsChecked ] = useState(false);
  const [ isSixStringsChecked, setIsSixStringsChecked ] = useState(false);
  const [ isSevenStringsChecked, setIsSevenStringsChecked ] = useState(false);
  const [ isTwelveStringsChecked, setIsTwelveStringsChecked ] = useState(false);

  const guitarMinPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(useSelector(getGuitarMinPrice));
  const guitarMaxPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(useSelector(getGuitarMaxPrice));

  const priceMinRef = useRef(null);
  const priceMaxRef = useRef(null);

  // const [ isDisabled, setIsDisabled ] = useState(false);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={`${guitarMinPrice}`}
              id="priceMin"
              name="от"
              ref={priceMinRef}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={`${guitarMaxPrice}`}
              id="priceMax"
              name="до"
              ref={priceMaxRef}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={() => {
              setIsAcousticChecked(!isAcousticChecked);
              if (!isAcousticChecked) {
                dispatch(changeGuitarType(GuitarType.Acoustic));
                dispatch(addFilterAction(FilterQueryParam.Acoustic));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.Acoustic));
              }
            }}
            checked={isAcousticChecked}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={() => {
              setIsElectricChecked(!isElectricChecked);
              if (!isElectricChecked) {
                dispatch(changeGuitarType(GuitarType.Electric));
                dispatch(addFilterAction(FilterQueryParam.Electric));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.Electric));
              }
            }}
            checked={isElectricChecked}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={() => {
              setIsUkuleleChecked(!isUkuleleChecked);
              if (!isUkuleleChecked) {
                dispatch(changeGuitarType(GuitarType.Ukulele));
                dispatch(addFilterAction(FilterQueryParam.Ukulele));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.Ukulele));
              }
            }}
            checked={isUkuleleChecked}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onChange={() => {
              setIsFourStringsChecked(!isFourStringsChecked);
              if (!isFourStringsChecked) {
                dispatch(changeStringCount(StringCount.FourString));
                dispatch(addFilterAction(FilterQueryParam.FourString));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.FourString));
              }
            }}
            checked={isFourStringsChecked}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={() => {
              setIsSixStringsChecked(!isSixStringsChecked);
              if (!isSixStringsChecked) {
                dispatch(changeStringCount(StringCount.SixString));
                dispatch(addFilterAction(FilterQueryParam.SixString));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.SixString));
              }
            }}
            checked={isSixStringsChecked}
            // disabled={isDisabled}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={() => {
              setIsSevenStringsChecked(!isSevenStringsChecked);
              if (!isSevenStringsChecked) {
                dispatch(changeStringCount(StringCount.SevenString));
                dispatch(addFilterAction(FilterQueryParam.SevenString));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.SevenString));
              }
            }}
            checked={isSevenStringsChecked}
            // disabled={isDisabled}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onChange={() => {
              setIsTwelveStringsChecked(!isTwelveStringsChecked);
              if (!isTwelveStringsChecked) {
                dispatch(changeStringCount(StringCount.TwelveString));
                dispatch(addFilterAction(FilterQueryParam.TwelveString));
              } else {
                dispatch(removeFilterAction(FilterQueryParam.TwelveString));
              }
            }}
            checked={isTwelveStringsChecked}
            // disabled={isDisabled}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
