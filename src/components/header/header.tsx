/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link, useParams } from 'react-router-dom';
import { NUMBER_TO_ROUND, APIRoute, QueryParam, AppRoute } from '../../const';
import { setGuitarName } from '../../store/action';
import { fetchGuitarsByName } from '../../store/api-action';
import { getGuitarsByName } from '../../store/search-reducer/selectors';

function Header(): JSX.Element {
  const guitars = useSelector(getGuitarsByName);
  const [ word, setWord ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);

  const dispatch = useDispatch();

  const refElement = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<{ id: string }>();

  const isCatalogPage = id === undefined;

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWord(evt.currentTarget.value);
    if (evt.currentTarget.value !== '') {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  };

  const handleInputFocusIn = () => {
    if (word !== '') {
      setIsFocus(true);
    }
  };

  const handleInputFocusOut = (evt: MouseEvent) => {
    if (evt.target !== refElement.current) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    dispatch(setGuitarName(word));
    if (word !== '') {
      dispatch(fetchGuitarsByName(`${APIRoute.GuitarsNoComments}?${QueryParam.NameLike}=${word}`));
    }
    document.addEventListener('click', handleInputFocusOut);
    return () => document.removeEventListener('click', handleInputFocusOut);
  }, [dispatch, word]);

  return (
    <header className="header" id="header" data-testid="header-block">
      <div className="container header__wrapper">
        <a className="header__logo logo" href="/#">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link to={AppRoute.Main} className={`link main-nav__link ${isCatalogPage? 'link--current' : ''}`}>Каталог</Link>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
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
              onFocus={handleInputFocusIn}
              ref={refElement}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list ${isFocus ? '' : 'hidden'}`} data-testid="search-list">
            {guitars.map((guitar) => (
              <li key={nanoid(NUMBER_TO_ROUND)} className="form-search__select-item">
                <Link to={`${guitar.id}`} className="form-search__select-item" tabIndex={0}>{guitar.name}</Link>
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
