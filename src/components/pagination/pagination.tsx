import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getGuitarsNotComment } from '../../store/guitars-reducer/selectors';
import { NUMBER_TO_ROUND, PaginationNumber } from '../../const';
import { setStartNumber } from '../../store/action';

function Pagination(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const totalGuitars = useSelector(getGuitarsNotComment);
  const pagesCount = totalGuitars.length / PaginationNumber.Limit;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const newPages = [...pages];

  const [ firstElement ] = newPages;
  const [ lastElement ] = newPages.reverse();

  const [ currentPage, setCurrentPage ] = useState(1);

  const [ currentStart, setCurrentStart ] = useState(PaginationNumber.InitialStart + PaginationNumber.Limit);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage !== firstElement &&
        <li
          className="pagination__page pagination__page--prev"
          id="prev"
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            history.replace( '/', `catalog/page_${currentPage}`);
            setCurrentStart(currentStart - PaginationNumber.Limit);
            dispatch(setStartNumber(currentStart));
          }}
        >
          <Link to={`catalog/page_${currentPage}`} className="link pagination__page-link">Назад</Link>
        </li>}
        {pages.map((page) => {
          const keyValue = nanoid(NUMBER_TO_ROUND);
          return (
            <li
              key={keyValue}
              className={`pagination__page ${currentPage === page && 'pagination__page--active'}`}
              onClick={() => {
                setCurrentPage(page);
                history.replace( '/', `catalog/page_${page}`);
              }}
            >
              <Link to={`catalog/page_${page}`} className="link pagination__page-link" href={`${page}`}>{page}</Link>
            </li>
          );
        })}
        {currentPage !== lastElement &&
        <li
          className="pagination__page pagination__page--next"
          id="next"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            history.replace( '/', `catalog/page_${currentPage}`);
            dispatch(setStartNumber(currentStart));
            if (currentStart < PaginationNumber.Limit * (pages.length - 1)) {
              setCurrentStart((prev) => prev + PaginationNumber.Limit);
            }
          }}
        >
          <Link to={`catalog/page_${currentPage}`} className="link pagination__page-link">Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
