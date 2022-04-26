import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import GuitarsList from '../guitars-list/guitars-list';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

function Catalog(): JSX.Element {
  return (
    <main className="page-content" data-testid="catalog-container">
      <div className="container">
        <h1 className="page-content__title title title--bigger" data-testid="catalog-title">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <Filter />
          <Sort />
          <GuitarsList />
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
