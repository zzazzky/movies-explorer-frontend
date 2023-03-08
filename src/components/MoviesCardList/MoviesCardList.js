import "./MoviesCardList.css";

import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
  const location = useLocation();
  const moreButton = location.pathname === "/movies" && (
    <button type="button" className="movies-card-list__button app__button">
      Ещё
    </button>
  );
  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies-card-list__container app__list">
        {props.renderCards()}
      </ul>
      {moreButton}
    </section>
  );
}

export default MoviesCardList;
