import { forwardRef } from "react";
import "./AboutMe.css";
import photoPath from "../../images/about-me__photo.jpg";

const AboutMe = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <img
          className="about-me__photo"
          src={photoPath}
          alt="Фотография студента"
        />
        <div className="about-me__info">
          <div className="about-me__text-container">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
              экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
              слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке, начал
              заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
          </div>
          <a
            className="about-me__link button"
            href="https://github.com/zzazzky"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;
