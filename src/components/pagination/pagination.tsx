/* eslint-disable no-console */
import PrevButton from '../prev-button/prev-button';
import NextButton from '../next-button/next-button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { PaginationType } from '../../types/page-pagination';
import { NUMBER_TO_ROUND } from '../../const';

function Pagination(): JSX.Element {
  const PagePag: PaginationType = {
    first: {
      number: 1,
      isActive: true,
    },
    second: {
      number: 2,
      isActive: false,
    },
    third: {
      number: 3,
      isActive: false,
    },
  };
  const [ isNextClicked, setIsNextClicked ] = useState(false);
  // const [ isLastClicked, setIsLastClicked ] = useState(false);

  const [pageObj, setPageObj] = useState(PagePag);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isNextClicked && <PrevButton />}
        {Object.values(pageObj).map((page) => {
          const keyValue = nanoid(NUMBER_TO_ROUND);
          return (
            <li key={keyValue} className={`pagination__page ${page.isActive ? 'pagination__page--active' : ''}`}>
              <Link to={`catalog/page_${page.number}`} className="link pagination__page-link" href={`${page.number}`}>{page.number}</Link>
            </li>
          );
        })}
        <NextButton
          handleButtonClick={setIsNextClicked}
          handleSetBtnActive={setPageObj}
          pagePag={PagePag}
        />
        {/* {!isLastClicked && <NextButton handleButtonClick={setIsNextClicked} />} */}
      </ul>
    </div>
  );
}

export default Pagination;
