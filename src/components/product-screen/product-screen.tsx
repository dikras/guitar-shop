import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ProductContainer from '../product-container/product-container';
import Reviews from '../reviews/reviews';
import Footer from '../footer/footer';

function ProductScreen(): JSX.Element {
  return (
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
}

export default ProductScreen;


