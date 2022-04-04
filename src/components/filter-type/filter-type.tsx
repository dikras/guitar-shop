import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { APIRoute, GuitarType, SortingType, SortingOrder, FilterQueryParam, PaginationNumber } from '../../const';
import {
  addFilterAction,
  changeGuitarType,
  removeFilterAction
} from '../../store/action';
import { loadFilteredGuitars } from '../../store/api-action';
import {
  getCurrentSortFilterURL,
  getCurrentGuitarType,
  getCurrentSortType,
  getCurrentSortOrder
} from '../../store/app-reducer/selectors';
import { getCurrentStartNumber } from '../../store/pagination-reducer/selectors';

type FilterTypeProps = {
  isFourStringsChecked: boolean;
  isSixStringsChecked: boolean;
  isSevenStringsChecked: boolean;
  isTwelveStringsChecked: boolean;

  isAcousticChecked: boolean;
  isElectricChecked: boolean;
  isUkuleleChecked: boolean;
  setIsAcousticChecked: (param: boolean) => void;
  setIsElectricChecked: (param: boolean) => void;
  setIsUkuleleChecked: (param: boolean) => void;
};

function FilterType(props: FilterTypeProps): JSX.Element {
  const {
    isFourStringsChecked,
    isSixStringsChecked,
    isSevenStringsChecked,
    isTwelveStringsChecked,
    isAcousticChecked,
    isElectricChecked,
    isUkuleleChecked,
    setIsAcousticChecked,
    setIsElectricChecked,
    setIsUkuleleChecked,
  } = props;

  const currentSortFilterURL = useSelector(getCurrentSortFilterURL);
  const currentStartNumber = useSelector(getCurrentStartNumber);
  const currentGuitarType = useSelector(getCurrentGuitarType);

  const currentSortingType = useSelector(getCurrentSortType);
  const currentSortingOrder = useSelector(getCurrentSortOrder);

  let sortURL = '';

  if (currentSortingType !== SortingType.Default && currentSortingOrder !== SortingOrder.Default) {
    sortURL = `&_sort=${currentSortingType}&_order=${currentSortingOrder}`;
  }

  const urlFilterNoComments = `${APIRoute.GuitarsNoComments}?${currentSortFilterURL}`;
  const urlFilterWithComments = `${APIRoute.Guitars}${currentSortFilterURL}_start=${currentStartNumber}&_limit=${PaginationNumber.Limit}${sortURL}`;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGuitarType !== GuitarType.Default) {
      dispatch(loadFilteredGuitars(urlFilterNoComments, urlFilterWithComments));
    }
  }, [
    dispatch,
    urlFilterNoComments,
    urlFilterWithComments,
    currentGuitarType,
  ]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="acoustic"
          name="acoustic"
          onChange={() => {
            setIsAcousticChecked(!isAcousticChecked);
            if (!isAcousticChecked) {
              dispatch(changeGuitarType(GuitarType.Acoustic));
              dispatch(addFilterAction(FilterQueryParam.Acoustic));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.Acoustic));
            }
          }}
          disabled={isFourStringsChecked && !isSixStringsChecked && !isSevenStringsChecked && !isTwelveStringsChecked}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="electric"
          name="electric"
          onChange={() => {
            setIsElectricChecked(!isElectricChecked);
            if (!isElectricChecked) {
              dispatch(changeGuitarType(GuitarType.Electric));
              dispatch(addFilterAction(FilterQueryParam.Electric));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.Electric));
            }
          }}
          disabled={isTwelveStringsChecked && !isFourStringsChecked && !isSixStringsChecked && !isSevenStringsChecked}
          data-testid="checkbox-electric"
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="ukulele"
          name="ukulele"
          onChange={() => {
            setIsUkuleleChecked(!isUkuleleChecked);
            if (!isUkuleleChecked) {
              dispatch(changeGuitarType(GuitarType.Ukulele));
              dispatch(addFilterAction(FilterQueryParam.Ukulele));
            } else {
              dispatch(removeFilterAction(FilterQueryParam.Ukulele));
            }
          }}
          disabled={(isSixStringsChecked || isSevenStringsChecked || isTwelveStringsChecked) && !isFourStringsChecked}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
