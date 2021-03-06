import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ENTER_KEY, QueryParam, GuitarType, StringNumber, PaginationNumber } from '../../const';
import { loadFilteredGuitars } from '../../store/api-action';
import { getGuitarMinPrice, getGuitarMaxPrice } from '../../store/guitars-reducer/selectors';
import { getCurrentStartNumber, getCurrentPageNumber } from '../../store/pagination-reducer/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const guitarMinPrice = useSelector(getGuitarMinPrice);
  const guitarMaxPrice = useSelector(getGuitarMaxPrice);
  const currentPage = useSelector(getCurrentPageNumber);
  const currentStartNumber = useSelector(getCurrentStartNumber);

  const minFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMinPrice);
  const maxFormatPrice = new Intl.NumberFormat('ru-RU', {useGrouping: true}).format(guitarMaxPrice);

  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const params = new URLSearchParams(location.search);

  const [ isAcousticClicked, setIsAcousticClicked ] = useState(false);
  const [ isElectricClicked, setIsElectricClicked ] = useState(false);
  const [ isUkuleleClicked, setIsUkuleleClicked ] = useState(false);

  const [ isFourStringsClicked, setIsFourStringsClicked ] = useState(false);
  const [ isSixStringsClicked, setIsSixStringsClicked ] = useState(false);
  const [ isSevenStringsClicked, setIsSevenStringsClicked ] = useState(false);
  const [ isTwelveStringsClicked, setIsTwelveStringsClicked ] = useState(false);

  params.set(QueryParam.PaginationStart, `${currentStartNumber}`);
  params.set(QueryParam.PaginationLimit, `${PaginationNumber.Limit}`);

  useEffect(() => {
    const isAcoustic = params.getAll('type').includes(GuitarType.Acoustic);
    const isElectric = params.getAll('type').includes(GuitarType.Electric);
    const isUkulele = params.getAll('type').includes(GuitarType.Ukulele);

    const isFourStrings = params.getAll('stringCount').includes(StringNumber.FourString);
    const isSixStrings = params.getAll('stringCount').includes(StringNumber.SixString);
    const isSevenStrings = params.getAll('stringCount').includes(StringNumber.SevenString);
    const isTwelveStrings = params.getAll('stringCount').includes(StringNumber.TwelveString);

    const startPrice = params.get('price_gte');
    const endPrice = params.get('price_lte');

    const sortType = params.get('_sort');
    const orderType = params.get('_order');

    const pageNumber = params.get('page');
    const startNumber = params.get('_start');
    const limitNumber = params.get('_limit');

    let paramString = '';

    isAcoustic && (paramString += '&type=acoustic&');
    isElectric && (paramString += '&type=electric&');
    isUkulele && (paramString += '&type=ukulele&');
    isFourStrings && (paramString += '&stringCount=4&');
    isSixStrings && (paramString += '&stringCount=6&');
    isSevenStrings && (paramString += '&stringCount=7&');
    isTwelveStrings && (paramString += '&stringCount=12&');
    startPrice && (paramString += `&price_gte=${startPrice}&`);
    endPrice && (paramString += `&price_lte=${endPrice}&`);
    sortType && (paramString += `&_sort=${sortType}&`);
    orderType && (paramString += `&_order=${orderType}&`);
    startNumber ? (paramString += `&page=${pageNumber}&`) : history.push({search: 'page=1'});
    startNumber && (paramString += `&_start=${startNumber}&`);
    limitNumber && (paramString += `&_limit=${limitNumber}&`);

    setIsAcousticClicked(isAcoustic);
    setIsElectricClicked(isElectric);
    setIsUkuleleClicked(isUkulele);

    setIsFourStringsClicked(isFourStrings);
    setIsSixStringsClicked(isSixStrings);
    setIsSevenStringsClicked(isSevenStrings);
    setIsTwelveStringsClicked(isTwelveStrings);

    dispatch(loadFilteredGuitars(paramString));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleParamsChange = (paramName: string, paramValue: boolean, paramType: string)=> {
    const paramsInner = new URLSearchParams(location.search);
    paramsInner.set('page', `${currentPage}`);
    paramsInner.set(QueryParam.PaginationStart, `${currentStartNumber}`);
    paramsInner.set(QueryParam.PaginationLimit, `${PaginationNumber.Limit}`);
    if(paramValue) {
      paramsInner.append(paramType, paramName);
      dispatch(loadFilteredGuitars(paramsInner.toString()));
      history.push({
        search: paramsInner.toString(),
      });
    } else {
      const paramsType = paramsInner.getAll(paramType).filter((it) => it !== paramName);
      paramsInner.delete(paramType);
      paramsType.map((it) => paramsInner.append(paramType, it));
      history.push({
        search: paramsInner.toString(),
      });
      dispatch(loadFilteredGuitars(paramsInner.toString()));

    }
  };

  return (
    <form
      className="catalog-filter"
      data-testid="filter-form"
    >
      <h2 className="title title--bigger catalog-filter__title">????????????</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">????????, ???</legend>
        <div className="catalog-filter__price-range" data-testid="price-filter">
          <div className="form-input">
            <label className="visually-hidden">?????????????????????? ????????</label>
            <input
              type="number"
              placeholder={`${minFormatPrice}`}
              id="priceMin"
              name="????"
              onChange={(evt) => {
                const currentStartValue = evt.target.value;
                if (Number(currentStartValue) >= 0) {
                  setMinPrice(currentStartValue);
                }
                if(!currentStartValue) {
                  handleParamsChange(minPrice, !!currentStartValue, QueryParam.StartPrice);
                }
              }}
              onBlur={(evt) => {
                const currentStartPrice = evt.target.value;
                if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                  setMinPrice(minFormatPrice.toString());
                } else {
                  setMinPrice(currentStartPrice);
                  handleParamsChange(minPrice, !!currentStartPrice, QueryParam.StartPrice);
                }
              }}
              onKeyDown={(evt) => {
                const currentStartPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentStartPrice) {
                  if (Number(currentStartPrice) < guitarMinPrice || Number(currentStartPrice) > guitarMaxPrice) {
                    setMinPrice(minFormatPrice.toString());
                  } else {
                    handleParamsChange(minPrice, !!currentStartPrice, QueryParam.StartPrice);
                  }
                }
              }}
              value={minPrice}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">???????????????????????? ????????</label>
            <input
              type="number"
              placeholder={`${maxFormatPrice}`}
              id="priceMax"
              name="????"
              onChange={(evt) => {
                const currentEndValue = evt.target.value;
                if (Number(currentEndValue) >= 0) {
                  setMaxPrice(currentEndValue);
                }
                if(!currentEndValue) {
                  handleParamsChange(maxPrice, !!currentEndValue, QueryParam.EndPrice);
                }
              }}
              onBlur={(evt) => {
                const currentEndPrice = evt.target.value;
                if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                  setMaxPrice(maxFormatPrice.toString());
                } else {
                  setMaxPrice(currentEndPrice);
                  handleParamsChange(maxPrice, !!currentEndPrice, QueryParam.EndPrice);
                }
              }}
              onKeyDown={(evt) => {
                const currentEndPrice = evt.currentTarget.value;
                if (evt.key === ENTER_KEY && currentEndPrice) {
                  if (Number(currentEndPrice) < guitarMinPrice || Number(currentEndPrice) > guitarMaxPrice) {
                    setMaxPrice(maxFormatPrice.toString());
                  } else {
                    handleParamsChange(maxPrice, !!currentEndPrice, QueryParam.EndPrice);
                  }
                }
              }}
              value={maxPrice}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">?????? ??????????</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={(evt) => {
              handleParamsChange('acoustic', evt.target.checked, 'type');
              setIsAcousticClicked(evt.target.checked);
            }}
            checked={isAcousticClicked}
            disabled={isFourStringsClicked && !isSixStringsClicked && !isSevenStringsClicked && !isTwelveStringsClicked}
          />
          <label htmlFor="acoustic">???????????????????????? ????????????</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={(evt) => {
              handleParamsChange('electric', evt.target.checked, 'type');
              setIsElectricClicked(evt.target.checked);
            }}
            checked={isElectricClicked}
            disabled={isTwelveStringsClicked && !isFourStringsClicked && !isSixStringsClicked && !isSevenStringsClicked}
            data-testid="checkbox-electric"
          />
          <label htmlFor="electric">??????????????????????????</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={(evt) => {
              handleParamsChange('ukulele', evt.target.checked, 'type');
              setIsUkuleleClicked(evt.target.checked);
            }}
            checked={isUkuleleClicked}
            disabled={(isSixStringsClicked || isSevenStringsClicked || isTwelveStringsClicked) && !isFourStringsClicked}
          />
          <label htmlFor="ukulele">??????????????</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">???????????????????? ??????????</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onChange={(evt) => {
              handleParamsChange('4', evt.target.checked, 'stringCount');
              setIsFourStringsClicked(evt.target.checked);
            }}
            checked={isFourStringsClicked}
            disabled={isAcousticClicked && !isUkuleleClicked && !isElectricClicked}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={(evt) => {
              handleParamsChange('6', evt.target.checked, 'stringCount');
              setIsSixStringsClicked(evt.target.checked);
            }}
            checked={isSixStringsClicked}
            disabled={isUkuleleClicked && !isElectricClicked && !isAcousticClicked}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={(evt) => {
              handleParamsChange('7', evt.target.checked, 'stringCount');
              setIsSevenStringsClicked(evt.target.checked);
            }}
            checked={isSevenStringsClicked}
            disabled={isUkuleleClicked && !isElectricClicked && !isAcousticClicked}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onChange={(evt) => {
              handleParamsChange('12', evt.target.checked, 'stringCount');
              setIsTwelveStringsClicked(evt.target.checked);
            }}
            checked={isTwelveStringsClicked}
            disabled={(isUkuleleClicked || isElectricClicked) && !isAcousticClicked}
            data-testid="checkbox-12-strings"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
