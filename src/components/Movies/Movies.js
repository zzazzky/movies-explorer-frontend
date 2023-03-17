import { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import MoviesCard from "../MoviesCard/MoviesCard";
import mainApi from "../../utils/MainApi";

function Movies(props) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [switcherIsActive, setSwitcherIsActive] = useState(true);
  const [preloaderIsActive, setPreloaderIsActive] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [searchResultText, setSearchResultText] = useState("");
  const [isMoreButtonActive, setIsMoreButtonActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const initialCardsQuantity =
    windowWidth > 1024 ? 12 : windowWidth <= 600 ? 5 : 8;
  const moreCardsQuantity = windowWidth > 1024 ? 4 : 2;

  function findMovies(searchParams, isShorts) {
    setPreloaderIsActive(true);
    setSearchResultText("");
    moviesApi
      .getAllMovies()
      .then(movies =>
        movies.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchParams.toLowerCase())
        )
      )
      .then(foundMovies =>
        isShorts
          ? foundMovies
          : foundMovies.filter(movie => movie.duration >= 40)
      )
      .then(filteredMovies => {
        if (filteredMovies.length > 0) {
          localStorage.setItem(
            "movies",
            JSON.stringify({
              movies: filteredMovies,
              switcherPosition: isShorts,
              searchParams: searchParams,
            })
          );
          setCards(
            JSON.parse(localStorage.getItem("movies")).movies.slice(
              0,
              initialCardsQuantity
            )
          );
        } else {
          setSearchResultText("Ничего не найдено");
          setCards([]);
        }
      })
      .then(() => {
        setIsMoreButtonActive(
          0 < cards.length &&
            cards.length <
              JSON.parse(localStorage.getItem("movies")).movies.length
        );
      })
      .catch(() =>
        setSearchResultText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        )
      )
      .finally(() => setPreloaderIsActive(false));
  }

  function handleMoreButtonClick() {
    setIsMoreButtonActive(
      cards.length + moreCardsQuantity <
        JSON.parse(localStorage.getItem("movies")).movies.length
    );
    setCards(
      JSON.parse(localStorage.getItem("movies")).movies.slice(
        0,
        cards.length + moreCardsQuantity
      )
    );
  }

  function toggleSwitcher() {
    if (switcherIsActive) {
      setSwitcherIsActive(false);
      findMovies(
        JSON.parse(localStorage.getItem("movies")).searchParams,
        false
      );
    } else {
      setSwitcherIsActive(true);
      findMovies(JSON.parse(localStorage.getItem("movies")).searchParams, true);
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then(({ movies }) => {
        setSavedMovies(movies);
      })
      .catch(err => {
        if (err === 404) {
          console.log("Кажется, у вас нет добавленных фильмов");
        } else {
          console.log("500 На сервере произошла ошибка.");
        }
      });
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("movies"))) {
      setCards(
        JSON.parse(localStorage.getItem("movies")).movies.slice(
          0,
          initialCardsQuantity
        )
      );
      setIsMoreButtonActive(
        0 < initialCardsQuantity &&
          initialCardsQuantity <
            JSON.parse(localStorage.getItem("movies")).movies.length
      );
      setSwitcherIsActive(
        JSON.parse(localStorage.getItem("movies")).switcherPosition
      );
      setSearchParams(JSON.parse(localStorage.getItem("movies")).searchParams);
    }
  }, []);

  useEffect(() => {
    let timeoutId = null;
    function handleChangeWindowSize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    }
    window.addEventListener("resize", handleChangeWindowSize);
    return () => {
      window.removeEventListener("resize", handleChangeWindowSize);
    };
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("movies"))) {
      setCards(
        JSON.parse(localStorage.getItem("movies")).movies.slice(
          0,
          initialCardsQuantity
        )
      );
    }
  }, [initialCardsQuantity]);

  const renderCards = movies => {
    return movies.map(movie => (
      <MoviesCard
        key={movie.id}
        movieId={movie.id}
        thumbnail={`https://api.nomoreparties.co/${movie.image.url}`}
        nameRU={movie.nameRU}
        duration={
          movie.duration >= 60
            ? `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`
            : `${movie.duration} мин`
        }
        trailerLink={movie.trailerLink}
        isLiked={savedMovies.some(
          savedMovie => savedMovie.movieId.toString() === movie.id.toString()
        )}
        setSavedMovies={setSavedMovies}
      />
    ));
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm
          findMovies={findMovies}
          switcherState={switcherIsActive}
          toggleSwitcher={toggleSwitcher}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <MoviesCardList
          renderCards={renderCards}
          cards={cards}
          searchResultText={searchResultText}
          preloaderIsActive={preloaderIsActive}
          isMoreButtonActive={isMoreButtonActive}
          handleMoreButtonClick={handleMoreButtonClick}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
