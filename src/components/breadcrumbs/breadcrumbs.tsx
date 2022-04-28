import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitar } from '../../store/guitars-reducer/selectors';

function Breadcrumbs(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const guitar = useSelector(getGuitar);

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link to={AppRoute.Main} className="link">
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link to={AppRoute.Main} className="link">Каталог</Link>
      </li>
      {id && <li className="breadcrumbs__item"><a className="link" href="/#">{guitar?.name}</a></li>}
    </ul>
  );
}

export default Breadcrumbs;
