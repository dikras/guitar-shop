/* eslint-disable no-console */
import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadSortedGuitars } from '../../store/api-action';
import { getCurrentSortType, getCurrentSortOrder } from '../../store/app-reducer/selectors';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);

  useEffect(() => {
    dispatch(loadSortedGuitars(currentSortingType, currentSortingOrder));
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
