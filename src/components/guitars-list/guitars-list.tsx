/* eslint-disable no-console */
import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGuitarsAction, loadSortedGuitars, loadGuitarsByType, loadGuitarsByStringCount } from '../../store/api-action';
import { getCurrentSortType, getCurrentSortOrder, getCurrentGuitarType, getCurrentStringCount } from '../../store/app-reducer/selectors';
import { SortingType, SortingOrder, GuitarType, StringCount } from '../../const';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);
  const currentGuitarType = useSelector(getCurrentGuitarType);
  const currentStringCount = useSelector(getCurrentStringCount);

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default && currentGuitarType !== GuitarType.Initial) {
      dispatch(loadGuitarsByType(currentGuitarType));
    }
    if (currentStringCount !== StringCount.Default && currentStringCount !== StringCount.Initial) {
      dispatch(loadGuitarsByStringCount(currentStringCount));
    }
    if (currentGuitarType === GuitarType.Initial || currentStringCount === StringCount.Initial) {
      dispatch(fetchGuitarsAction());
    }
  },[dispatch, currentGuitarType, currentStringCount]);

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
