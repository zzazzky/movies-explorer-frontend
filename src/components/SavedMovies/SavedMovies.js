import { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";

function SavedMovies(props) {
  const [switcherIsActive, setSwitcherIsActive] = useState(true);
  const [cards, setCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [searchResultText, setSearchResultText] = useState("");

  function findMovies(searchParams, isShorts) {
    const movies = savedMovies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchParams.toLowerCase())
    );
    if (movies.length === 0) {
      setCards([]);
      setSearchResultText("Ничего не найдено");
    } else if (isShorts) {
      setSearchResultText("");
      setCards(movies);
    } else {
      setSearchResultText("");
      setCards(movies.filter(movie => movie.duration >= 40));
    }
  }

  function toggleSwitcher() {
    if (switcherIsActive) {
      setSwitcherIsActive(false);
      findMovies(searchParams, false);
    } else {
      setSwitcherIsActive(true);
      findMovies(searchParams, true);
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then(({ movies }) => {
        setCards(movies);
        setSavedMovies(movies);
      })
      .catch(err => {
        if (err === 404) {
          console.log("Кажется, у вас нет добавленных фильмов.");
        } else {
          console.log("500 На сервере произошла ошибка.");
        }
      });
  }, []);

  const renderCards = movies => {
    return movies.map(movie => (
      <MoviesCard
        key={movie._id}
        movieId={movie._id}
        thumbnail={movie.image}
        nameRU={movie.nameRU}
        duration={
          movie.duration >= 60
            ? `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`
            : `${movie.duration} мин`
        }
        trailerLink={movie.trailerLink}
        isLiked={true}
        setCards={setCards}
        setSavedMovies={setSavedMovies}
      />
    ));
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="saved-movies">
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
          isMoreButtonActive={false}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
