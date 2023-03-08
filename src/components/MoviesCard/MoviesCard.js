import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const location = useLocation();
  let buttonClassName;
  if (location.pathname === "/movies") {
    if (props.isLiked) {
      buttonClassName =
        "movie-card__button movie-card__button_type_liked app__button";
    } else {
      buttonClassName = "movie-card__button app__button";
    }
  } else {
    buttonClassName = "movie-card__button movie-card__button_type_delete app__button";
  }

  return (
    <li className="movie-card app__list-item">
      <img
        className="movie-card__picture"
        src={props.thumbnail}
        alt={props.nameRU}
      />
      <div className="movie-card__info">
        <p className="movie-card__name">{props.nameRU}</p>
        <button type="button" className={buttonClassName} />
      </div>
      <p className="movie-card__duration">{props.duration}</p>
    </li>
  );
}

export default MoviesCard;
