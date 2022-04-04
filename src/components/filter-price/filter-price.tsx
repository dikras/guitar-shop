import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { APIRoute, FilterQueryParam, ENTER_KEY, PaginationNumber, InitialPrice } from '../../const';
import {
  addFilterAction,
  removeFilterAction,
  setStartPrice,
  setEndPrice
} from '../../store/action';
import { loadFilteredGuitars } from '../../store/api-action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';
import {
  getCurrentSortFilterURL,
  getCurrentStartPrice,
  getCurrentEndPricer
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';

function FilterPrice(): JSX.Element {
  const currentSortFilterURL = useSelector(getCurrentSortFilterURL);
  const currentStartNumber = useSelector(getCurrentStartNumber);
  const currentStartPrice = useSelector(getCurrentStartPrice);
  const currentEndPrice = useSelector(getCurrentEndPricer);

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);

  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${currentSortFilterURL}`;
  const urlFilterWithComments = `${APIRoute.Guitars}${currentSortFilterURL}&_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  const dispatch = useDispatch();

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const handleMinInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const currentStartValue = evt.target.value;
    if (Number(currentStartValue) >= 0) {
      setMinPrice(currentStartValue);
    }
    if (minPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}`));
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
      if (Number(minPrice) < guitarMinPrice || Number(minPrice) > guitarMaxPrice) {
        setMinPrice(minFormatPrice.toString());
      } else {
        dispatch(setStartPrice(Number(minPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}&`));
      }
    }
    if (minPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}&`));
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
      if (Number(maxPrice) > guitarMaxPrice) {
        setMaxPrice(maxFormatPrice.toString());
      } else {
        dispatch(setEndPrice(Number(maxPrice)));
        dispatch(addFilterAction(`${FilterQueryParam.FilterEndPrice}${maxPrice}`));
      }
    }
  };

  const handleMaxInputBlur = () => {
    if (maxPrice) {
      if (Number(maxPrice) > guitarMaxPrice || Number(maxPrice) < guitarMinPrice) {
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

  useEffect(() => {
    if (currentStartPrice !== InitialPrice.Min) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
    if (currentEndPrice !== InitialPrice.Max) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
    if (minPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterStartPrice}${minPrice}`));
    }
    if (maxPrice === '') {
      dispatch(removeFilterAction(`${FilterQueryParam.FilterEndPrice}${maxPrice}`));
    }
  }, [
    dispatch,
    urlFilterNoComments,
    urlFilterWithComments,
    currentStartPrice,
    currentEndPrice,
    minPrice,
    maxPrice,
  ]);

  return (
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
  );
}

export default FilterPrice;
