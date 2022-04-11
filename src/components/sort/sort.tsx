/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { getCurrentPage } from '../../store/pagination-reducer/selectors';
import { loadSortedGuitars } from '../../store/api-action';
import { QueryParam, SortingOrder, SortingType, PaginationNumber } from '../../const';
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const currentPage = useSelector(getCurrentPage);
  const currentStartNumber = useSelector(getCurrentStartNumber);

  const [ isSortByPrice, setIsSortByPrice ] = useState(false);
  const [ isSortByRating, setIsSortByRating ] = useState(false);
  const [ isSortLowToHigh, setIsLowToHigh ] = useState(false);
  const [ isSortHighToLow, setIsSortHighToLow ] = useState(false);

  useEffect(() => {
    const isByPrice = new URLSearchParams(location.search).get('_sort') === 'price';
    if (isSortLowToHigh || isSortHighToLow) {
      dispatch(loadSortedGuitars(isByPrice ? '_sort=price' : ''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleParamsChange = (paramType: string, paramName: string)=> {
    const paramsInner = new URLSearchParams(location.search);
    paramsInner.set(QueryParam.PaginationStart, `${currentStartNumber}`);
    paramsInner.set(QueryParam.PaginationLimit, `${PaginationNumber.Limit}`);
    if (!isSortLowToHigh && !isSortHighToLow && !isSortByRating) {
      paramsInner.set(QueryParam.SortingType, SortingType.ByPrice);
    }
    paramsInner.set(paramType, paramName);
    dispatch(loadSortedGuitars(paramsInner.toString()));
    history.push({
      pathname: `page_${currentPage}`,
      search: paramsInner.toString(),
    });

  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${isSortByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => {
            handleParamsChange(QueryParam.SortingType, SortingType.ByPrice);
            setIsSortByPrice(true);
            setIsSortByRating(false);
          }}
          data-testid="sort-button-price"
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortByRating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => {
            handleParamsChange(QueryParam.SortingType, SortingType.ByRating);
            setIsSortByRating(true);
            setIsSortByPrice(false);
          }}
          data-testid="sort-button-rating"
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            handleParamsChange(QueryParam.SortingOrder, SortingOrder.LowToHigh);
            setIsLowToHigh(true);
            setIsSortHighToLow(false);
          }}
          data-testid="sort-button-asc"
          style={isSortLowToHigh ? {borderBottomColor: '#131212'} : {borderBottomColor: '#a49e9e'}}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            handleParamsChange(QueryParam.SortingOrder, SortingOrder.HighToLow);
            setIsSortHighToLow(true);
            setIsLowToHigh(false);
          }}
          data-testid="sort-button-desc"
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
