/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { GuitarType, StringCount, FilterQueryParam, ENTER_KEY } from '../../const';
import {
  addFilterAction,
  changeGuitarType,
  changeStringCount,
  removeFilterAction,
  setStartPrice,
  setEndPrice
} from '../../store/action';
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

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const handleMinInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const currentStartValue = evt.target.value;
    if (Number(currentStartValue) >= 0) {
      setMinPrice(currentStartValue);
    }
  };

  const handleMaxInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const currentEndValue = evt.target.value;
    if (Number(currentEndValue) >= 0) {
      setMaxPrice(evt.target.value);
    }
  };

  const handleMinInputBlur = () => {
    if (minPrice) {
      if (Number(minPrice) < guitarMinPrice) {
        setMinPrice(minFormatPrice.toString());
      } else {
        dispatch(setStartPrice(Number(minPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}`));
      }
    }
    if (minPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}`));
    }
  };

  const handleMinKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === ENTER_KEY && minPrice) {
      if (Number(minPrice) < guitarMinPrice) {
        setMinPrice(minFormatPrice.toString());
      } else {
        dispatch(setStartPrice(Number(minPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}`));
      }
    }
  };

  const handleMaxKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === ENTER_KEY && maxPrice) {
      if (Number(minPrice) > guitarMinPrice) {
        setMaxPrice(maxFormatPrice.toString());
      } else {
        dispatch(setEndPrice(Number(maxPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterEndPrice}${maxPrice}`));
      }
    }
  };

  const handleMaxInputBlur = () => {
    if (maxPrice) {
      if (Number(maxPrice) > guitarMaxPrice) {
        setMaxPrice(maxFormatPrice.toString());
      } else {
        dispatch(setEndPrice(Number(maxPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterEndPrice}${maxPrice}`));
      }
    }
    if (maxPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterEndPrice}${maxPrice}`));
    }
  };

  return (
    <form
      className="catalog-filter"
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={`${minFormatPrice}`}
              id="priceMin"
              name="от"
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              onKeyDown={handleMinKeyDown}
              value={minPrice}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={`${maxFormatPrice}`}
              id="priceMax"
              name="до"
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              onKeyDown={handleMaxKeyDown}
              value={maxPrice}
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
            disabled={isAcousticChecked && !isUkuleleChecked && !isElectricChecked}
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
            disabled={isUkuleleChecked && !isElectricChecked && !isAcousticChecked}
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
            disabled={isUkuleleChecked && !isElectricChecked && !isAcousticChecked}
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
            disabled={(isUkuleleChecked || isElectricChecked) && !isAcousticChecked}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
