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
  getCurrentSortOrder
} from '../../store/app-reducer/selectors';
import { SortingType, SortingOrder, GuitarType, StringCount } from '../../const';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  const urlSortFilter = useSelector(getCurrentUrl);

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadSortFilterGuitars(urlSortFilter));
    }
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadSortFilterGuitars(urlSortFilter));
    }
    if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
      dispatch(loadSortFilterGuitars(urlSortFilter));
    }
  },[dispatch, urlSortFilter, currentGuitarType, currentStringCount, currentSortingType, currentSortingOrder]);

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
