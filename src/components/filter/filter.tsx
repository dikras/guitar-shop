import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { GuitarType } from '../../const';
import { changeGuitarType } from '../../store/action';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const [ isAcousticChecked, setIsAcousticChecked ] = useState(false);
  const [ isElectricChecked, setIsElectricChecked ] = useState(false);
  const [ isUkuleleChecked, setIsUkuleleChecked ] = useState(false);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
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
              } else {
                dispatch(changeGuitarType(GuitarType.Default));
              }
            }}
            checked={isAcousticChecked}
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
              } else {
                dispatch(changeGuitarType(GuitarType.Default));
              }
            }}
            checked={isElectricChecked}
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
              } else {
                dispatch(changeGuitarType(GuitarType.Default));
              }
            }}
            checked={isUkuleleChecked}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
