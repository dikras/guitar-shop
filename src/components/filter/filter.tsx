/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ENTER_KEY, PaginationNumber, QueryParam, GuitarType, StringNumber } from '../../const';
import { loadFilteredGuitars } from '../../store/api-action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';
import { getCurrentPage, getCurrentStartNumber } from '../../store/pagination-reducer/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);
  const currentPage = useSelector(getCurrentPage);
  const currentStartNumber = useSelector(getCurrentStartNumber);

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const params = new URLSearchParams(location.search);

  const [ isAcousticClicked, setIsAcousticClicked ] = useState(params.getAll(QueryParam.Type).includes(GuitarType.Acoustic));
  const [ isElectricClicked, setIsElectricClicked ] = useState(params.getAll(QueryParam.Type).includes(GuitarType.Electric));
  const [ isUkuleleClicked, setIsUkuleleClicked ] = useState(params.getAll(QueryParam.Type).includes(GuitarType.Ukulele));

  const [ isFourStringsClicked, setIsFourStringsClicked ] = useState(params.getAll(QueryParam.StringCount).includes(StringNumber.FourString));
  const [ isSixStringsClicked, setIsSixStringsClicked ] = useState(params.getAll(QueryParam.StringCount).includes(StringNumber.SixString));
  const [ isSevenStringsClicked, setIsSevenStringsClicked ] = useState(params.getAll(QueryParam.StringCount).includes(StringNumber.SevenString));
  const [ isTwelveStringsClicked, setIsTwelveStringsClicked ] = useState(params.getAll(QueryParam.StringCount).includes(StringNumber.TwelveString));

  const [ isMinPriceEntered, setIsMinPriceEntered ] = useState(!!params.get(QueryParam.StartPrice));
  const [ isMaxPriceEntered, setIsMaxPriceEntered ] = useState(!!params.get(QueryParam.EndPrice));

  params.set(QueryParam.PaginationStart, `${currentStartNumber}`);
  params.set(QueryParam.PaginationLimit, `${PaginationNumber.Limit}`);

  useEffect(() => {
    params.delete(QueryParam.Type);
    params.delete(QueryParam.StringCount);
    params.delete(QueryParam.StartPrice);
    params.delete(QueryParam.EndPrice);

    params.set(QueryParam.PaginationStart, currentStartNumber.toString());
    params.set(QueryParam.PaginationLimit, PaginationNumber.Limit.toString());

    if (isAcousticClicked) {
      params.append(QueryParam.Type, GuitarType.Acoustic);
    }
    if (isElectricClicked) {
      params.append(QueryParam.Type, GuitarType.Electric);
    }
    if (isUkuleleClicked) {
      params.append(QueryParam.Type, GuitarType.Ukulele);
    }
    if (isFourStringsClicked) {
      params.append(QueryParam.StringCount, StringNumber.FourString);
    }
    if (isSixStringsClicked) {
      params.append(QueryParam.StringCount, StringNumber.SixString);
    }
    if (isSevenStringsClicked) {
      params.append(QueryParam.StringCount, StringNumber.SevenString);
    }
    if (isTwelveStringsClicked) {
      params.append(QueryParam.StringCount, StringNumber.TwelveString);
    }
    if (isMinPriceEntered) {
      params.append(QueryParam.StartPrice, minPrice);
    }
    if (isMaxPriceEntered) {
      params.append(QueryParam.EndPrice, maxPrice);
    }

    dispatch(loadFilteredGuitars(params.toString()));

    history.push({
      pathname: `page_${currentPage}`,
      search: params.toString(),
    });
  }, [
    dispatch,
    history,
    currentPage,
    minPrice,
    maxPrice,
    currentStartNumber,
    isAcousticClicked,
    isElectricClicked,
    isUkuleleClicked,
    isFourStringsClicked,
    isSixStringsClicked,
    isSevenStringsClicked,
    isTwelveStringsClicked,
    isMinPriceEntered,
    isMaxPriceEntered,
  ]);


  return (
    <form
      className="catalog-filter"
      data-testid="filter-form"
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range" data-testid="price-filter">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={`${minFormatPrice}`}
              id="priceMin"
              name="от"
              onChange={(evt) => {
                const currentStartValue = evt.target.value;
                if (Number(currentStartValue) >= 0) {
                  setMinPrice(currentStartValue);
                }
                if(!currentStartValue) {
                  setIsMinPriceEntered(false);
                }
              }}
              onBlur={(evt) => {
                const currentStartPrice = evt.target.value;
                if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                  setMinPrice(minFormatPrice.toString());
                } else {
                  setMinPrice(currentStartPrice);
                  setIsMinPriceEntered(true);
                }
              }}
              onKeyDown={(evt) => {
                const currentStartPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentStartPrice) {
                  if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                    setMinPrice(minFormatPrice.toString());
                  } else {
                    setIsMinPriceEntered(true);
                  }
                }
              }}
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
              onChange={(evt) => {
                const currentEndValue = evt.target.value;
                if (Number(currentEndValue) >= 0) {
                  setMaxPrice(currentEndValue);
                }
                if(!currentEndValue) {
                  setIsMaxPriceEntered(false);
                }
              }}
              onBlur={(evt) => {
                const currentEndPrice = evt.target.value;
                if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                  setMaxPrice(maxFormatPrice.toString());
                } else {
                  setMaxPrice(currentEndPrice);
                  setIsMaxPriceEntered(true);
                }
              }}
              onKeyDown={(evt) => {
                const currentEndPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentEndPrice) {
                  if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                    setMaxPrice(maxFormatPrice.toString());
                  } else {
                    setIsMaxPriceEntered(true);
                  }
                }
              }}
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
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsAcousticClicked(true);
              } else {
                setIsAcousticClicked(false);
              }
            }}
            disabled={isFourStringsClicked && !isSixStringsClicked && !isSevenStringsClicked && !isTwelveStringsClicked}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsElectricClicked(true);
              } else {
                setIsElectricClicked(false);
              }
            }}
            disabled={isTwelveStringsClicked && !isFourStringsClicked && !isSixStringsClicked && !isSevenStringsClicked}
            data-testid="checkbox-electric"
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsUkuleleClicked(true);
              } else {
                setIsUkuleleClicked(false);
              }
            }}
            disabled={(isSixStringsClicked || isSevenStringsClicked || isTwelveStringsClicked) && !isFourStringsClicked}
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
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsFourStringsClicked(true);
              } else {
                setIsFourStringsClicked(false);
              }
            }}
            disabled={isAcousticClicked && !isUkuleleClicked && !isElectricClicked}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsSixStringsClicked(true);
              } else {
                setIsSixStringsClicked(false);
              }
            }}
            disabled={isUkuleleClicked && !isElectricClicked && !isAcousticClicked}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsSevenStringsClicked(true);
              } else {
                setIsSevenStringsClicked(false);
              }
            }}
            disabled={isUkuleleClicked && !isElectricClicked && !isAcousticClicked}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onChange={(evt) => {
              if (evt.target.checked) {
                setIsTwelveStringsClicked(true);
              } else {
                setIsTwelveStringsClicked(false);
              }
            }}
            disabled={(isUkuleleClicked || isElectricClicked) && !isAcousticClicked}
            data-testid="checkbox-12-strings"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
