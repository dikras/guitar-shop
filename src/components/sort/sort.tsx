/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentPage } from '../../store/pagination-reducer/selectors';
import { loadSortedGuitars } from '../../store/api-action';

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const currentPage = useSelector(getCurrentPage);

  const params = new URLSearchParams(location.search);

  const [ isSortByPrice, setIsSortByPrice ] = useState(params.get('_sort') === 'price');
  const [ isSortByRating, setIsSortByRating ] = useState(params.get('_sort') === 'rating');
  const [ isSortLowToHigh, setIsLowToHigh ] = useState(params.get('_order') === 'asc');
  const [ isSortHighToLow, setIsSortHighToLow ] = useState(params.get('_order') === 'desc');

  useEffect(() => {
    if (isSortByPrice) {
      params.set('_sort', 'price');
    }
    if (isSortByRating) {
      params.set('_sort', 'rating');
    }
    if (isSortLowToHigh) {
      params.set('_order', 'asc');
    }
    if (isSortHighToLow) {
      params.set('_order', 'desc');
    }
    if (isSortLowToHigh || isSortHighToLow) {
      dispatch(loadSortedGuitars(params.toString()));
    }

    history.push({
      pathname: `page_${currentPage}`,
      search: params.toString(),
    });
  }, [
    dispatch,
    history,
    currentPage,
    isSortByPrice,
    isSortByRating,
    isSortLowToHigh,
    isSortHighToLow,
  ]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${isSortByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => {
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
            if (!isSortLowToHigh && !isSortHighToLow) {
              setIsSortByPrice(true);
            }
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
            if (!isSortLowToHigh && !isSortHighToLow) {
              setIsSortByPrice(true);
            }
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
