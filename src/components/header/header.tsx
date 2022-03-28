import { getGuitars } from '../../store/guitars-reducer/selectors';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { AppRoute, NUMBER_TO_ROUND } from '../../const';
import { setGuitarName } from '../../store/action';

function Header(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const guitarsNameId = guitars.map((guitar) => ({
    guitarName: guitar.name,
    guitarId: guitar.id,
  }));
  const [ word, setWord ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);

  const dispatch = useDispatch();

  const refElement = useRef<HTMLInputElement | null>(null);

  const searchedGuitars = guitarsNameId.filter((guitar) => guitar.guitarName.includes(word));

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWord(evt.currentTarget.value);
    if (refElement.current?.value === '') {
      dispatch(setGuitarName(`${refElement.current?.value}`));
    }
  };

  const handleFocusIn = () => setIsFocus(true);

  const handleFocusOut = (evt: MouseEvent) => {
    if (evt.target !== refElement.current) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleFocusOut);
    return () => document.removeEventListener('click', handleFocusOut);
  });

  return (
    <header className="header" id="header" data-testid="header-block">
      <div className="container header__wrapper"><a className="header__logo logo" href="/#"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="/#">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="/#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form
            className="form-search__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              if (refElement.current?.value) {
                dispatch(setGuitarName(`${refElement.current?.value}`));
              }
            }}
          >
            <button
              className="form-search__submit"
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                if (refElement.current?.value) {
                  dispatch(setGuitarName(`${refElement.current?.value}`));
                }
              }}
            >
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input"
              id="search" type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              onChange={handleInputChange}
              onFocus={handleFocusIn}
              ref={refElement}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list ${isFocus ? '' : 'hidden'}`}>
            {searchedGuitars.map((guitar) => (
              <li key={nanoid(NUMBER_TO_ROUND)} className="form-search__select-item">
                <Link to={`${AppRoute.Guitar}/${guitar.guitarId}`} className="form-search__select-item" tabIndex={0}>{guitar.guitarName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="header__cart-link" href="/#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
