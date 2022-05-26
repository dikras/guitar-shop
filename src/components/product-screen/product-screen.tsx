import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ProductContainer from '../product-container/product-container';
import Reviews from '../reviews/reviews';
import Footer from '../footer/footer';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {
  getIsGuitarError
} from '../../store/guitars-reducer/selectors';
import { useSelector } from 'react-redux';

function ProductScreen(): JSX.Element {
  const isGuitarError = useSelector(getIsGuitarError);

  const renderProductScreen = () => (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger" data-testid="page-content-title">Товар</h1>
          <Breadcrumbs />
          <ProductContainer />
          <Reviews />
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div>
      {isGuitarError ?
        <NotFoundScreen /> :
        renderProductScreen()}
    </div>
  );
}

export default ProductScreen;


