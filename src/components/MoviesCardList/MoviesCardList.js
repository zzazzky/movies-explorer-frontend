import "./MoviesCardList.css";

import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
  const location = useLocation();
  const moreButton = location.pathname === "/movies" && (
    <button type="button" className="movies-card-list__button button">
      Ещё
    </button>
  );
  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__container list">
        {props.renderCards()}
      </ul>
      {moreButton}
    </div>
  );
}

export default MoviesCardList;
