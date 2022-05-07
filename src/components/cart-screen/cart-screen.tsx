import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartContainer from '../cart-container/cart-container';
import Footer from '../footer/footer';

function CartScreen(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs />
          <CartContainer />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CartScreen;
