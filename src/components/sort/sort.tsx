import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';
import { changeSortingType, changeSortingOrder, addFilterAction, removeFilterAction } from '../../store/action';
import { SortingType, SortingOrder, FilterQueryParam } from '../../const';

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
            if (currentSortingType === SortingType.ByRating) {
              dispatch(changeSortingType(SortingType.ByPrice));
              dispatch(removeFilterAction(FilterQueryParam.SortByRating));
              dispatch(addFilterAction(FilterQueryParam.SortByPrice));
            }
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortTypeByRating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => {
            dispatch(changeSortingType(SortingType.ByRating));
            if (currentSortingType === SortingType.ByPrice) {
              dispatch(changeSortingType(SortingType.ByRating));
              dispatch(removeFilterAction(FilterQueryParam.SortByPrice));
              dispatch(addFilterAction(FilterQueryParam.SortByRating));
            }
          }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortOrderLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            if (currentSortingType === SortingType.Default && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
              dispatch(changeSortingOrder(SortingOrder.LowToHigh));
              dispatch(addFilterAction(FilterQueryParam.SortByPrice));
              dispatch(addFilterAction(FilterQueryParam.SortLowToHigh));
            }
            if (currentSortingType === SortingType.ByPrice && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingOrder(SortingOrder.LowToHigh));
              dispatch(addFilterAction(FilterQueryParam.SortByPrice));
              dispatch(addFilterAction(FilterQueryParam.SortLowToHigh));
            }
            if (currentSortingType === SortingType.ByPrice && currentSortingOrder === SortingOrder.HighToLow) {
              dispatch(changeSortingOrder(SortingOrder.LowToHigh));
              dispatch(removeFilterAction(FilterQueryParam.SortHighToLow));
              dispatch(addFilterAction(FilterQueryParam.SortLowToHigh));
            }

            if (currentSortingType === SortingType.ByRating && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingOrder(SortingOrder.LowToHigh));
              dispatch(addFilterAction(FilterQueryParam.SortByRating));
              dispatch(addFilterAction(FilterQueryParam.SortLowToHigh));
            }

            if (currentSortingType === SortingType.ByRating && currentSortingOrder === SortingOrder.HighToLow) {
              dispatch(changeSortingOrder(SortingOrder.LowToHigh));
              dispatch(removeFilterAction(FilterQueryParam.SortHighToLow));
              dispatch(addFilterAction(FilterQueryParam.SortLowToHigh));
            }
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortOrderHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            if (currentSortingType === SortingType.Default && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
              dispatch(changeSortingOrder(SortingOrder.HighToLow));
              dispatch(addFilterAction(FilterQueryParam.SortByPrice));
              dispatch(addFilterAction(FilterQueryParam.SortHighToLow));
            }
            if (currentSortingType === SortingType.ByPrice && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingOrder(SortingOrder.HighToLow));
              dispatch(addFilterAction(FilterQueryParam.SortByPrice));
              dispatch(addFilterAction(FilterQueryParam.SortHighToLow));
            }
            if (currentSortingType === SortingType.ByPrice && currentSortingOrder === SortingOrder.LowToHigh) {
              dispatch(changeSortingOrder(SortingOrder.HighToLow));
              dispatch(removeFilterAction(FilterQueryParam.SortLowToHigh));
              dispatch(addFilterAction(FilterQueryParam.SortHighToLow));
            }

            if (currentSortingType === SortingType.ByRating && currentSortingOrder === SortingOrder.Default) {
              dispatch(changeSortingOrder(SortingOrder.HighToLow));
              dispatch(addFilterAction(FilterQueryParam.SortByRating));
              dispatch(addFilterAction(FilterQueryParam.SortHighToLow));
            }

            if (currentSortingType === SortingType.ByRating && currentSortingOrder === SortingOrder.LowToHigh) {
              dispatch(changeSortingOrder(SortingOrder.HighToLow));
              dispatch(removeFilterAction(FilterQueryParam.SortLowToHigh));
              dispatch(addFilterAction(FilterQueryParam.SortHighToLow));
            }
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
