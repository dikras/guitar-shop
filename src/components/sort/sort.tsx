import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';
import { changeSortingType, changeSortingOrder } from '../../store/action';
import { SortingType, SortingOrder } from '../../const';

function Sort(): JSX.Element {
  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);

  const isSortTypeByPrice = currentSortingType === SortingType.ByPrice;
  const isSortTypeByRating = currentSortingType === SortingType.ByRating;

  const isSortOrderLowToHigh = currentSortingOrder === SortingOrder.LowToHigh;
  const isSortOrderHighToLow = currentSortingOrder === SortingOrder.HighToLow;

  const dispatch = useDispatch();

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${isSortTypeByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => {
            dispatch(changeSortingType(SortingType.ByPrice));
          }}
          data-testid="sort-button-price"
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortTypeByRating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => {
            dispatch(changeSortingType(SortingType.ByRating));
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
            if (SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingOrder(SortingOrder.LowToHigh));
          }}
          data-testid="sort-button-asc"
          style={isSortOrderLowToHigh ? {borderBottomColor: '#131212'} : {borderBottomColor: '#a49e9e'}}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrderHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            if (SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingOrder(SortingOrder.HighToLow));
          }}
          data-testid="sort-button-desc"
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
