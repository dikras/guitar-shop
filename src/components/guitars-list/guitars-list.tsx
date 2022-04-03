import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadFilteredGuitars } from '../../store/api-action';
import {
  // getCurrentGuitarType,
  getCurrentStringCount,
  getCurrentSortFilterURL,
  getCurrentSortType,
  getCurrentSortOrder,
  getCurrentStartPrice,
  getCurrentEndPricer
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber, getIsPaginationDone } from '../../store/pagination-reducer/selectors';
import {
  APIRoute,
  SortingType,
  SortingOrder,
  StringCount,
  InitialPrice,
  PaginationNumber,
  NUMBER_TO_ROUND
} from '../../const';
import { nanoid } from 'nanoid';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  // const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  const currentStartPrice = useSelector(getCurrentStartPrice);
  const currentEndPrice = useSelector(getCurrentEndPricer);

  const isPaginationDone = useSelector(getIsPaginationDone);

  const currentStartNumber = useSelector(getCurrentStartNumber);

  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${useSelector(getCurrentSortFilterURL)}`;
  const urlFilterWithComments = `${APIRoute.Guitars}${useSelector(getCurrentSortFilterURL)}_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  let urlSort = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    urlSort = `&_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  useEffect(() => {
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
    if (currentStartPrice !== InitialPrice.Min) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
    if (currentEndPrice !== InitialPrice.Max) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
    if (isPaginationDone) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
  },[dispatch,
    urlFilterNoComments,
    urlFilterWithComments,
    urlSort,
    currentStringCount,
    currentStartPrice,
    currentEndPrice,
    currentStartNumber,
    isPaginationDone,
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
