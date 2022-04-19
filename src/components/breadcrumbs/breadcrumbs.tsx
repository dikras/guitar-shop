import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../const';

function Breadcrumbs(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link to={AppRoute.Main} className="link">
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
      </li>
      {id && <li className="breadcrumbs__item"><a className="link" href="/#">Товар</a></li>}
    </ul>
  );
}

export default Breadcrumbs;
