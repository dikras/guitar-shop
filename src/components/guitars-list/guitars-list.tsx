import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGuitars } from '../../store/api-action';
import {
  // getCurrentGuitarType,
  // getCurrentStringCount,
  getCurrentUrl,
  getCurrentSortType,
  getCurrentSortOrder
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';
import {
  APIRoute,
  SortingType,
  SortingOrder,
  // GuitarType,
  // StringCount,
  NUMBER_TO_ROUND,
  PaginationNumber
} from '../../const';
import { nanoid } from 'nanoid';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  // const currentGuitarType = useSelector(getCurrentGuitarType);
  // const currentStringCount = useSelector(getCurrentStringCount);

  // const currentStartPrice = useSelector(getCurrentStartPrice);
  // const currentEndPrice = useSelector(getCurrentEndPricer);

  // const isPaginationDone = useSelector(getIsPaginationDone);

  const currentStartNumber = useSelector(getCurrentStartNumber);

  const url = `${useSelector(getCurrentUrl)}`;

  let urlSort = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    urlSort = `_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  const urlNoComments = APIRoute.GuitarsNoComments;
  const urlWithComments = `${APIRoute.Guitars}_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  useEffect(() => {
    if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
      dispatch(fetchGuitars(`${urlNoComments}${url}${urlSort}`, `${urlWithComments}${url}${urlSort}`));
    }
  },[dispatch,
    url,
    urlSort,
    currentSortingType,
    currentSortingOrder,
    urlNoComments,
    urlWithComments,
  ]);

  /* useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
    if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
    if (currentStartPrice !== InitialPrice.Min) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
    if (currentEndPrice !== InitialPrice.Max) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
    if (isPaginationDone) {
      dispatch(loadSortFilterGuitars(`${url}${urlSort}`));
    }
  },[dispatch,
    urlFilter,
    urlSort,
    currentGuitarType,
    currentStringCount,
    currentSortingType,
    currentSortingOrder,
    currentStartPrice,
    currentEndPrice,
    currentStartNumber,
    isPaginationDone,
  ]); */

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
