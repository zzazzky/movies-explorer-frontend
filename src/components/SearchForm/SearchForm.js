import "./SearchForm.css";
import { useState } from "react";

function SearchForm(props) {
  const [searchParams, setSearchParams] = useState("");

  function handleSearchParamsChange(e) {
    setSearchParams(e.target.value);
  }

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    props.findMovies();
  }
  const [switcherIsActive, setSwitcherIsActive] = useState(true);

  function toggleSwitcher() {
    switcherIsActive ? setSwitcherIsActive(false) : setSwitcherIsActive(true);
  }

  const switcherState = switcherIsActive ? true : false;

  return (
    <section className="search-form" aria-label="Найти фильм">
      <form className="search-form__form" name="search-form" onSubmit={handleSearchFormSubmit}>
        <input
          className="search-form__input"
          name="search-form-movie"
          required
          value={searchParams}
          type="text"
          placeholder="Фильм"
          onChange={handleSearchParamsChange}
        />
        <button type="submit" className="search-form__button app__button">
          Найти
        </button>
      </form>
      <div className="search-form__switcher-container">
          <input type="checkbox" checked={switcherState} className="search-form__switcher" onChange={toggleSwitcher}/>
        <span className="search-form__text">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;
