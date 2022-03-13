import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <section style={{padding: '4rem'}}>
      <h1 style={{fontSize: '24px', textAlign: 'center'}}>404. Page not found</h1>
      <Link to={AppRoute.Main} style={{fontSize: '18px', textAlign: 'center'}}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
