import "./Header.css";
import Navigation from "../Navigation/Navigation";
import logoPath from "../../images/logo.svg";
import profileIconPath from "../../images/header__profile-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const location = useLocation();

  const [navIsActive, setNavIsActive] = useState(false);

  function openNav() {
    setNavIsActive(true);
  }

  function closeNav() {
    setNavIsActive(false);
  }

  const headerContent = props.loggedIn ? (
    <>
      <nav className="header__navigation">
        <ul className="header__text-container app__list">
          <li className="app__list-item">
            <Link to="/movies" className="header__bold-text app__button">
              Фильмы
            </Link>
          </li>
          <li className="app__list-item">
            <Link to="/saved-movies" className="header__text app__button">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="header__profile-button app__button">
          <img
            className="header__profile-button-icon"
            alt="Аккаунт"
            src={profileIconPath}
          />
          Аккаунт
        </Link>
      </nav>
      <button className="header__menu-icon app__button" onClick={openNav} />
      <Navigation isActive={navIsActive} closeNav={closeNav} />
    </>
  ) : (
    <ul className="header__text-container app__list">
      <li className="app__list-item">
        <Link to="/signup" className="header__bold-text app__button">
          Регистрация
        </Link>
      </li>
      <li className="app__list-item">
        <Link to="/signin" className="header__signin-button app__button">
          Войти
        </Link>
      </li>
    </ul>
  );
  const headerClassName =
    location.pathname === "/" ? "header header_blue" : "header";

  return (
    <header className={headerClassName}>
      <Link to="/" className="app__button">
        <img className="header__logo" alt="Логотип проекта" src={logoPath} />
      </Link>
      {headerContent}
    </header>
  );
}

export default Header;
