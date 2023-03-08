import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../data/movies";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies() {
  const renderCards = () => {
    return movies.map(movie => (
      <MoviesCard
        key={movie.movieId}
        thumbnail={movie.thumbnail}
        nameRU={movie.nameRU}
        duration={movie.duration}
        isLiked={movie.isLiked}
      />
    ));
  };

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList renderCards={renderCards} />
    </main>
  );
}

export default Movies;
