import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { APIRoute, StringCount, FilterQueryParam, PaginationNumber } from '../../const';
import {
  addFilterAction,
  changeStringCount,
  removeFilterAction
} from '../../store/action';
import { loadFilteredGuitars } from '../../store/api-action';
import {
  getCurrentSortFilterURL,
  getCurrentStringCount
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';

type FilterStringProps = {
  isAcousticChecked: boolean;
  isElectricChecked: boolean;
  isUkuleleChecked: boolean;

  isFourStringsChecked: boolean;
  isSixStringsChecked: boolean;
  isSevenStringsChecked: boolean;
  isTwelveStringsChecked: boolean;

  setIsFourStringsChecked: (param: boolean) => void;
  setIsSixStringsChecked: (param: boolean) => void;
  setIsSevenStringsChecked: (param: boolean) => void;
  setIsTwelveStringsChecked: (param: boolean) => void;
};

function FilterString(props: FilterStringProps): JSX.Element {
  const {
    isAcousticChecked,
    isElectricChecked,
    isUkuleleChecked,
    isFourStringsChecked,
    isSixStringsChecked,
    isSevenStringsChecked,
    isTwelveStringsChecked,
    setIsFourStringsChecked,
    setIsSixStringsChecked,
    setIsSevenStringsChecked,
    setIsTwelveStringsChecked,
  } = props;

  const currentSortFilterURL = useSelector(getCurrentSortFilterURL);
  const currentStartNumber = useSelector(getCurrentStartNumber);
  const currentStringCount = useSelector(getCurrentStringCount);

  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${currentSortFilterURL}`;
  const urlFilterWithComments = `${APIRoute.Guitars}${currentSortFilterURL}_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}`;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentStringCount !== StringCount.Default) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
  }, [
    dispatch,
    urlFilterNoComments,
    urlFilterWithComments,
    currentStringCount,
  ]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="4-strings"
          name="4-strings"
          onChange={() => {
            setIsFourStringsChecked(!isFourStringsChecked);
            if (!isFourStringsChecked) {
              dispatch(changeStringCount(StringCount.FourString));
              dispatch(addFilterAction(FilterQueryParam.FourString));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.FourString));
            }
          }}
          disabled={isAcousticChecked && !isUkuleleChecked && !isElectricChecked}
        />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="6-strings"
          name="6-strings"
          onChange={() => {
            setIsSixStringsChecked(!isSixStringsChecked);
            if (!isSixStringsChecked) {
              dispatch(changeStringCount(StringCount.SixString));
              dispatch(addFilterAction(FilterQueryParam.SixString));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.SixString));
            }
          }}
          disabled={isUkuleleChecked && !isElectricChecked && !isAcousticChecked}
        />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="7-strings"
          name="7-strings"
          onChange={() => {
            setIsSevenStringsChecked(!isSevenStringsChecked);
            if (!isSevenStringsChecked) {
              dispatch(changeStringCount(StringCount.SevenString));
              dispatch(addFilterAction(FilterQueryParam.SevenString));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.SevenString));
            }
          }}
          disabled={isUkuleleChecked && !isElectricChecked && !isAcousticChecked}
        />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="12-strings"
          name="12-strings"
          onChange={() => {
            setIsTwelveStringsChecked(!isTwelveStringsChecked);
            if (!isTwelveStringsChecked) {
              dispatch(changeStringCount(StringCount.TwelveString));
              dispatch(addFilterAction(FilterQueryParam.TwelveString));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.TwelveString));
            }
          }}
          disabled={(isUkuleleChecked || isElectricChecked) && !isAcousticChecked}
          data-testid="checkbox-12-strings"
        />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default FilterString;
