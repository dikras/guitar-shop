import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadSortFilterGuitars } from '../../store/api-action';
import {
  getCurrentGuitarType,
  getCurrentStringCount,
  getCurrentUrl,
  getCurrentSortType,
  getCurrentSortOrder,
  getCurrentStartPrice,
  getCurrentEndPricer
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber, getIsPaginationDone } from '../../store/pagination-reducer/selectors';
import { getCurrentGuitarName, getIsSearchDone } from '../../store/search-reducer/selectors';
import {
  SortingType,
  SortingOrder,
  GuitarType,
  StringCount,
  InitialPrice,
  PaginationNumber,
  NUMBER_TO_ROUND,
  FilterQueryParam
} from '../../const';
import { nanoid } from 'nanoid';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  const currentStartPrice = useSelector(getCurrentStartPrice);
  const currentEndPrice = useSelector(getCurrentEndPricer);

  const isPaginationDone = useSelector(getIsPaginationDone);
  const isSearchDone = useSelector(getIsSearchDone);

  const currentStartNumber = useSelector(getCurrentStartNumber);

  const currentGuitarName = useSelector(getCurrentGuitarName);

  const urlFilter = `${useSelector(getCurrentUrl)}&_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  const searchUrl = `${FilterQueryParam.NameLike}${currentGuitarName}`;

  let urlSort = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    urlSort = `&_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (currentStartPrice !== InitialPrice.Min) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (currentEndPrice !== InitialPrice.Max) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (isPaginationDone) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (isSearchDone) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}${searchUrl}`));
    }
  },[dispatch,
    urlFilter,
    urlSort,
    searchUrl,
    currentGuitarType,
    currentStringCount,
    currentSortingType,
    currentSortingOrder,
    currentStartPrice,
    currentEndPrice,
    currentStartNumber,
    currentGuitarName,
    isPaginationDone,
    isSearchDone,
  ]);

  return (
    <div className="cards catalog__cards" data-testid="guitars-catalog">
      {guitars.map((guitar) => (
        <GuitarCard
          key={nanoid(NUMBER_TO_ROUND)}
          guitar={guitar}
        />
      ))}
    </div>
  );
}

export default GuitarsList;
