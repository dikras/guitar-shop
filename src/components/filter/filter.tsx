import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ENTER_KEY, SortingOrder, SortingType, PaginationNumber } from '../../const';
import { loadFilteredGuitars } from '../../store/api-action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';
import { getCurrentStartNumber, getCurrentPage } from '../../store/pagination-reducer/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);
  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentStartNumber = useSelector(getCurrentStartNumber);
  const currentPage = useSelector(getCurrentPage);

  const [ isAcousticChecked, setIsAcousticChecked ] = useState(false);
  const [ isElectricChecked, setIsElectricChecked ] = useState(false);
  const [ isUkuleleChecked, setIsUkuleleChecked ] = useState(false);

  const [ isFourStringsChecked, setIsFourStringsChecked ] = useState(false);
  const [ isSixStringsChecked, setIsSixStringsChecked ] = useState(false);
  const [ isSevenStringsChecked, setIsSevenStringsChecked ] = useState(false);
  const [ isTwelveStringsChecked, setIsTwelveStringsChecked ] = useState(false);

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const [acousticParam, setAcousticParam] = useState('');
  const [electricParam, setElectricParam] = useState('');
  const [ukuleleParam, setUkuleleParam] = useState('');

  const [fourStringsParam, setFourStringsParam] = useState('');
  const [sixStringsParam, setSixStringsParam] = useState('');
  const [sevenStringsParam, setSevenStringsParam] = useState('');
  const [twelveStringsParam, setTwelveStringsParam] = useState('');

  const [minPriceParam, setMinPriceParam] = useState('');
  const [maxPriceParam, setMaxPriceParam] = useState('');

  const guitarTypeParam = `${acousticParam}${electricParam}${ukuleleParam}`;
  const stringCountParam = `${fourStringsParam}${sixStringsParam}${sevenStringsParam}${twelveStringsParam}`;
  const priceParam = `${minPriceParam}${maxPriceParam}`;

  let sortParam = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    sortParam = `${currentSortingType ? '&' : ''}_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  const filter = `_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}${guitarTypeParam ? '&' :
    ''}${guitarTypeParam}${stringCountParam ? '&' :
    ''}${stringCountParam}${priceParam ? '&' :
    ''}${priceParam}${sortParam}`;

  useEffect(() => {
    dispatch(loadFilteredGuitars(filter));
    history.push({
      pathname: `page_${currentPage}`,
      search: filter,
    });
  }, [dispatch, history, filter, currentPage]);

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
                  setMinPriceParam('');
                }
              }}
              onBlur={(evt) => {
                const currentStartPrice = evt.target.value;
                if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                  setMinPrice(minFormatPrice.toString());
                } else {
                  setMinPrice(currentStartPrice);
                  setMinPriceParam(`price_gte=${currentStartPrice}&`);
                }
                if(!currentStartPrice) {
                  setMinPriceParam('');
                }
              }}
              onKeyDown={(evt) => {
                const currentStartPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentStartPrice) {
                  if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                    setMinPrice(minFormatPrice.toString());
                  } else {
                    setMinPriceParam(`price_gte=${currentStartPrice}&`);
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
                  setMinPriceParam('');
                }
              }}
              onBlur={(evt) => {
                const currentEndPrice = evt.target.value;
                if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                  setMaxPrice(maxFormatPrice.toString());
                } else {
                  setMaxPrice(currentEndPrice);
                  setMaxPriceParam(`price_lte=${currentEndPrice}&`);
                }
                if(!currentEndPrice) {
                  setMaxPriceParam('');
                }
              }}
              onKeyDown={(evt) => {
                const currentEndPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentEndPrice) {
                  if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                    setMaxPrice(maxFormatPrice.toString());
                  } else {
                    setMaxPriceParam(`price_lte=${currentEndPrice}&`);
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
              setIsAcousticChecked(!isAcousticChecked);
              if (evt.target.checked) {
                setAcousticParam(`type=${evt.target.name}&`);
              } else {
                setAcousticParam('');
              }
            }}
            disabled={isFourStringsChecked && !isSixStringsChecked && !isSevenStringsChecked && !isTwelveStringsChecked}
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
              setIsElectricChecked(!isElectricChecked);
              if (evt.target.checked) {
                setElectricParam(`type=${evt.target.name}&`);
              } else {
                setElectricParam('');
              }
            }}
            disabled={isTwelveStringsChecked && !isFourStringsChecked && !isSixStringsChecked && !isSevenStringsChecked}
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
              setIsUkuleleChecked(!isUkuleleChecked);
              if (evt.target.checked) {
                setUkuleleParam(`type=${evt.target.name}&`);
              } else {
                setUkuleleParam('');
              }
            }}
            disabled={(isSixStringsChecked || isSevenStringsChecked || isTwelveStringsChecked) && !isFourStringsChecked}
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
              setIsFourStringsChecked(!isFourStringsChecked);
              if (evt.target.checked) {
                setFourStringsParam(`stringCount=${evt.target.name.slice(0, 1)}&`);
              } else {
                setFourStringsParam('');
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
            onChange={(evt) => {
              setIsSixStringsChecked(!isSixStringsChecked);
              if (evt.target.checked) {
                setSixStringsParam(`stringCount=${evt.target.name.slice(0, 1)}&`);
              } else {
                setSixStringsParam('');
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
            onChange={(evt) => {
              setIsSevenStringsChecked(!isSevenStringsChecked);
              if (evt.target.checked) {
                setSevenStringsParam(`stringCount=${evt.target.name.slice(0, 1)}&`);
              } else {
                setSevenStringsParam('');
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
            onChange={(evt) => {
              setIsTwelveStringsChecked(!isTwelveStringsChecked);
              if (evt.target.checked) {
                setTwelveStringsParam(`stringCount=${evt.target.name.slice(0, 2)}&`);
              } else {
                setTwelveStringsParam('');
              }
            }}
            disabled={(isUkuleleChecked || isElectricChecked) && !isAcousticChecked}
            data-testid="checkbox-12-strings"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
