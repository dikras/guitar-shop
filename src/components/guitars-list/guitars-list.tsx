/* eslint-disable no-console */
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
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';
import { SortingType, SortingOrder, GuitarType, StringCount, InitialPrice, PaginationNumber } from '../../const';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  const currentStartPrice = useSelector(getCurrentStartPrice);
  const currentEndPrice = useSelector(getCurrentEndPricer);

  const currentStartNumber = useSelector(getCurrentStartNumber);

  const urlFilter = `${useSelector(getCurrentUrl)}&_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  let urlSort = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    urlSort = `&_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  // const urlPagination = `&_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadSortFilterGuitars(`${urlFilter}${urlSort}`));
    }
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadSortFilterGuitars(urlFilter));
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
    if (currentStartNumber !== PaginationNumber.InitialStart) {
      dispatch(loadSortFilterGuitars(`${urlFilter}`));
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
  ]);

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => {
        const keyValue = `${guitar.id}`;
        return (
          <GuitarCard
            key={keyValue}
            guitar={guitar}
          />
        );
      })}
    </div>
  );
}

export default GuitarsList;
