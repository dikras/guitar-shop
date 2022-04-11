import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getAllGuitarsTotalCount } from '../../store/guitars-reducer/selectors';
import { NUMBER_TO_ROUND, PaginationNumber, QueryParam, INITIAL_PAGE } from '../../const';
import { setStartNumber, setCurrentPageNumber } from '../../store/action';
import { loadFilteredGuitars } from '../../store/api-action';

function Pagination(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const totalGuitars = useSelector(getAllGuitarsTotalCount);
  const pagesCount = Math.ceil(totalGuitars / PaginationNumber.Limit);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [ firstElement, ...others ] = pages;
  const [ lastElement ] = others.reverse();

  const [ currentPage, setCurrentPage ] = useState(INITIAL_PAGE);

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const isPaginationParams = !!params.get(QueryParam.PaginationStart);
    const pageNumber = location.pathname.slice(6);
    isPaginationParams ? setCurrentPage(Number(pageNumber)) : setCurrentPage(INITIAL_PAGE);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleParamsChange = (paramStart: number) => {
    const paramsInner = new URLSearchParams(location.search);
    paramsInner.set(QueryParam.PaginationStart, paramStart.toString());
    paramsInner.set(QueryParam.PaginationLimit, `${PaginationNumber.Limit}`);
    history.push({
      search: paramsInner.toString(),
    });
    dispatch(loadFilteredGuitars(paramsInner.toString()));
  };

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
            dispatch(setCurrentPageNumber(currentPage + 1));
            dispatch(setStartNumber((currentPage - (pages.length -1)) * PaginationNumber.Limit));
            handleParamsChange((currentPage - (pages.length -1)) * PaginationNumber.Limit);
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
              dispatch(setCurrentPageNumber(currentPage + 1));
              dispatch(setStartNumber((page - 1) * PaginationNumber.Limit));
              handleParamsChange((page - 1) * PaginationNumber.Limit);
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
            dispatch(setCurrentPageNumber(currentPage + 1));
            dispatch(setStartNumber(currentPage * PaginationNumber.Limit));
            handleParamsChange(currentPage * PaginationNumber.Limit);
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
