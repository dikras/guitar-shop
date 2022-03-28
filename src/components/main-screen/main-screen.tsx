import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';

function MainScreen(): JSX.Element {
  return (
    <div className="wrapper" data-testid="main-container">
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}

export default MainScreen;
