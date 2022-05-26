import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);

  return (
    <div className="cards catalog__cards" data-testid="guitars-catalog">
      {guitars.map((guitar) => (
        <GuitarCard
          key={nanoid()}
          guitar={guitar}
          isMainScreen
        />
      ))}
    </div>
  );
}

export default GuitarsList;
