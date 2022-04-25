/* eslint-disable no-console */
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ProductContainer from '../product-container/product-container';
import Reviews from '../reviews/reviews';
import Footer from '../footer/footer';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getGuitarsId } from '../../store/guitars-reducer/selectors';
import { useSelector } from 'react-redux';

function ProductScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const guitarsIds = useSelector(getGuitarsId);
  const isValidPageNumber = guitarsIds.some((item) => item.toString() === id);
  console.log(isValidPageNumber);

  const renderProductScreen = () => (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
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
      {isValidPageNumber ?
        renderProductScreen() :
        <NotFoundScreen />}
    </div>
  );
}

export default ProductScreen;


