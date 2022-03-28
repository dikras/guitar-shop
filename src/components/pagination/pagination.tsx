import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getAllGuitarsTotalCount } from '../../store/guitars-reducer/selectors';
import { NUMBER_TO_ROUND, PaginationNumber } from '../../const';
import { setStartNumber } from '../../store/action';

function Pagination(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const totalGuitars = useSelector(getAllGuitarsTotalCount);
  const pagesCount = Math.ceil(totalGuitars / PaginationNumber.Limit);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [ firstElement, ...others ] = pages;
  const [ lastElement ] = others.reverse();

  const [ currentPage, setCurrentPage ] = useState(1);

  return (
    <div className="pagination page-content__pagination" data-testid="pagination-block">
      <ul className="pagination__list">
        {currentPage !== firstElement &&
        <li
          className="pagination__page pagination__page--prev"
          id="prev"
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            history.replace( '/', `catalog/page_${currentPage}`);
            dispatch(setStartNumber((currentPage - (pages.length -1)) * PaginationNumber.Limit));
          }}
        >
          <Link to={`catalog/page_${currentPage}`} className="link pagination__page-link">Назад</Link>
        </li>}
        {pages.map((page) => (
          <li
            key={nanoid(NUMBER_TO_ROUND)}
            className={`pagination__page ${currentPage === page && 'pagination__page--active'}`}
            onClick={() => {
              setCurrentPage(page);
              history.replace( '/', `catalog/page_${page}`);
              dispatch(setStartNumber((page - 1) * PaginationNumber.Limit));
            }}
          >
            <Link to={`catalog/page_${page}`} className="link pagination__page-link" href={`${page}`}>{page}</Link>
          </li>
        ))}
        {currentPage !== lastElement &&
        <li
          className="pagination__page pagination__page--next"
          id="next"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            history.replace( '/', `catalog/page_${currentPage}`);
            dispatch(setStartNumber(currentPage * PaginationNumber.Limit));
          }}
        >
          <Link to={`catalog/page_${currentPage}`} className="link pagination__page-link">Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
