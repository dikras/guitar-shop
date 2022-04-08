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
          className={`catalog-sort__type-button ${sortType === 'price' ? 'catalog-sort__type-button--active' : ''}`}
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
          className={`catalog-sort__type-button ${sortType === 'rating' ? 'catalog-sort__type-button--active' : ''}`}
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
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortOrder === 'asc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            setSortOrder('asc');
            if (!sortType) {
              setSortType('price');
            }
          }}
          data-testid="sort-button-asc"
          style={sortOrder === 'asc' ? {borderBottomColor: '#131212'} : {borderBottomColor: '#a49e9e'}}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortOrder === 'desc' ? 'catalog-sort__order-button--active' : ''}`}
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
