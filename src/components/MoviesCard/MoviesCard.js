import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function MoviesCard(props) {
  const location = useLocation();

  function likeMovie(e) {
    moviesApi
      .getAllMovies()
      .then(movies =>
        movies.filter(movie => movie.nameRU.includes(props.nameRU))
      )
      .then(movieData => mainApi.likeMovie(movieData[0]))
      .then(() => {
        mainApi.getMovies().then(res => {
          props.setSavedMovies(res.movies);
        });
      })
      .catch(err => {
        if (err === 409) {
          console.log("Этот фильм уже есть в вашей коллекции");
        } else {
          console.log("500 На сервере произошла ошибка.");
        }
      });
  }

  function dislikeMovie(e) {
    mainApi
      .getMovies()
      .then(res =>
        res.movies.filter(movie => movie.nameRU.includes(props.nameRU))
      )
      .then(movieData => mainApi.dislikeMovie(movieData[0]._id))
      .then(() => {
        mainApi
          .getMovies()
          .then(res => {
            props.setSavedMovies(res.movies);
            if (location.pathname === "/saved-movies") {
              props.setCards(res.movies);
            }
          })
          .catch(err => {
            if (err === 404) {
              console.log("Кажется, у вас нет добавленных фильмов");
            } else {
              console.log("500 На сервере произошла ошибка.");
            }
          });
      })
      .catch(err => {
        if (err === 404) {
          console.log("Кажется, у вас нет добавленных фильмов");
        } else {
          console.log("500 На сервере произошла ошибка.");
        }
      });
  }

  function toggleLike(e) {
    props.isLiked ? dislikeMovie(e) : likeMovie(e);
  }

  let likeButtonClassName;
  if (location.pathname === "/movies") {
    if (props.isLiked) {
      likeButtonClassName =
        "movie-card__button movie-card__button_type_liked app__button";
    } else {
      likeButtonClassName = "movie-card__button app__button";
    }
  } else {
    likeButtonClassName =
      "movie-card__button movie-card__button_type_delete app__button";
  }

  return (
    <li className="movie-card app__list-item">
      <a
        className="app__button movie-card__link"
        href={props.trailerLink}
        target="_blank"
      >
        <img
          className="movie-card__picture"
          src={props.thumbnail}
          alt={props.nameRU}
        />
      </a>
      <div className="movie-card__info">
        <p className="movie-card__name">{props.nameRU}</p>
        <button
          type="button"
          className={likeButtonClassName}
          onClick={toggleLike}
        />
      </div>
      <p className="movie-card__duration">{props.duration}</p>
    </li>
  );
}

export default MoviesCard;
