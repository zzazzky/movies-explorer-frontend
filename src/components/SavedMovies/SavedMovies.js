import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../data/movies";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
  const renderCards = () => {
    return movies.map(movie => {
      if (movie.isLiked) {
        return (
          <MoviesCard
            key={movie.movieId}
            thumbnail={movie.thumbnail}
            nameRU={movie.nameRU}
            duration={movie.duration}
            isLiked={movie.isLiked}
          />
        );
      }
    });
  };

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList renderCards={renderCards} />
    </main>
  );
}

export default SavedMovies;
