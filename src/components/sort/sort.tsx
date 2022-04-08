import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';
import { SortingType, SortingOrder } from '../../const';
import { useLocation, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentPage } from '../../store/pagination-reducer/selectors';
import { loadSortedGuitars } from '../../store/api-action';

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const currentPage = useSelector(getCurrentPage);

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);

  const isSortTypeByPrice = currentSortingType === SortingType.ByPrice;
  const isSortTypeByRating = currentSortingType === SortingType.ByRating;

  const isSortOrderLowToHigh = currentSortingOrder === SortingOrder.LowToHigh;
  const isSortOrderHighToLow = currentSortingOrder === SortingOrder.HighToLow;

  const params = new URLSearchParams(location.search);

  const [sortOrder, setSortOrder] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    params.delete('_sort');
    params.delete('_order');

    if (sortType) {
      params.set('_sort', sortType);
    }

    if (sortOrder) {
      params.set('_order', sortOrder);
    }

    if (sortType || sortOrder) {
      dispatch(loadSortedGuitars(params.toString()));
    }

    history.push({
      pathname: `page_${currentPage}`,
      search: params.toString(),
    });
  }, [
    dispatch,
    history,
    sortOrder,
    sortType,
    currentPage,
  ]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${isSortTypeByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => {
            setSortType('price');
            if (!sortOrder) {
              setSortOrder('asc');
            }
          }}
          data-testid="sort-button-price"
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortTypeByRating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => {
            setSortType('rating');
            if (!sortOrder) {
              setSortOrder('asc');
            }
          }}
          data-testid="sort-button-rating"
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrderLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            setSortOrder('asc');
            if (!sortType) {
              setSortType('price');
            }
          }}
          data-testid="sort-button-asc"
          style={isSortOrderLowToHigh ? {borderBottomColor: '#131212'} : {borderBottomColor: '#a49e9e'}}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrderHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            setSortOrder('desc');
            if (!sortType) {
              setSortType('price');
            }
          }}
          data-testid="sort-button-desc"
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
