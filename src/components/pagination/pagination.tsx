import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getAllGuitarsTotalCount } from '../../store/guitars-reducer/selectors';
import { getCurrentSortFilterURL } from '../../store/app-reducer/selectors';
import { NUMBER_TO_ROUND, PaginationNumber, APIRoute } from '../../const';
import { setStartNumber } from '../../store/action';
import { useHistory } from 'react-router-dom';

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

  const currentSortFilterURL = useSelector(getCurrentSortFilterURL);
  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${currentSortFilterURL}`;

  useEffect(() => {
    history.push({
      pathname: `page_${currentPage}`,
      search: urlFilterNoComments.slice(9),
    });
  }, [history, urlFilterNoComments, currentPage]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage !== firstElement &&
        <li
          className="pagination__page pagination__page--prev"
          id="prev"
          onClick={(evt) => {
            evt.preventDefault();
            setCurrentPage((prev) => prev - 1);
            dispatch(setStartNumber((currentPage - (pages.length -1)) * PaginationNumber.Limit));
          }}
        >
          <Link to={`/page_${currentPage - 1}`} className="link pagination__page-link">Назад</Link>
        </li>}
        {pages.map((page) => (
          <li
            key={nanoid(NUMBER_TO_ROUND)}
            className={`pagination__page ${currentPage === page && 'pagination__page--active'}`}
            onClick={(evt) => {
              evt.preventDefault();
              setCurrentPage(page);
              dispatch(setStartNumber((page - 1) * PaginationNumber.Limit));
            }}
          >
            <Link to={`/page_${page}`} className="link pagination__page-link" href={`${page}`}>{page}</Link>
          </li>
        ))}
        {(currentPage !== lastElement && pagesCount !== 1) &&
        <li
          className="pagination__page pagination__page--next"
          id="next"
          onClick={(evt) => {
            evt.preventDefault();
            setCurrentPage((prev) => prev + 1);
            dispatch(setStartNumber(currentPage * PaginationNumber.Limit));
          }}
          data-testid="button-next"
        >
          <Link to={`/page_${currentPage + 1}`} className="link pagination__page-link">Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
