import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { APIRoute, QueryParam, AppRoute } from '../../const';
import { setGuitarName } from '../../store/action';
import { fetchGuitarsByName } from '../../store/api-action';
import { getGuitarsByName } from '../../store/search-reducer/selectors';
import { useLocation } from 'react-router-dom';
import { getTotalQuantityIncart } from '../../store/cart-reducer/selectors';

function Header(): JSX.Element {
  const guitars = useSelector(getGuitarsByName);
  const guitarsInCartQuantity = useSelector(getTotalQuantityIncart);
  const [ word, setWord ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const refElement = useRef<HTMLInputElement | null>(null);
  const isCatalogPage = location.pathname === AppRoute.Main;

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
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="??????????????" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link to={AppRoute.Main} className={`link main-nav__link ${isCatalogPage ? 'link--current' : ''}`}>??????????????</Link>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">?????? ?????????????</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/#">?? ????????????????</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">???????????? ??????????</span>
            </button>
            <input
              className="form-search__input"
              id="search" type="text"
              autoComplete="off"
              placeholder="?????? ???? ???????????"
              onChange={handleInputChange}
              onFocus={handleInputFocusIn}
              ref={refElement}
            />
            <label className="visually-hidden" htmlFor="search">??????????</label>
          </form>
          <ul className={`form-search__select-list ${isFocus ? '' : 'hidden'}`} data-testid="search-list">
            {guitars.map((guitar) => (
              <li key={nanoid()} className="form-search__select-item">
                <Link to={`${guitar.id}`} className="form-search__select-item" tabIndex={0}>{guitar.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="??????????????">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">?????????????? ?? ??????????????</span>
          {guitarsInCartQuantity === 0 ? '' : <span className="header__cart-count">{guitarsInCartQuantity}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
