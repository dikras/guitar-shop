import { Switch, Route } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import ProductScreen from '../product-screen/product-screen';
import { AppRoute } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.GuitarCard}>
        <ProductScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
