import "./SearchForm.css";
import { useState } from "react";

function SearchForm() {
  const [searchParams, setSearchParams] = useState("");

  function handleSearchParamsChange(e) {
    setSearchParams(e.target.value);
  }

  const [switcherIsActive, setSwitcherIsActive] = useState(true);

  function toggleSwitcher() {
    switcherIsActive ? setSwitcherIsActive(false) : setSwitcherIsActive(true);
  }

  const switcherClassName = switcherIsActive
    ? "search-form__switcher search-form__switcher_active button"
    : "search-form__switcher button";

  return (
    <div className="search-form">
      <form className="search-form__form" name="search-form">
        <input
          className="search-form__input"
          name="search-form-movie"
          required
          value={searchParams}
          type="text"
          placeholder="Фильм"
          onChange={handleSearchParamsChange}
        />
        <button type="submit" className="search-form__button button">
          Найти
        </button>
      </form>
      <div className="search-form__switcher-container">
        <button className={switcherClassName} onClick={toggleSwitcher}>
          <div className="search-form__toggler" />
        </button>
        <p className="search-form__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
