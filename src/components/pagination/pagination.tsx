import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getAllGuitarsTotalCount } from '../../store/guitars-reducer/selectors';
import { PaginationNumber, QueryParam } from '../../const';
import { loadFilteredGuitars } from '../../store/api-action';
import { setCurrentPageNumber, setStartNumber } from '../../store/action';
import { getCurrentPageNumber } from '../../store/pagination-reducer/selectors';

function Pagination(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const totalGuitars = useSelector(getAllGuitarsTotalCount);
  const pagesCount = Math.ceil(totalGuitars / PaginationNumber.Limit);
  const currentPage = useSelector(getCurrentPageNumber);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [ firstElement, ...others ] = pages;
  const [ lastElement ] = others.reverse();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const pageNumber = params.get('page');
    if (pageNumber) {
      dispatch(setCurrentPageNumber(Number(pageNumber)));
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const paramsInner = new URLSearchParams(location.search);

  const handleParamsChange = (paramStart: number, currentPageValue: number) => {
    paramsInner.set('page', `${currentPageValue}`);
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
        >
          <a
            className="link pagination__page-link"
            href="/#"
            onClick={(evt) => {
              evt.preventDefault();
              handleParamsChange((currentPage - (pages.length -1)) * PaginationNumber.Limit, currentPage - 1);
              dispatch(setCurrentPageNumber(currentPage - 1));
              dispatch(setStartNumber((currentPage - (pages.length -1)) * PaginationNumber.Limit));
            }}
          >Назад
          </a>
        </li>}
        {pages.map((page) => (
          <li
            key={nanoid()}
            className={`pagination__page ${currentPage === page && 'pagination__page--active'}`}
          >
            <a
              className="link pagination__page-link"
              href="/#"
              onClick={(evt) => {
                evt.preventDefault();
                handleParamsChange((page - 1) * PaginationNumber.Limit, page);
                dispatch(setCurrentPageNumber(page));
                dispatch(setStartNumber((page - 1) * PaginationNumber.Limit));
              }}
            >{page}
            </a>
          </li>
        ))}
        {(currentPage !== lastElement && pagesCount !== 1) &&
        <li className="pagination__page pagination__page--next" id="next" data-testid="button-next" >
          <a
            className="link pagination__page-link"
            href="/#"
            onClick={(evt) => {
              evt.preventDefault();
              handleParamsChange(currentPage * PaginationNumber.Limit, currentPage + 1);
              dispatch(setCurrentPageNumber(currentPage + 1));
              dispatch(setStartNumber(currentPage * PaginationNumber.Limit));
            }}
          >Далее
          </a>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
