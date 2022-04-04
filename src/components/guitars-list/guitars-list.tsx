import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadFilteredGuitars } from '../../store/api-action';
import {
  getCurrentSortFilterURL
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber, getIsPaginationDone } from '../../store/pagination-reducer/selectors';
import {
  APIRoute,
  PaginationNumber,
  NUMBER_TO_ROUND
} from '../../const';
import { nanoid } from 'nanoid';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const isPaginationDone = useSelector(getIsPaginationDone);

  const currentStartNumber = useSelector(getCurrentStartNumber);

  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${useSelector(getCurrentSortFilterURL)}`;
  const urlFilterWithComments = `${APIRoute.Guitars}${useSelector(getCurrentSortFilterURL)}_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  useEffect(() => {
    if (isPaginationDone) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
  },[dispatch,
    urlFilterNoComments,
    urlFilterWithComments,
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
