import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/sort-reducer/selectors';
import { changeSortingType, changeSortingOrder } from '../../store/action';
import { SortingType, SortingOrder } from '../../const';

function Sort(): JSX.Element {
  const currentSortType = useSelector(getCurrentSortType);
  const currentSortOrder = useSelector(getCurrentSortOrder);

  const isSortTypeByPrice = currentSortType === SortingType.ByPrice;
  const isSortTypeByRating = currentSortType === SortingType.ByRating;

  const isSortOrderLowToHigh = currentSortOrder === SortingOrder.LowToHigh;
  const isSortOrderHighToLow = currentSortOrder === SortingOrder.HighToLow;

  const dispatch = useDispatch();

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${isSortTypeByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => dispatch(changeSortingType(SortingType.ByPrice))}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortTypeByRating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => dispatch(changeSortingType(SortingType.ByRating))}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrderLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            if (currentSortType === SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingOrder(SortingOrder.LowToHigh));
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrderHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            if (currentSortType === SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingOrder(SortingOrder.HighToLow));
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
