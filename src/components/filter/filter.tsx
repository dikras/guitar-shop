import { useState } from 'react';
import FilterType from '../filter-type/filter-type';
import FilterString from '../filter-string/filter-string';
import FilterPrice from '../filter-price/filter-price';

function Filter(): JSX.Element {
  const [ isAcousticChecked, setIsAcousticChecked ] = useState(false);
  const [ isElectricChecked, setIsElectricChecked ] = useState(false);
  const [ isUkuleleChecked, setIsUkuleleChecked ] = useState(false);

  const [ isFourStringsChecked, setIsFourStringsChecked ] = useState(false);
  const [ isSixStringsChecked, setIsSixStringsChecked ] = useState(false);
  const [ isSevenStringsChecked, setIsSevenStringsChecked ] = useState(false);
  const [ isTwelveStringsChecked, setIsTwelveStringsChecked ] = useState(false);

  return (
    <form
      className="catalog-filter"
      data-testid="filter-form"
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <FilterType
        isFourStringsChecked={isFourStringsChecked}
        isSixStringsChecked={isSixStringsChecked}
        isSevenStringsChecked={isSevenStringsChecked}
        isTwelveStringsChecked={isTwelveStringsChecked}

        isAcousticChecked={isAcousticChecked}
        isElectricChecked={isElectricChecked}
        isUkuleleChecked={isUkuleleChecked}
        setIsAcousticChecked={setIsAcousticChecked}
        setIsElectricChecked={setIsElectricChecked}
        setIsUkuleleChecked={setIsUkuleleChecked}
      />
      <FilterString
        isAcousticChecked={isAcousticChecked}
        isElectricChecked={isElectricChecked}
        isUkuleleChecked={isUkuleleChecked}

        isFourStringsChecked={isFourStringsChecked}
        isSixStringsChecked={isSixStringsChecked}
        isSevenStringsChecked={isSevenStringsChecked}
        isTwelveStringsChecked={isTwelveStringsChecked}
        setIsFourStringsChecked={setIsFourStringsChecked}
        setIsSixStringsChecked={setIsSixStringsChecked}
        setIsSevenStringsChecked={setIsSevenStringsChecked}
        setIsTwelveStringsChecked={setIsTwelveStringsChecked}
      />
    </form>
  );
}

export default Filter;
