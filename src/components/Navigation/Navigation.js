import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import profileIconPath from "../../images/header__profile-logo.svg";

function Navigation(props) {
  const location = useLocation();

  const navigationClassName = props.isActive
    ? "navigation navigation_active"
    : "navigation";

  const mainLinkClassName =
    location.pathname === "/"
      ? "navigation__links-item app__button app__list-item navigation__links-item_active"
      : "navigation__links-item app__button app__list-item";

  const movieLinkClassName =
    location.pathname === "/movies"
      ? "navigation__links-item app__button app__list-item navigation__links-item_active"
      : "navigation__links-item app__button app__list-item";

  const savedMovieLinkClassName =
    location.pathname === "/saved-movies"
      ? "navigation__links-item app__button app__list-item navigation__links-item_active"
      : "navigation__links-item app__button app__list-item";

  return (
    <nav className={navigationClassName}>
      <button
        className="navigation__close-button app__button"
        onClick={props.closeNav}
      />
      <ul className="navigation__links app__list">
        <li className={mainLinkClassName}>
          <Link
            className="navigation__link app__button"
            to="/"
            onClick={props.closeNav}
          >
            Главная
          </Link>
        </li>
        <li className={movieLinkClassName}>
          <Link
            className="navigation__link app__button"
            to="/movies"
            onClick={props.closeNav}
          >
            Фильмы
          </Link>
        </li>
        <li className={savedMovieLinkClassName}>
          <Link
            className="navigation__link app__button"
            to="/saved-movies"
            onClick={props.closeNav}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link
        to="/profile"
        className="navigation__profile-button app__button"
        onClick={props.closeNav}
      >
        <img
          className="header__profile-button-icon"
          alt="Аккаунт"
          src={profileIconPath}
        />
        Аккаунт
      </Link>
    </nav>
  );
}

export default Navigation;
