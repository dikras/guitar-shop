import GuitarCard from '../guitar-card/guitar-card';
import { getGuitars } from '../../store/guitars-reducer/selectors';
import { useSelector } from 'react-redux';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);

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
