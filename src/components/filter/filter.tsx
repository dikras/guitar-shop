/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ENTER_KEY, SortingOrder, SortingType, PaginationNumber } from '../../const';
import { loadFilteredGuitars } from '../../store/api-action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';
import { getCurrentStartNumber, getCurrentPage } from '../../store/pagination-reducer/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);
  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentStartNumber = useSelector(getCurrentStartNumber);
  const currentPage = useSelector(getCurrentPage);

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const [minPriceParam, setMinPriceParam] = useState('');
  const [maxPriceParam, setMaxPriceParam] = useState('');

  const priceParam = `${minPriceParam}${maxPriceParam}`;

  let sortParam = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    sortParam = `${currentSortingType ? '&' : ''}_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  // _start=${currentStartNumber}&_limit=${PaginationNumber.Limit}

  const filter = `_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}${priceParam ? '&' :
    ''}${priceParam}${sortParam}`;
  console.log(filter);

  const params = new URLSearchParams(location.search);

  const [ isAcousticClicked, setIsAcousticClicked ] = useState(params.getAll('type').includes('acoustic'));
  const [ isElectricClicked, setIsElectricClicked ] = useState(params.getAll('type').includes('electric'));
  const [ isUkuleleClicked, setIsUkuleleClicked ] = useState(params.getAll('type').includes('ukulele'));

  const [ isFourStringsClicked, setIsFourStringsClicked ] = useState(params.getAll('stringCount').includes('4'));
  const [ isSixStringsClicked, setIsSixStringsClicked ] = useState(params.getAll('stringCount').includes('6'));
  const [ isSevenStringsClicked, setIsSevenStringsClicked ] = useState(params.getAll('stringCount').includes('7'));
  const [ isTwelveStringsClicked, setIsTwelveStringsClicked ] = useState(params.getAll('stringCount').includes('12'));

  useEffect(() => {
    params.delete('type');
    params.delete('stringCount');
    params.delete('price_gte');

    if (isAcousticClicked) {
      params.append('type', 'acoustic');
    }
    if (isElectricClicked) {
      params.append('type', 'electric');
    }
    if (isUkuleleClicked) {
      params.append('type', 'ukulele');
    }

    if (isFourStringsClicked) {
      params.append('stringCount', '4');
    }
    if (isSixStringsClicked) {
      params.append('stringCount', '6');
    }
    if (isSevenStringsClicked) {
      params.append('stringCount', '7');
    }
    if (isTwelveStringsClicked) {
      params.append('stringCount', '12');
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
    isAcousticClicked,
    isElectricClicked,
    isUkuleleClicked,
    isFourStringsClicked,
    isSixStringsClicked,
    isSevenStringsClicked,
    isTwelveStringsClicked,
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
                  setMinPriceParam('');
                }
              }}
              onBlur={(evt) => {
                const currentStartPrice = evt.target.value;
                if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                  setMinPrice(minFormatPrice.toString());
                } else {
                  setMinPrice(currentStartPrice);
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
