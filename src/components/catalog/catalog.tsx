import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import GuitarsList from '../guitars-list/guitars-list';

function Catalog(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="/#">Каталог</a>
          </li>
        </ul>
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
