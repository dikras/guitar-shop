/* eslint-disable no-console */
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';

function MainScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}

export default MainScreen;
