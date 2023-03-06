import "./Portfolio.css";
import arrowPath from "../../images/portfolio__arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links app__list">
        <li className="portfolio__item app__list-item">
          <a
            href="https://github.com/zzazzky/gerasimova-how-to-learn"
            target="_blank"
            className="portfolio__link app__button"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <img
              className="portfolio__arrow"
              src={arrowPath}
              alt="Перейти в репозиторий"
            ></img>
          </a>
        </li>
        <li className="portfolio__item app__list-item">
          <a
            href="https://github.com/zzazzky/russian-travel"
            target="_blank"
            className="portfolio__link app__button"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img
              className="portfolio__arrow"
              src={arrowPath}
              alt="Перейти в репозиторий"
            ></img>
          </a>
        </li>
        <li className="portfolio__item app__list-item">
          <a
            href="https://github.com/zzazzky/react-mesto-api-full"
            target="_blank"
            className="portfolio__link app__button"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img
              className="portfolio__arrow"
              src={arrowPath}
              alt="Перейти в репозиторий"
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
