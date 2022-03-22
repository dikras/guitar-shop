import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { PaginationType } from '../../types/page-pagination';
import { PaginationNumber } from '../../const';
import { setStartNumber } from '../../store/action';

type NextButtonProps = {
  handleButtonClick: (arg: boolean) => void;
  handleSetBtnActive: (arg: PaginationType) => void;
  pagePag: PaginationType;
}

function NextButton(props: NextButtonProps): JSX.Element {
  const { handleButtonClick, handleSetBtnActive, pagePag } = props;

  const pages = ['1', '2', '3'];
  const reversePages = pages.reverse();
  const [ currentPage, setCurrentPage ] = useState(reversePages.pop());

  const arr = Object.values(pagePag).map((item) => item.isActive);
  const [newArr, setNewArr] = useState(arr);
  const [i, setI] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const [ currentStart, setCurrentStart ] = useState(PaginationNumber.InitialStart + PaginationNumber.Limit);

  const handleNextBtn = () => {
    setCurrentPage(reversePages.pop());
    if (currentStart !== PaginationNumber.MaxStart) {
      setCurrentStart((prev) => prev + PaginationNumber.Limit);
      dispatch(setStartNumber(currentStart));
    }
    history.replace( '/', `catalog/page_${currentPage}`);
  };

  return (
    <li
      className="pagination__page pagination__page--next"
      id="next"
      onClick={() => {
        setNewArr(() => {
          [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
          return newArr;
        });
        setI((prev) => prev + 1);
        handleNextBtn();
        handleButtonClick(true);
        handleSetBtnActive(
          Object.assign(
            {},
            pagePag,
            pagePag.first.isActive = newArr[0],
            pagePag.second.isActive = newArr[1],
            pagePag.third.isActive = newArr[2],
          ),
        );
      }}
    >
      <Link to={`catalog/page_${currentPage}`} className="link pagination__page-link">Далее</Link>
    </li>
  );
}

export default NextButton;
