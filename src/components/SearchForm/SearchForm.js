import "./SearchForm.css";
import { useState } from "react";

function SearchForm(props) {
  const [validityError, setValidityError] = useState("");

  function handleSearchFocus(e) {
    setValidityError("");
  }

  function handleSearchParamsChange(e) {
    props.setSearchParams(e.target.value);
  }

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.findMovies(
        e.target.querySelector(".search-form__input").value,
        props.switcherState
      );
    } else {
      setValidityError("Введите ключевое слово для поиска");
    }
  }

  return (
    <section className="search-form" aria-label="Найти фильм">
      <form
        className="search-form__form"
        name="search-form"
        noValidate
        onSubmit={handleSearchFormSubmit}
      >
        <input
          className="search-form__input"
          name="search-form-movie"
          required
          value={props.searchParams}
          type="text"
          placeholder="Фильм"
          onChange={handleSearchParamsChange}
          onFocus={handleSearchFocus}
        />
        <button type="submit" className="search-form__button app__button">
          Найти
        </button>
      </form>
      <span className="search-form__validity-error">{validityError}</span>
      <div className="search-form__switcher-container">
        <input
          type="checkbox"
          checked={props.switcherState}
          className="search-form__switcher"
          onChange={props.toggleSwitcher}
        />
        <span className="search-form__text">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;
