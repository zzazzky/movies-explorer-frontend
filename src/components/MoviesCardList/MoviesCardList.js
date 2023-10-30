import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <p className="movies-card-list__text">{props.searchResultText}</p>
      {props.preloaderIsActive ? (
        <Preloader />
      ) : (
        props.cards && (
          <>
            <ul className="movies-card-list__container app__list">
              {props.renderCards(props.cards)}
            </ul>
            {props.isMoreButtonActive && (
              <button
                type="button"
                className="movies-card-list__button app__button"
                onClick={props.handleMoreButtonClick}
              >
                Ещё
              </button>
            )}
          </>
        )
      )}
    </section>
  );
}

export default MoviesCardList;
