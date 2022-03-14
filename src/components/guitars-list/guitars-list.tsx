/* eslint-disable no-console */
import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector } from 'react-redux';
import { getCurrentSortType, getCurrentSortRanking } from '../../store/app-reducer/selectors';
import { SortingType, SortingRanking } from '../../const';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const currentSortingRanking = useSelector(getCurrentSortRanking);
  const currentSortingType = useSelector(getCurrentSortType);

  const guitarsForSort = [...guitars];

  if (currentSortingType === SortingType.ByPrice) {
    switch (currentSortingRanking) {
      case SortingRanking.HighToLow:
        guitarsForSort.sort((a, b) => b.price - a.price);
        break;
      case SortingRanking.LowToHigh:
        guitarsForSort.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
  }

  if (currentSortingType === SortingType.ByPopularity) {
    switch (currentSortingRanking) {
      case SortingRanking.HighToLow:
        guitarsForSort.sort((a, b) => b.rating - a.rating);
        break;
      case SortingRanking.LowToHigh:
        guitarsForSort.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
  }

  return (
    <div className="cards catalog__cards">
      {guitarsForSort.map((guitar) => {
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
