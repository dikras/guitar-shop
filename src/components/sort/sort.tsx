import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSortType, getCurrentSortRanking } from '../../store/app-reducer/selectors';
import { changeSortingType, changeSortingRanking } from '../../store/action';
import { SortingType, SortingRanking } from '../../const';

function Sort(): JSX.Element {
  const currentSortType = useSelector(getCurrentSortType);
  const currentSortRanking = useSelector(getCurrentSortRanking);

  const isSortTypeByPrice = currentSortType === SortingType.ByPrice;
  const isSortTypeByPopularity = currentSortType === SortingType.ByPopularity;

  const isSortRankingLowToHigh = currentSortRanking === SortingRanking.LowToHigh;
  const isSortRankingHighToLow = currentSortRanking === SortingRanking.HighToLow;

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
          className={`catalog-sort__type-button ${isSortTypeByPopularity ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={() => dispatch(changeSortingType(SortingType.ByPopularity))}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortRankingLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => {
            if (currentSortType === SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingRanking(SortingRanking.LowToHigh));
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortRankingHighToLow ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => {
            if (currentSortType === SortingType.Default) {
              dispatch(changeSortingType(SortingType.ByPrice));
            }
            dispatch(changeSortingRanking(SortingRanking.HighToLow));
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
