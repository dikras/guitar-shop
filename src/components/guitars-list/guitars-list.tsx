/* eslint-disable no-console */
import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadFilteredGuitars, loadSortedGuitars } from '../../store/api-action';
import { getCurrentGuitarType,getCurrentStringCount, getCurrentUrlFilter } from '../../store/filter-reducer/selectors';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/sort-reducer/selectors';
import { SortingType, SortingOrder, GuitarType, StringCount } from '../../const';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  const urlFilter = useSelector(getCurrentUrlFilter);

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadFilteredGuitars(urlFilter));
    }
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadFilteredGuitars(urlFilter));
    }
  },[dispatch, urlFilter, currentGuitarType, currentStringCount]);

  useEffect(() => {
    if (currentSortingType !== SortingType.Default || currentSortingOrder !== SortingOrder.Default) {
      dispatch(loadSortedGuitars(currentSortingType, currentSortingOrder));
    }
  },[dispatch, currentSortingType, currentSortingOrder]);

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
